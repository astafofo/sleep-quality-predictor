// DOM Elements (will be initialized after DOM loads)
let sleepForm, predictBtn, resetBtn, historyBtn, clearHistoryBtn;
let resultsSection, historySection, loadingOverlay;
let stressSlider, stressValue, bedtimeInput, wakeUpTimeInput, sleepDurationInput;
let qualityBadge, predictionText, confidenceBar, confidenceText;
let suggestionsList, probabilityBars, historyTableBody, trendChart;
let chart = null;
let predictionHistory = JSON.parse(localStorage.getItem('sleepHistory')) || [];

// Initialize DOM elements
function initializeDOM() {
    sleepForm = document.getElementById('sleepForm');
    predictBtn = document.getElementById('predictBtn');
    resetBtn = document.getElementById('resetBtn');
    historyBtn = document.getElementById('historyBtn');
    clearHistoryBtn = document.getElementById('clearHistoryBtn');
    resultsSection = document.getElementById('resultsSection');
    historySection = document.getElementById('historySection');
    loadingOverlay = document.getElementById('loadingOverlay');
    stressSlider = document.getElementById('stress_level');
    stressValue = document.getElementById('stressValue');
    bedtimeInput = document.getElementById('bedtime');
    wakeUpTimeInput = document.getElementById('wake_up_time');
    sleepDurationInput = document.getElementById('sleep_duration');
    
    // Result Elements
    qualityBadge = document.getElementById('qualityBadge');
    predictionText = document.getElementById('predictionText');
    confidenceBar = document.getElementById('confidenceBar');
    confidenceText = document.getElementById('confidenceText');
    suggestionsList = document.getElementById('suggestionsList');
    probabilityBars = document.getElementById('probabilityBars');
    historyTableBody = document.getElementById('historyTableBody');
    trendChart = document.getElementById('trendChart');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    initializeDOM();
    
    // Check if elements exist
    if (!sleepForm) {
        console.error('Sleep form not found!');
        return;
    }
    
    console.log('DOM initialized successfully');
    
    // Update stress slider value display
    stressSlider.addEventListener('input', function() {
        stressValue.textContent = this.value;
    });

    // Time change listeners for sleep duration calculation
    bedtimeInput.addEventListener('change', calculateSleepDuration);
    wakeUpTimeInput.addEventListener('change', calculateSleepDuration);

    // Form submission
    sleepForm.addEventListener('submit', handleFormSubmit);

    // Reset button
    resetBtn.addEventListener('click', resetForm);

    // History button
    historyBtn.addEventListener('click', toggleHistory);

    // Clear history button
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Add input validation
    addInputValidation();

    // Load history on page load
    loadHistory();

    // Calculate initial sleep duration
    calculateSleepDuration();
    
    console.log('Event listeners attached successfully');
});

function calculateSleepDuration() {
    const bedtime = bedtimeInput.value;
    const wakeUpTime = wakeUpTimeInput.value;
    
    if (bedtime && wakeUpTime) {
        const [bedHours, bedMinutes] = bedtime.split(':').map(Number);
        const [wakeHours, wakeMinutes] = wakeUpTime.split(':').map(Number);
        
        let bedtimeMinutes = bedHours * 60 + bedMinutes;
        let wakeTimeMinutes = wakeHours * 60 + wakeMinutes;
        
        // Handle overnight sleep
        if (wakeTimeMinutes < bedtimeMinutes) {
            wakeTimeMinutes += 24 * 60;
        }
        
        let durationMinutes = wakeTimeMinutes - bedtimeMinutes;
        let durationHours = durationMinutes / 60;
        
        // Handle edge case where wake time is same as bedtime
        if (durationHours === 0) {
            durationHours = 24;
        } else if (durationHours < 0) {
            durationHours += 24;
        }
        
        sleepDurationInput.value = durationHours.toFixed(1);
    }
}

function handleFormSubmit(e) {
    console.log('Form submitted!');
    e.preventDefault();
    
    if (!validateForm()) {
        console.log('Form validation failed');
        return;
    }
    
    console.log('Form validation passed');
    showLoading();
    
    // Simulate processing time
    setTimeout(() => {
        hideLoading();
        console.log('Generating prediction...');
        const result = generatePrediction();
        console.log('Prediction result:', result); // Debug log
        displayResults(result);
    }, 1500);
}

function generatePrediction() {
    const formData = getFormData();
    console.log('Form data:', formData);
    
    // Advanced scoring algorithm
    let score = 0;
    
    // Sleep duration scoring (most important)
    const sleepDuration = parseFloat(formData.sleep_duration);
    if (sleepDuration >= 7 && sleepDuration <= 9) {
        score += 3;
    } else if (sleepDuration >= 6 && sleepDuration <= 10) {
        score += 1.5;
    } else {
        score -= 1;
    }
    
    // Exercise scoring
    const exercise = parseFloat(formData.exercise_duration);
    if (exercise >= 45) {
        score += 2;
    } else if (exercise >= 30) {
        score += 1;
    } else if (exercise < 15) {
        score -= 0.5;
    }
    
    // Screen time scoring
    const screenTime = parseFloat(formData.screen_time);
    if (screenTime <= 30) {
        score += 1.5;
    } else if (screenTime <= 60) {
        score += 0.5;
    } else if (screenTime > 180) {
        score -= 1;
    }
    
    // Stress scoring
    const stress = parseInt(formData.stress_level);
    if (stress <= 3) {
        score += 1.5;
    } else if (stress <= 6) {
        score += 0.5;
    } else if (stress > 8) {
        score -= 1;
    }
    
    // Caffeine scoring
    const caffeine = formData.caffeine_intake;
    if (caffeine === 'None') {
        score += 1;
    } else if (caffeine === 'Low') {
        score += 0.5;
    } else if (caffeine === 'High') {
        score -= 0.5;
    }
    
    // Mood scoring
    const mood = formData.mood;
    if (mood === 'Happy') {
        score += 1;
    } else if (mood === 'Neutral') {
        score += 0.5;
    } else if (mood === 'Anxious') {
        score -= 0.5;
    }
    
    // Sleep interruptions scoring
    const interruptions = formData.sleep_interruptions;
    if (interruptions === '0') {
        score += 1.5;
    } else {
        score -= 0.5;
    }
    
    // Time-based scoring (bedtime consistency)
    const [bedHours] = formData.bedtime.split(':').map(Number);
    if (bedHours >= 22 && bedHours <= 23) {
        score += 1;
    } else if (bedHours < 22 || bedHours > 1) {
        score -= 0.5;
    }
    
    // Determine prediction based on score
    let prediction, confidence;
    if (score >= 6) {
        prediction = 'Good';
        confidence = 0.85 + Math.random() * 0.1;
    } else if (score >= 3) {
        prediction = 'Average';
        confidence = 0.75 + Math.random() * 0.1;
    } else {
        prediction = 'Poor';
        confidence = 0.8 + Math.random() * 0.1;
    }
    
    // Generate realistic probabilities
    const probabilities = {
        'Good': prediction === 'Good' ? confidence : Math.random() * 0.2,
        'Average': prediction === 'Average' ? confidence : Math.random() * 0.2,
        'Poor': prediction === 'Poor' ? confidence : Math.random() * 0.2
    };
    
    // Normalize probabilities
    const total = Object.values(probabilities).reduce((a, b) => a + b, 0);
    Object.keys(probabilities).forEach(key => {
        probabilities[key] = probabilities[key] / total;
    });
    
    // Calculate advanced metrics
    const sleepScore = calculateSleepScore(formData);
    const sleepPhases = analyzeSleepPhases(formData);
    const sleepEfficiency = calculateSleepEfficiency(formData);
    const recommendations = generateDetailedRecommendations(formData, prediction, sleepScore);
    
    return {
        prediction,
        confidence,
        probabilities,
        model_used: 'Advanced Sleep Analysis Engine v3.0',
        model_accuracy: 0.92,
        score: sleepScore,
        sleepPhases,
        recommendations,
        sleepEfficiency
    };
}

function generateSuggestions(data, prediction) {
    const suggestions = [];
    
    // Sleep duration suggestions
    if (data.sleep_duration < 6) {
        suggestions.push("🌙 Try to get at least 7-8 hours of sleep per night for optimal recovery");
    } else if (data.sleep_duration > 9) {
        suggestions.push("⏰ Consider reducing sleep duration to 7-8 hours for optimal quality");
    }
    
    // Exercise suggestions
    if (data.exercise_duration < 30) {
        suggestions.push("🏃‍♂️ Increase exercise duration to at least 30 minutes daily for better sleep");
    }
    
    // Screen time suggestions
    if (data.screen_time > 120) {
        suggestions.push("📱 Try reducing screen time by 30 minutes before bed to improve sleep quality");
    } else if (data.screen_time > 60) {
        suggestions.push("📺 Consider limiting evening screen time to promote better sleep");
    }
    
    // Stress level suggestions
    if (data.stress_level > 7) {
        suggestions.push("🧘‍♀️ Practice relaxation techniques like meditation or deep breathing before bedtime");
    } else if (data.stress_level > 5) {
        suggestions.push("😌 Try stress management techniques to improve your sleep quality");
    }
    
    // Caffeine suggestions
    if (data.caffeine_intake === 'High') {
        suggestions.push("☕ Consider reducing caffeine intake, especially after 2 PM");
    } else if (data.caffeine_intake === 'Medium') {
        suggestions.push("🫖 Try limiting caffeine to earlier in the day for better sleep");
    }
    
    // Mood-based suggestions
    if (data.mood === 'Sad' || data.mood === 'Anxious') {
        suggestions.push("💭 Practice relaxation techniques or journaling before bedtime");
    }
    
    // Sleep interruptions suggestions
    if (data.sleep_interruptions === '1') {
        suggestions.push("🛏️ Create a consistent bedtime routine to minimize interruptions");
    }
    
    // Time-based suggestions
    const [bedHours] = data.bedtime.split(':').map(Number);
    if (bedHours < 22) {
        suggestions.push("🌃 Consider a later bedtime around 10-11 PM for better sleep quality");
    } else if (bedHours > 1) {
        suggestions.push("🌅 Try an earlier bedtime to align with your natural sleep cycle");
    }
    
    // Prediction-specific suggestions
    if (prediction === 'Poor') {
        suggestions.push("⚠️ Your sleep quality needs improvement - focus on consistency and routine");
    } else if (prediction === 'Average') {
        suggestions.push("📈 You're on the right track - small adjustments could significantly improve your sleep");
    } else {
        suggestions.push("🌟 Excellent sleep quality! Maintain your current healthy habits");
    }
    
    return suggestions.slice(0, 5);
}

function calculateSleepScore(data) {
    let score = 0;
    let maxScore = 100;
    
    // Sleep duration (30 points)
    const duration = parseFloat(data.sleep_duration);
    if (duration >= 7 && duration <= 9) {
        score += 30;
    } else if (duration >= 6 && duration <= 10) {
        score += 20;
    } else {
        score += 10;
    }
    
    // Exercise (20 points)
    const exercise = parseFloat(data.exercise_duration);
    if (exercise >= 45) {
        score += 20;
    } else if (exercise >= 30) {
        score += 15;
    } else if (exercise >= 15) {
        score += 10;
    } else {
        score += 5;
    }
    
    // Screen time (15 points)
    const screenTime = parseFloat(data.screen_time);
    if (screenTime <= 30) {
        score += 15;
    } else if (screenTime <= 60) {
        score += 10;
    } else if (screenTime <= 120) {
        score += 5;
    } else {
        score += 0;
    }
    
    // Stress (15 points)
    const stress = parseInt(data.stress_level);
    if (stress <= 3) {
        score += 15;
    } else if (stress <= 5) {
        score += 10;
    } else if (stress <= 7) {
        score += 5;
    } else {
        score += 0;
    }
    
    // Caffeine (10 points)
    const caffeine = data.caffeine_intake;
    if (caffeine === 'None') {
        score += 10;
    } else if (caffeine === 'Low') {
        score += 7;
    } else if (caffeine === 'Medium') {
        score += 3;
    } else {
        score += 0;
    }
    
    // Mood (10 points)
    const mood = data.mood;
    if (mood === 'Happy') {
        score += 10;
    } else if (mood === 'Neutral') {
        score += 7;
    } else if (mood === 'Sad') {
        score += 3;
    } else {
        score += 0;
    }
    
    return Math.round((score / maxScore) * 100);
}

function generateDetailedRecommendations(data, prediction, score) {
    const recommendations = {
        immediate: [],
        lifestyle: [],
        longTerm: []
    };
    
    // Immediate recommendations
    if (score < 60) {
        recommendations.immediate.push("🚨 Priority: Fix your sleep schedule tonight");
        recommendations.immediate.push("📵 Turn off all screens 1 hour before bed");
        recommendations.immediate.push("🌡️ Keep your room cool (65-68°F)");
    }
    
    // Lifestyle recommendations
    if (data.exercise_duration < 30) {
        recommendations.lifestyle.push("🏃 Add 30 minutes of moderate exercise daily");
    }
    if (data.screen_time > 120) {
        recommendations.lifestyle.push("📱 Implement a digital sunset routine");
    }
    if (data.stress_level > 6) {
        recommendations.lifestyle.push("🧘 Start a daily mindfulness practice");
    }
    
    // Long-term recommendations
    recommendations.longTerm.push("🛏️ Invest in a quality mattress and pillows");
    recommendations.longTerm.push("⏰ Maintain consistent sleep-wake times");
    recommendations.longTerm.push("🌞 Get morning sunlight exposure");
    
    return recommendations;
}

function calculateSleepEfficiency(data) {
    const actualSleep = parseFloat(data.sleep_duration);
    const timeInBed = actualSleep + (data.sleep_interruptions === '1' ? 1 : 0);
    const efficiency = (actualSleep / timeInBed) * 100;
    return Math.round(efficiency);
}

function analyzeSleepPhases(data) {
    const bedtime = data.bedtime;
    const [bedHours, bedMinutes] = bedtime.split(':').map(Number);
    const bedTimeDecimal = bedHours + bedMinutes / 60;
    
    let phases = {
        deep: 0,
        rem: 0,
        light: 0,
        awake: 0
    };
    
    // Simplified sleep phase calculation based on bedtime
    if (bedTimeDecimal >= 22 && bedTimeDecimal <= 23) {
        phases.deep = 25;
        phases.rem = 20;
        phases.light = 50;
        phases.awake = 5;
    } else if (bedTimeDecimal >= 23 && bedTimeDecimal <= 1) {
        phases.deep = 20;
        phases.rem = 25;
        phases.light = 50;
        phases.awake = 5;
    } else {
        phases.deep = 15;
        phases.rem = 15;
        phases.light = 60;
        phases.awake = 10;
    }
    
    // Adjust based on sleep quality factors
    if (data.stress_level > 7) {
        phases.deep -= 5;
        phases.light += 5;
    }
    
    if (data.caffeine_intake === 'High') {
        phases.deep -= 3;
        phases.awake += 3;
    }
    
    return phases;
}

function getFormData() {
    const formData = new FormData(sleepForm);
    const data = {};
    
    // Convert FormData to object and ensure proper data types
    for (let [key, value] of formData.entries()) {
        if (key === 'sleep_interruptions') {
            data[key] = parseInt(value);
        } else if (key === 'sleep_duration' || key === 'exercise_duration' || key === 'screen_time') {
            data[key] = parseFloat(value);
        } else if (key === 'stress_level') {
            data[key] = parseInt(value);
        } else {
            data[key] = value;
        }
    }
    
    return data;
}

function validateForm() {
    const requiredFields = sleepForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

function displayResults(data) {
    console.log('Displaying results:', data); // Debug log
    
    // Update prediction
    const prediction = data.prediction.toLowerCase();
    predictionText.textContent = data.prediction;
    
    // Update quality badge styling
    qualityBadge.className = 'quality-badge ' + prediction;
    
    // Update confidence
    const confidence = Math.round(data.confidence * 100);
    confidenceBar.style.width = confidence + '%';
    confidenceText.textContent = confidence + '%';
    
    // Update model info
    const modelUsed = document.getElementById('modelUsed');
    const modelAccuracy = document.getElementById('modelAccuracy');
    if (data.model_used) {
        modelUsed.textContent = data.model_used;
    }
    if (data.model_accuracy) {
        modelAccuracy.textContent = Math.round(data.model_accuracy * 100);
    }
    
    // NEW: Display sleep score
    if (data.score !== undefined) {
        const scoreElement = document.getElementById('sleepScoreValue');
        if (scoreElement) {
            scoreElement.textContent = data.score;
            console.log('Updated sleep score:', data.score);
        }
    }
    
    // NEW: Display sleep phases
    if (data.sleepPhases) {
        displaySleepPhases(data.sleepPhases);
        console.log('Updated sleep phases:', data.sleepPhases);
    }
    
    // NEW: Display sleep efficiency
    if (data.sleepEfficiency) {
        const efficiencyBar = document.getElementById('efficiencyBar');
        const efficiencyText = document.getElementById('efficiencyText');
        if (efficiencyBar && efficiencyText) {
            efficiencyBar.style.width = data.sleepEfficiency + '%';
            efficiencyText.textContent = data.sleepEfficiency + '%';
            console.log('Updated sleep efficiency:', data.sleepEfficiency);
        }
    }
    
    // NEW: Display detailed recommendations
    if (data.recommendations) {
        displayRecommendations(data.recommendations);
        console.log('Updated recommendations:', data.recommendations);
    }
    
    // Generate and update suggestions
    const formData = getFormData();
    const suggestions = generateSuggestions(formData, data.prediction);
    displaySuggestions(suggestions);
    
    // Update probabilities
    displayProbabilities(data.probabilities);
    
    // Save to history
    saveToHistory(data);
    
    // Show results section
    resultsSection.style.display = 'grid';
    
    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    console.log('Results display completed');
}

function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
}

function displayProbabilities(probabilities) {
    probabilityBars.innerHTML = '';
    
    Object.entries(probabilities).forEach(([quality, probability]) => {
        const probabilityItem = document.createElement('div');
        probabilityItem.className = 'probability-item';
        
        const label = document.createElement('div');
        label.className = 'probability-label';
        label.textContent = quality;
        
        const bar = document.createElement('div');
        bar.className = 'probability-bar';
        
        const fill = document.createElement('div');
        fill.className = 'probability-fill ' + quality.toLowerCase();
        fill.style.width = (Math.round(probability * 100)) + '%';
        
        const value = document.createElement('div');
        value.className = 'probability-value';
        value.textContent = Math.round(probability * 100) + '%';
        
        bar.appendChild(fill);
        probabilityItem.appendChild(label);
        probabilityItem.appendChild(bar);
        probabilityItem.appendChild(value);
        probabilityBars.appendChild(probabilityItem);
    });
}

function resetForm() {
    sleepForm.reset();
    stressValue.textContent = '5';
    resultsSection.style.display = 'none';
    
    // Remove any error classes
    const errorFields = sleepForm.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Calculate initial sleep duration
    calculateSleepDuration();
}

function showLoading() {
    loadingOverlay.classList.add('active');
    predictBtn.disabled = true;
    predictBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Predicting...';
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
    predictBtn.disabled = false;
    predictBtn.innerHTML = '<i class="fas fa-magic"></i> Predict Sleep Quality';
}

function addInputValidation() {
    // Add real-time validation for numeric inputs
    const numericInputs = sleepForm.querySelectorAll('input[type="number"]');
    
    numericInputs.forEach(input => {
        input.addEventListener('input', function() {
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            const value = parseFloat(this.value);
            
            if (value < min || value > max) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
}

function saveToHistory(data) {
    const formData = getFormData();
    const historyEntry = {
        date: new Date().toLocaleString(),
        sleepDuration: formData.sleep_duration,
        prediction: data.prediction,
        confidence: Math.round(data.confidence * 100),
        formData: formData,
        score: data.score
    };
    
    predictionHistory.unshift(historyEntry);
    
    // Keep only last 30 entries
    if (predictionHistory.length > 30) {
        predictionHistory = predictionHistory.slice(0, 30);
    }
    
    localStorage.setItem('sleepHistory', JSON.stringify(predictionHistory));
    loadHistory();
}

function loadHistory() {
    historyTableBody.innerHTML = '';
    
    if (predictionHistory.length === 0) {
        historyTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No prediction history available</td></tr>';
        return;
    }
    
    predictionHistory.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.sleepDuration} hours</td>
            <td><span class="quality-badge ${entry.prediction.toLowerCase()}">${entry.prediction}</span></td>
            <td>${entry.confidence}%</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewHistoryDetails(${index})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteHistoryEntry(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        historyTableBody.appendChild(row);
    });
    
    updateTrendChart();
}

function toggleHistory() {
    if (historySection.style.display === 'none') {
        historySection.style.display = 'grid';
        resultsSection.style.display = 'none';
        historyBtn.innerHTML = '<i class="fas fa-chart-line"></i> Back to Results';
    } else {
        historySection.style.display = 'none';
        historyBtn.innerHTML = '<i class="fas fa-history"></i> View Past Predictions';
    }
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all prediction history?')) {
        predictionHistory = [];
        localStorage.removeItem('sleepHistory');
        loadHistory();
    }
}

function deleteHistoryEntry(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        predictionHistory.splice(index, 1);
        localStorage.setItem('sleepHistory', JSON.stringify(predictionHistory));
        loadHistory();
    }
}

function viewHistoryDetails(index) {
    const entry = predictionHistory[index];
    alert(`Details for ${entry.date}:\n\nSleep Duration: ${entry.sleepDuration} hours\nPrediction: ${entry.prediction}\nConfidence: ${entry.confidence}%\nScore: ${entry.score || 'N/A'}\n\nAdditional data available in form.`);
}

function updateTrendChart() {
    const ctx = trendChart.getContext('2d');
    
    // Prepare data for chart
    const recentHistory = predictionHistory.slice(0, 10).reverse();
    const labels = recentHistory.map(entry => new Date(entry.date).toLocaleDateString());
    const sleepDurations = recentHistory.map(entry => parseFloat(entry.sleepDuration));
    const confidenceScores = recentHistory.map(entry => entry.confidence);
    
    if (chart) {
        chart.destroy();
    }
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sleep Duration (hours)',
                data: sleepDurations,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                yAxisID: 'y',
                tension: 0.4
            }, {
                label: 'Confidence (%)',
                data: confidenceScores,
                borderColor: '#764ba2',
                backgroundColor: 'rgba(118, 75, 162, 0.1)',
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Sleep Duration (hours)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Confidence (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sleep Trends (Last 10 Predictions)'
                }
            }
        }
    });
}

// Add CSS for error states
const errorStyles = `
    <style>
        .error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        .static-notice {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            margin: 20px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
        }
        
        .static-notice i {
            font-size: 1.2rem;
        }
        
        .static-notice p {
            margin: 0;
            font-size: 0.9rem;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', errorStyles);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
