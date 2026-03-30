from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
from datetime import datetime

app = Flask(__name__)

class SleepQualityPredictor:
    def __init__(self):
        self.models = {}
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.is_trained = False
        self.best_model_name = None
        self.train_models()
    
    def generate_synthetic_data(self, n_samples=1000):
        """Generate synthetic sleep data for training"""
        np.random.seed(42)
        
        # Generate realistic sleep data
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
        
        # Ensure realistic bounds
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
            (df['mood'].isin(['Excellent', 'Good'])) * 1 +
            (df['sleep_interruptions'] <= 1) * 1
        )
        
        # Classify sleep quality
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
        # Encode categorical variables
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
    
    def train_models(self):
        """Train multiple ML models and select the best one"""
        # Generate synthetic data
        df = self.generate_synthetic_data()
        df_processed = self.preprocess_data(df)
        
        # Features and target
        features = ['sleep_duration', 'bedtime', 'wake_up_time', 'exercise_duration', 'screen_time', 
                   'stress_level', 'caffeine_intake', 'mood', 'sleep_interruptions']
        X = df_processed[features]
        y = df_processed['sleep_quality']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Initialize models
        models = {
            'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
            'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
            'Decision Tree': DecisionTreeClassifier(random_state=42),
            'SVM': SVC(random_state=42, probability=True)
        }
        
        # Train and evaluate models
        best_accuracy = 0
        
        for name, model in models.items():
            print(f"Training {name}...")
            model.fit(X_train_scaled, y_train)
            y_pred = model.predict(X_test_scaled)
            accuracy = accuracy_score(y_test, y_pred)
            
            self.models[name] = {
                'model': model,
                'accuracy': accuracy
            }
            
            print(f"{name} accuracy: {accuracy:.3f}")
            
            # Select best model
            if accuracy > best_accuracy:
                best_accuracy = accuracy
                self.best_model_name = name
        
        self.is_trained = True
        print(f"\nBest model: {self.best_model_name} with accuracy: {best_accuracy:.3f}")
    
    def predict(self, data):
        """Make prediction on new data using the best model"""
        if not self.is_trained:
            return {"error": "Models not trained"}
        
        # Convert input to DataFrame
        input_df = pd.DataFrame([data])
        
        # Preprocess
        input_processed = self.preprocess_data(input_df)
        
        # Scale features
        features = ['sleep_duration', 'bedtime', 'wake_up_time', 'exercise_duration', 'screen_time', 
                   'stress_level', 'caffeine_intake', 'mood', 'sleep_interruptions']
        input_scaled = self.scaler.transform(input_processed[features])
        
        # Use best model for prediction
        best_model = self.models[self.best_model_name]['model']
        prediction = best_model.predict(input_scaled)[0]
        probabilities = best_model.predict_proba(input_scaled)[0]
        
        # Get feature importance (if available)
        feature_importance = {}
        if hasattr(best_model, 'feature_importances_'):
            feature_importance = dict(zip(features, best_model.feature_importances_))
        
        return {
            "prediction": prediction,
            "confidence": max(probabilities),
            "probabilities": dict(zip(best_model.classes_, probabilities)),
            "feature_importance": feature_importance,
            "model_used": self.best_model_name,
            "model_accuracy": self.models[self.best_model_name]['accuracy']
        }
    
    def generate_suggestions(self, data, prediction):
        """Generate personalized suggestions based on prediction and input data"""
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
        
        # Sleep interruptions suggestions
        if data['sleep_interruptions'] > 2:
            suggestions.append("Create a consistent bedtime routine to minimize interruptions")
        
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
        
        return suggestions[:5]  # Return top 5 suggestions

# Initialize predictor
predictor = SleepQualityPredictor()

@app.route('/')
def home():
    return render_template('index.html')

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
    return jsonify({"status": "healthy", "model_trained": predictor.is_trained})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
