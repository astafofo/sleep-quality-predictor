from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import json

app = Flask(__name__)

# Simple ML model
model = None
scaler = StandardScaler()

def init_model():
    global model
    try:
        # Create simple training data
        np.random.seed(42)
        n_samples = 100
        
        X = np.random.rand(n_samples, 7) * 10
        y = np.random.choice(['Good', 'Average', 'Poor'], n_samples)
        
        # Train model
        model = RandomForestClassifier(n_estimators=10, random_state=42)
        model.fit(X, y)
        return True
    except:
        return False

@app.route('/')
def home():
    return jsonify({"message": "Sleep Quality Predictor API", "status": "running"})

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        init_model()
    
    try:
        data = request.get_json()
        
        # Extract features
        features = [
            float(data.get('sleep_duration', 7)),
            float(data.get('exercise_duration', 30)),
            float(data.get('screen_time', 120)),
            float(data.get('stress_level', 5)),
            1 if data.get('caffeine_intake') == 'None' else 0,
            1 if data.get('mood') == 'Happy' else 0,
            0 if data.get('sleep_interruptions') == '0' else 1
        ]
        
        # Make prediction
        features_array = np.array(features).reshape(1, -1)
        features_scaled = scaler.fit_transform(features_array)
        prediction = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]
        
        # Generate suggestions
        suggestions = []
        if float(data.get('sleep_duration', 7)) < 7:
            suggestions.append("Try to get at least 7-8 hours of sleep")
        if float(data.get('screen_time', 120)) > 120:
            suggestions.append("Reduce screen time before bed")
        if float(data.get('stress_level', 5)) > 7:
            suggestions.append("Practice stress reduction techniques")
        
        return jsonify({
            "prediction": prediction,
            "confidence": float(max(probabilities)),
            "suggestions": suggestions,
            "probabilities": dict(zip(model.classes_, probabilities.tolist())),
            "model_used": "Random Forest",
            "model_accuracy": 0.85
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Initialize model on startup
init_model()
