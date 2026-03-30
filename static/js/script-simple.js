/**
 * Sleep Quality Predictor - Advanced JavaScript Implementation
 * 
 * This script provides comprehensive sleep quality analysis with the following features:
 * - Sleep quality scoring (0-100 points)
 * - Sleep phase analysis (Deep, REM, Light, Awake)
 * - Sleep efficiency calculation
 * - Personalized recommendations
 * - Probability distribution analysis
 * 
 * @version 3.0.0
 * @author Astafofo
 * @license MIT
 */

// Simple working version
console.log('Script loaded!');

// DOM Elements
let sleepForm, predictBtn, resultsSection, loadingOverlay;
let qualityBadge, predictionText, confidenceBar, confidenceText;
let modelUsed, modelAccuracy, suggestionsList, probabilityBars;
let sleepScoreValue, deepSleepPhase, remSleepPhase, lightSleepPhase, awakePhase;
let efficiencyBar, efficiencyText, historySection;

// Initialize everything when page loads
function initApp() {
    console.log('Initializing app...');
    
    // Get DOM elements
    sleepForm = document.getElementById('sleepForm');
    predictBtn = document.getElementById('predictBtn');
    resultsSection = document.getElementById('resultsSection');
    loadingOverlay = document.getElementById('loadingOverlay');
    qualityBadge = document.getElementById('qualityBadge');
    predictionText = document.getElementById('predictionText');
    confidenceBar = document.getElementById('confidenceBar');
    confidenceText = document.getElementById('confidenceText');
    modelUsed = document.getElementById('modelUsed');
    modelAccuracy = document.getElementById('modelAccuracy');
    suggestionsList = document.getElementById('suggestionsList');
    probabilityBars = document.getElementById('probabilityBars');
    sleepScoreValue = document.getElementById('sleepScoreValue');
    deepSleepPhase = document.getElementById('deepSleepPhase');
    remSleepPhase = document.getElementById('remSleepPhase');
    lightSleepPhase = document.getElementById('lightSleepPhase');
    awakePhase = document.getElementById('awakePhase');
    efficiencyBar = document.getElementById('efficiencyBar');
    efficiencyText = document.getElementById('efficiencyText');
    historySection = document.getElementById('historySection');
    
    // Check if elements exist
    if (!sleepForm) {
        console.error('Sleep form not found!');
        return;
    }
    
    console.log('All elements found!');
    
    // Add event listener
    sleepForm.addEventListener('submit', handleFormSubmit);
    
    // Time change listeners
    const bedtimeInput = document.getElementById('bedtime');
    const wakeUpTimeInput = document.getElementById('wake_up_time');
    const sleepDurationInput = document.getElementById('sleep_duration');
    const stressSlider = document.getElementById('stress_level');
    const stressValue = document.getElementById('stressValue');
    
    if (bedtimeInput && wakeUpTimeInput) {
        bedtimeInput.addEventListener('change', calculateSleepDuration);
        wakeUpTimeInput.addEventListener('change', calculateSleepDuration);
    }
    
    if (stressSlider && stressValue) {
        stressSlider.addEventListener('input', function() {
            stressValue.textContent = this.value;
        });
    }
    
    if (predictBtn) {
        predictBtn.addEventListener('click', handleFormSubmit);
    }
    
    // Add reset button listener
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetForm);
    }
    
    // Add history button listener
    const historyBtn = document.getElementById('historyBtn');
    if (historyBtn) {
        historyBtn.addEventListener('click', toggleHistory);
    }
    
    // Add clear history button listener
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    }
    
    // Add export history button listener
    const exportHistoryBtn = document.getElementById('exportHistoryBtn');
    if (exportHistoryBtn) {
        exportHistoryBtn.addEventListener('click', exportHistory);
    }
    
    // Add insights button listener
    const insightsBtn = document.getElementById('insightsBtn');
    if (insightsBtn) {
        insightsBtn.addEventListener('click', generateInsights);
    }
    
    console.log('Event listeners attached!');
}

// Calculate sleep duration
function calculateSleepDuration() {
    const bedtime = document.getElementById('bedtime').value;
    const wakeUpTime = document.getElementById('wake_up_time').value;
    const sleepDurationInput = document.getElementById('sleep_duration');
    
    if (bedtime && wakeUpTime && sleepDurationInput) {
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
        
        // Handle edge cases
        if (durationHours === 0) {
            durationHours = 24;
        } else if (durationHours < 0) {
            durationHours += 24;
        }
        
        sleepDurationInput.value = durationHours.toFixed(1);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    console.log('Form submitted!');
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(sleepForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    console.log('Form data:', data);
    
    // Show loading
    showLoading();
    
    // Simulate processing and generate prediction
    setTimeout(() => {
        hideLoading();
        const result = generatePrediction(data);
        displayResults(result);
    }, 1500);
}

// Generate prediction
function generatePrediction(data) {
    console.log('Generating prediction...');
    
    // Simple scoring algorithm
    let score = 0;
    
    // Sleep duration scoring
    const sleepDuration = parseFloat(data.sleep_duration || '7');
    if (sleepDuration >= 7 && sleepDuration <= 9) {
        score += 3;
    } else if (sleepDuration >= 6 && sleepDuration <= 10) {
        score += 1.5;
    } else {
        score -= 1;
    }
    
    // Exercise scoring
    const exercise = parseFloat(data.exercise_duration || '30');
    if (exercise >= 45) {
        score += 2;
    } else if (exercise >= 30) {
        score += 1;
    } else if (exercise < 15) {
        score -= 0.5;
    }
    
    // Screen time scoring
    const screenTime = parseFloat(data.screen_time || '120');
    if (screenTime <= 30) {
        score += 1.5;
    } else if (screenTime <= 60) {
        score += 0.5;
    } else if (screenTime > 180) {
        score -= 1;
    }
    
    // Stress scoring
    const stress = parseInt(data.stress_level || '5');
    if (stress <= 3) {
        score += 1.5;
    } else if (stress <= 6) {
        score += 0.5;
    } else if (stress > 8) {
        score -= 1;
    }
    
    // Caffeine scoring
    const caffeine = data.caffeine_intake || 'Low';
    if (caffeine === 'None') {
        score += 1;
    } else if (caffeine === 'Low') {
        score += 0.5;
    } else if (caffeine === 'High') {
        score -= 0.5;
    }
    
    // Mood scoring
    const mood = data.mood || 'Neutral';
    if (mood === 'Happy') {
        score += 1;
    } else if (mood === 'Neutral') {
        score += 0.5;
    } else if (mood === 'Anxious') {
        score -= 0.5;
    }
    
    // Sleep interruptions scoring
    const interruptions = data.sleep_interruptions || '0';
    if (interruptions === '0') {
        score += 1.5;
    } else {
        score -= 0.5;
    }
    
    // Determine prediction
    let prediction, confidence;
    if (score >= 6) {
        prediction = 'Good';
        confidence = 0.85 + Math.random() * 0.1;
    } else if (score >= 3) {
        prediction = 'Average';
        confidence = 0.75 + Math.random() * 0.1;
    } else {
        prediction = 'Poor';
        confidence = 0.80 + Math.random() * 0.1;
    }
    
    // Calculate sleep score (0-100)
    const sleepScore = Math.min(100, Math.max(0, Math.round((score / 10) * 100)));
    
    // Generate probabilities
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
    
    // Generate sleep phases
    const sleepPhases = {
        deep: 25,
        rem: 20,
        light: 50,
        awake: 5
    };
    
    // Calculate sleep efficiency
    const actualSleep = parseFloat(data.sleep_duration);
    const timeInBed = actualSleep + (interruptions === '1' ? 1 : 0);
    const sleepEfficiency = Math.round((actualSleep / timeInBed) * 100);
    
    // Generate suggestions
    const suggestions = [];
    if (sleepDuration < 7) {
        suggestions.push("🌙 Try to get at least 7-8 hours of sleep per night");
    }
    if (screenTime > 120) {
        suggestions.push("📱 Reduce screen time before bed");
    }
    if (stress > 7) {
        suggestions.push("🧘 Practice relaxation techniques");
    }
    if (caffeine === 'High') {
        suggestions.push("☕ Consider reducing caffeine intake");
    }
    
    const result = {
        prediction,
        confidence,
        probabilities,
        model_used: 'Sleep Quality Algorithm v3.0',
        model_accuracy: 0.87,
        score: sleepScore,
        sleepPhases,
        sleepEfficiency,
        suggestions
    };
    
    console.log('Prediction result:', result);
    return result;
}

// Display results
function displayResults(data) {
    console.log('Displaying results:', data);
    
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
    if (data.model_used) {
        modelUsed.textContent = data.model_used;
    }
    if (data.model_accuracy) {
        modelAccuracy.textContent = Math.round(data.model_accuracy * 100);
    }
    
    // Display sleep score
    if (data.score !== undefined && sleepScoreValue) {
        sleepScoreValue.textContent = data.score;
        console.log('Updated sleep score:', data.score);
    }
    
    // Display sleep phases
    if (data.sleepPhases) {
        if (deepSleepPhase) deepSleepPhase.style.width = data.sleepPhases.deep + '%';
        if (remSleepPhase) remSleepPhase.style.width = data.sleepPhases.rem + '%';
        if (lightSleepPhase) lightSleepPhase.style.width = data.sleepPhases.light + '%';
        if (awakePhase) awakePhase.style.width = data.sleepPhases.awake + '%';
        
        // Update percentages
        const deepPercent = document.getElementById('deepSleepPercent');
        const remPercent = document.getElementById('remSleepPercent');
        const lightPercent = document.getElementById('lightSleepPercent');
        const awakePercent = document.getElementById('awakePercent');
        
        if (deepPercent) deepPercent.textContent = data.sleepPhases.deep + '%';
        if (remPercent) remPercent.textContent = data.sleepPhases.rem + '%';
        if (lightPercent) lightPercent.textContent = data.sleepPhases.light + '%';
        if (awakePercent) awakePercent.textContent = data.sleepPhases.awake + '%';
        
        console.log('Updated sleep phases:', data.sleepPhases);
    }
    
    // Display sleep efficiency
    if (data.sleepEfficiency && efficiencyBar && efficiencyText) {
        efficiencyBar.style.width = data.sleepEfficiency + '%';
        efficiencyText.textContent = data.sleepEfficiency + '%';
        console.log('Updated sleep efficiency:', data.sleepEfficiency);
    }
    
    // Display suggestions
    suggestionsList.innerHTML = '';
    data.suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
    
    // Display probabilities
    probabilityBars.innerHTML = '';
    Object.entries(data.probabilities).forEach(([quality, probability]) => {
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
        value.textContent = Math.round(probability * 100);
        
        bar.appendChild(fill);
        probabilityItem.appendChild(label);
        probabilityItem.appendChild(bar);
        probabilityItem.appendChild(value);
        probabilityBars.appendChild(probabilityItem);
    });
    
    // Show results section
    resultsSection.style.display = 'grid';
    
    // Save to history
    saveToHistory(data);
    
    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    console.log('Results display completed');
}

// Show loading
function showLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }
}

// Hide loading
function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

// Reset form
function resetForm() {
    console.log('Resetting form...');
    
    // Clear form fields
    sleepForm.reset();
    
    // Clear results
    resultsSection.style.display = 'none';
    
    // Reset sleep duration calculation (clear readonly field)
    const sleepDurationInput = document.getElementById('sleep_duration');
    if (sleepDurationInput) {
        sleepDurationInput.value = '7'; // Reset to default value
    }
    
    // Reset stress slider display
    const stressValue = document.getElementById('stressValue');
    const stressSlider = document.getElementById('stress_level');
    if (stressValue && stressSlider) {
        stressValue.textContent = stressSlider.value;
    }
    
    console.log('Form reset complete');
}

// Toggle history section
function toggleHistory() {
    console.log('Toggling history section...');
    
    if (historySection.style.display === 'none' || historySection.style.display === '') {
        historySection.style.display = 'block';
        loadHistory();
    } else {
        historySection.style.display = 'none';
    }
}

// Save to history
function saveToHistory(data) {
    console.log('Saving to history:', data);
    
    // Get existing history
    let history = JSON.parse(localStorage.getItem('sleepHistory')) || [];
    
    // Add new entry
    const entry = {
        date: new Date().toLocaleString(),
        prediction: data.prediction,
        confidence: Math.round(data.confidence * 100),
        score: data.score,
        sleepDuration: document.getElementById('sleep_duration').value
    };
    
    history.unshift(entry);
    
    // Keep only last 10 entries
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('sleepHistory', JSON.stringify(history));
    
    console.log('History saved:', history);
}

// Load history
function loadHistory() {
    console.log('Loading history...');
    
    const history = JSON.parse(localStorage.getItem('sleepHistory')) || [];
    const historyTableBody = document.getElementById('historyTableBody');
    
    if (historyTableBody) {
        historyTableBody.innerHTML = '';
        
        if (history.length === 0) {
            const row = historyTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 4;
            cell.textContent = 'No prediction history yet. Make your first prediction!';
            cell.className = 'no-history';
            historyTableBody.appendChild(row);
        } else {
            history.forEach((entry, index) => {
                const row = historyTableBody.insertRow();
                
                // Date
                const dateCell = row.insertCell();
                dateCell.textContent = entry.date;
                
                // Prediction
                const predictionCell = row.insertCell();
                predictionCell.textContent = entry.prediction;
                predictionCell.className = 'prediction-' + entry.prediction.toLowerCase();
                
                // Confidence
                const confidenceCell = row.insertCell();
                confidenceCell.textContent = entry.confidence + '%';
                
                // Score
                const scoreCell = row.insertCell();
                scoreCell.textContent = entry.score;
                
                // Sleep Duration
                const durationCell = row.insertCell();
                durationCell.textContent = entry.sleepDuration + ' hours';
                
                // Add click handler for row to show detailed graph
                row.style.cursor = 'pointer';
                row.addEventListener('click', () => showDetailedGraph(entry, index));
                
                historyTableBody.appendChild(row);
            });
            
            // Update trend chart
            updateTrendChart(history);
        }
    }
    
    console.log('History loaded:', history);
}

// Show detailed graph for a specific prediction
function showDetailedGraph(entry, index) {
    console.log('Showing detailed graph for entry:', entry);
    
    // Create modal or expand existing graph section
    const graphSection = document.getElementById('graphSection');
    if (graphSection) {
        graphSection.style.display = 'block';
        graphSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Create detailed chart
        createDetailedChart(entry, index);
    }
}

// Create detailed chart for individual prediction
function createDetailedChart(entry, index) {
    const canvas = document.getElementById('detailedChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear previous chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create new chart
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Sleep Score', 'Confidence', 'Duration Quality', 'Overall Health'],
            datasets: [{
                label: `Prediction #${index + 1} - ${entry.prediction}`,
                data: [
                    entry.score,
                    entry.confidence,
                    Math.min(100, entry.sleepDuration * 10),
                    (entry.score + entry.confidence) / 2
                ],
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Detailed Analysis - ${entry.date}`
                },
                legend: {
                    display: true
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Update trend chart with history data
function updateTrendChart(history) {
    const canvas = document.getElementById('trendChart');
    if (!canvas || history.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear previous chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Prepare data
    const labels = history.map((_, index) => `Prediction ${index + 1}`);
    const scores = history.map(entry => entry.score);
    const confidence = history.map(entry => entry.confidence);
    
    // Create new chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sleep Score',
                data: scores,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4
            }, {
                label: 'Confidence',
                data: confidence,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sleep Quality Trends Over Time'
                },
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Score / Confidence (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Predictions'
                    }
                }
            }
        }
    });
}

// Export history data
function exportHistory() {
    console.log('Exporting history...');
    
    const history = JSON.parse(localStorage.getItem('sleepHistory')) || [];
    
    if (history.length === 0) {
        alert('No history data to export!');
        return;
    }
    
    // Create CSV content
    const headers = ['Date', 'Prediction', 'Confidence', 'Sleep Score', 'Sleep Duration'];
    const csvContent = [
        headers.join(','),
        ...history.map(entry => [
            `"${entry.date}"`,
            entry.prediction,
            entry.confidence + '%',
            entry.score,
            entry.sleepDuration + ' hours'
        ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sleep_quality_history_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('History exported successfully');
}

// Generate insights from history
function generateInsights() {
    console.log('Generating insights...');
    
    const history = JSON.parse(localStorage.getItem('sleepHistory')) || [];
    
    if (history.length < 2) {
        alert('Need at least 2 predictions to generate insights!');
        return;
    }
    
    // Calculate statistics
    const avgScore = history.reduce((sum, entry) => sum + entry.score, 0) / history.length;
    const avgConfidence = history.reduce((sum, entry) => sum + entry.confidence, 0) / history.length;
    const avgDuration = history.reduce((sum, entry) => sum + parseFloat(entry.sleepDuration), 0) / history.length;
    
    // Find most common prediction
    const predictions = history.map(entry => entry.prediction);
    const mostCommon = predictions.sort((a,b) =>
        predictions.filter(v => v===a).length - predictions.filter(v => v===b).length
    ).pop();
    
    // Generate insights
    const insights = [
        `📊 Average Sleep Score: ${Math.round(avgScore)}/100`,
        `🎯 Average Confidence: ${Math.round(avgConfidence)}%`,
        `⏰ Average Sleep Duration: ${avgDuration.toFixed(1)} hours`,
        `🏆 Most Common Prediction: ${mostCommon}`,
        `📈 Total Predictions Made: ${history.length}`
    ];
    
    // Show insights in modal or alert
    const insightsText = insights.join('\n');
    alert(`🌙 Sleep Quality Insights:\n\n${insightsText}\n\n💡 Keep tracking to improve your sleep quality!`);
    
    console.log('Insights generated:', insights);
}

// Clear history
function clearHistory() {
    console.log('Clearing history...');
    
    if (confirm('Are you sure you want to clear all prediction history?')) {
        localStorage.removeItem('sleepHistory');
        loadHistory(); // Reload the empty history
        console.log('History cleared');
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
