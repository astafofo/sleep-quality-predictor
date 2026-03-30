// DOM Elements
const sleepForm = document.getElementById('sleepForm');
const predictBtn = document.getElementById('predictBtn');
const resetBtn = document.getElementById('resetBtn');
const historyBtn = document.getElementById('historyBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const resultsSection = document.getElementById('resultsSection');
const historySection = document.getElementById('historySection');
const loadingOverlay = document.getElementById('loadingOverlay');
const stressSlider = document.getElementById('stress_level');
const stressValue = document.getElementById('stressValue');
const bedtimeInput = document.getElementById('bedtime');
const wakeUpTimeInput = document.getElementById('wake_up_time');
const sleepDurationInput = document.getElementById('sleep_duration');

// Result Elements
const qualityBadge = document.getElementById('qualityBadge');
const predictionText = document.getElementById('predictionText');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceText = document.getElementById('confidenceText');
const suggestionsList = document.getElementById('suggestionsList');
const probabilityBars = document.getElementById('probabilityBars');
const historyTableBody = document.getElementById('historyTableBody');
const trendChart = document.getElementById('trendChart');
let chart = null;
let predictionHistory = JSON.parse(localStorage.getItem('sleepHistory')) || [];

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
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
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    showLoading();
    
    const formData = getFormData();
    
    // Send prediction request
    fetch('/api/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        hideLoading();
        displayResults(data);
    })
    .catch(error => {
        hideLoading();
        showError('An error occurred while predicting sleep quality. Please try again.');
        console.error('Error:', error);
    });
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
    
    // Additional validation for numeric fields
    const sleepDuration = parseFloat(document.getElementById('sleep_duration').value);
    if (sleepDuration < 3 || sleepDuration > 12) {
        showError('Sleep duration must be between 3 and 12 hours');
        return false;
    }
    
    const exerciseDuration = parseFloat(document.getElementById('exercise_duration').value);
    if (exerciseDuration < 0 || exerciseDuration > 180) {
        showError('Exercise duration must be between 0 and 180 minutes');
        return false;
    }
    
    const screenTime = parseFloat(document.getElementById('screen_time').value);
    if (screenTime < 0 || screenTime > 480) {
        showError('Screen time must be between 0 and 480 minutes');
        return false;
    }
    
    return isValid;
}

function displayResults(data) {
    // Update prediction
    const prediction = data.prediction.toLowerCase();
    predictionText.textContent = data.prediction;
    
    // Update quality badge styling
    qualityBadge.className = 'quality-badge ' + prediction;
    
    // Update confidence
    const confidence = Math.round(data.confidence * 100);
    confidenceBar.style.width = confidence + '%';
    confidenceText.textContent = confidence + '%';
    
    // Update suggestions
    displaySuggestions(data.suggestions);
    
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
}

function saveToHistory(data) {
    const formData = getFormData();
    const historyEntry = {
        date: new Date().toLocaleString(),
        sleepDuration: formData.sleep_duration,
        prediction: data.prediction,
        confidence: Math.round(data.confidence * 100),
        formData: formData
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
    alert(`Details for ${entry.date}:\n\nSleep Duration: ${entry.sleepDuration} hours\nPrediction: ${entry.prediction}\nConfidence: ${entry.confidence}%\n\nAdditional data available in form.`);
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

function displayResults(data) {
    // Update prediction
    const prediction = data.prediction.toLowerCase();
    predictionText.textContent = data.prediction;
    
    // Update quality badge styling
    qualityBadge.className = 'quality-badge ' + prediction;
    
    // Update confidence
    const confidence = Math.round(data.confidence * 100);
    confidenceBar.style.width = confidence + '%';
    confidenceText.textContent = confidence + '%';
    
    // Update suggestions
    displaySuggestions(data.suggestions);
    
    // Update probabilities
    displayProbabilities(data.probabilities);
    
    // Show results section
    resultsSection.style.display = 'grid';
    
    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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

function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-error">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(errorDiv);
    
    // Position and show
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '20px';
    errorDiv.style.right = '20px';
    errorDiv.style.background = '#ef4444';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '15px 20px';
    errorDiv.style.borderRadius = '10px';
    errorDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    errorDiv.style.zIndex = '1001';
    errorDiv.style.display = 'flex';
    errorDiv.style.alignItems = 'center';
    errorDiv.style.gap = '10px';
    errorDiv.style.maxWidth = '400px';
    errorDiv.style.animation = 'slideIn 0.3s ease';
    
    // Close button
    const closeBtn = errorDiv.querySelector('.close-error');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.marginLeft = 'auto';
    
    closeBtn.addEventListener('click', () => {
        errorDiv.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
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

// Add CSS for error states
const errorStyles = `
    <style>
        .error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .error-notification {
            font-family: 'Poppins', sans-serif;
        }
        
        .error-notification i {
            font-size: 1.2rem;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', errorStyles);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
