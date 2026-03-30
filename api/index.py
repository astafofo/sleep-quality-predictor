from flask import Flask, render_template, request, jsonify
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import SleepQualityPredictor

app = Flask(__name__)

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
