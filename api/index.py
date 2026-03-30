from flask import Flask, jsonify, request
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the predictor class directly
try:
    from app import SleepQualityPredictor
    predictor = SleepQualityPredictor()
except ImportError as e:
    # Fallback for deployment
    print(f"Import error: {e}")
    predictor = None

app = Flask(__name__)

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
            <p>Redirecting to main app...</p>
        </body>
    </html>
    """

@app.route('/predict', methods=['POST'])
def predict():
    if not predictor:
        return jsonify({"error": "Model not available"}), 500
        
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
    return jsonify({
        "status": "healthy", 
        "model_trained": predictor.is_trained if predictor else False
    })

# For Vercel serverless
handler = app
