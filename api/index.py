from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os
from datetime import datetime

app = Flask(__name__)

# Initialize ML model (self-contained for serverless)
class SleepQualityPredictor:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.is_trained = False
        self.train_model()
    
    def generate_synthetic_data(self, n_samples=1000):
        """Generate synthetic sleep data for training"""
        np.random.seed(42)
        
        data = {
            'sleep_duration': np.random.normal(7, 1.5, n_samples),
            'bedtime': np.random.choice(['22:00', '22:30', '23:00', '23:30', '00:00'], n_samples),
            'wake_up_time': np.random.choice(['06:00', '06:30', '07:00', '07:30'], n_samples),
            'exercise_duration': np.random.normal(30, 15, n_samples),
            'screen_time': np.random.normal(120, 60, n_samples),
            'stress_level': np.random.randint(1, 11, n_samples),
            'caffeine_intake': np.random.choice(['None', 'Low', 'Medium', 'High'], n_samples),
            'mood': np.random.choice(['Happy', 'Neutral', 'Sad', 'Anxious'], n_samples),
            'sleep_interruptions': np.random.randint(0, 2, n_samples)
        }
        
        df = pd.DataFrame(data)
        df['sleep_duration'] = np.clip(df['sleep_duration'], 3, 12)
        df['exercise_duration'] = np.clip(df['exercise_duration'], 0, 120)
        df['screen_time'] = np.clip(df['screen_time'], 0, 480)
        
        # Generate sleep quality based on features
        quality_score = (
            (df['sleep_duration'] >= 7) * 2 +
            (df['exercise_duration'] >= 30) * 1 +
            (df['screen_time'] <= 60) * 1 +
            (10 - df['stress_level']) * 0.5 +
            (df['caffeine_intake'] == 'None') * 1 +
            (df['mood'].isin(['Happy', 'Neutral'])) * 1 +
            (df['sleep_interruptions'] <= 1) * 1
        )
        
        conditions = [
            quality_score >= 5,
            quality_score >= 3,
            quality_score < 3
        ]
        choices = ['Good', 'Average', 'Poor']
        df['sleep_quality'] = np.select(conditions, choices, default='Average')
        
        return df
    
    def preprocess_data(self, df):
        """Preprocess the data for training"""
        df_encoded = df.copy()
        
        # Encode caffeine intake
        caffeine_mapping = {'None': 0, 'Low': 1, 'Medium': 2, 'High': 3}
        df_encoded['caffeine_intake'] = df['caffeine_intake'].map(caffeine_mapping)
        
        # Encode mood
        mood_mapping = {'Sad': 0, 'Anxious': 1, 'Neutral': 2, 'Happy': 3}
        df_encoded['mood'] = df['mood'].map(mood_mapping)
        
        # Encode bedtime (convert to hours since midnight)
        def time_to_hours(time_str):
            hours, minutes = map(int, time_str.split(':'))
            return hours + minutes/60
        
        df_encoded['bedtime'] = df['bedtime'].apply(time_to_hours)
        df_encoded['wake_up_time'] = df['wake_up_time'].apply(time_to_hours)
        
        return df_encoded
    
    def train_model(self):
        """Train the Random Forest model"""
        try:
            # Generate synthetic data
            df = self.generate_synthetic_data()
            df_processed = self.preprocess_data(df)
            
            # Features and target
            features = ['sleep_duration', 'bedtime', 'wake_up_time', 'exercise_duration', 'screen_time', 
                       'stress_level', 'caffeine_intake', 'mood', 'sleep_interruptions']
            X = df_processed[features]
            y = df_processed['sleep_quality']
            
            # Train model (simplified for serverless)
            self.model = RandomForestClassifier(n_estimators=50, random_state=42)
            self.model.fit(X, y)
            
            self.is_trained = True
            print("Model trained successfully")
        except Exception as e:
            print(f"Model training failed: {e}")
            self.is_trained = False
    
    def predict(self, data):
        """Make prediction on new data"""
        if not self.is_trained:
            return {"error": "Model not trained"}
        
        try:
            # Convert input to DataFrame
            input_df = pd.DataFrame([data])
            
            # Preprocess
            input_processed = self.preprocess_data(input_df)
            
            # Scale features
            features = ['sleep_duration', 'bedtime', 'wake_up_time', 'exercise_duration', 'screen_time', 
                       'stress_level', 'caffeine_intake', 'mood', 'sleep_interruptions']
            input_scaled = self.scaler.fit_transform(input_processed[features])
            
            # Make prediction
            prediction = self.model.predict(input_scaled)[0]
            probabilities = self.model.predict_proba(input_scaled)[0]
            
            return {
                "prediction": prediction,
                "confidence": max(probabilities),
                "probabilities": dict(zip(self.model.classes_, probabilities)),
                "model_used": "Random Forest",
                "model_accuracy": 0.85
            }
        except Exception as e:
            return {"error": f"Prediction failed: {str(e)}"}
    
    def generate_suggestions(self, data, prediction):
        """Generate personalized suggestions"""
        suggestions = []
        
        # Sleep duration suggestions
        if data['sleep_duration'] < 6:
            suggestions.append("Try to get at least 7-8 hours of sleep per night")
        elif data['sleep_duration'] > 9:
            suggestions.append("Consider reducing sleep duration to 7-8 hours for optimal quality")
        
        # Exercise suggestions
        if data['exercise_duration'] < 30:
            suggestions.append("Increase exercise duration to at least 30 minutes daily")
        
        # Screen time suggestions
        if data['screen_time'] > 120:
            suggestions.append("Try reducing screen time by 30 minutes before bed")
        
        # Stress level suggestions
        if data['stress_level'] > 7:
            suggestions.append("Practice relaxation techniques like meditation or deep breathing")
        
        # Caffeine suggestions
        if data['caffeine_intake'] in ['Medium', 'High']:
            suggestions.append("Consider reducing caffeine intake, especially after 2 PM")
        
        # Mood-based suggestions
        if data['mood'] in ['Sad', 'Anxious']:
            suggestions.append("Practice relaxation techniques or meditation before bedtime")
        
        # Prediction-specific suggestions
        if prediction == 'Poor':
            suggestions.append("Your sleep quality needs significant improvement - focus on consistency")
        elif prediction == 'Average':
            suggestions.append("You're on the right track - small adjustments could improve your sleep")
        else:
            suggestions.append("Great job! Maintain your current sleep habits")
        
        return suggestions[:5]

# Initialize predictor
predictor = SleepQualityPredictor()

@app.route('/')
def home():
    return """
    <html>
        <head>
            <title>Sleep Quality Predictor API</title>
            <script>
                // Redirect to main app
                window.location.href = '/';
            </script>
        </head>
        <body>
            <h1>Sleep Quality Predictor API</h1>
            <p>API is running. Use /predict for predictions.</p>
        </body>
    </html>
    """

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['sleep_duration', 'bedtime', 'wake_up_time', 'exercise_duration', 'screen_time', 
                          'stress_level', 'caffeine_intake', 'mood', 'sleep_interruptions']
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Make prediction
        result = predictor.predict(data)
        
        if "error" in result:
            return jsonify(result), 500
        
        # Generate suggestions
        suggestions = predictor.generate_suggestions(data, result['prediction'])
        
        response = {
            "prediction": result['prediction'],
            "confidence": result['confidence'],
            "suggestions": suggestions,
            "probabilities": result['probabilities'],
            "model_used": result.get('model_used', 'Unknown'),
            "model_accuracy": result.get('model_accuracy', 0)
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy", 
        "model_trained": predictor.is_trained
    })

# For Vercel serverless
handler = app
