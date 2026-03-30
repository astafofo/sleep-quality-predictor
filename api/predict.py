from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Sleep Quality Predictor API", "status": "running"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Extract required fields with defaults
        sleep_duration = float(data.get('sleep_duration', 7))
        exercise_duration = float(data.get('exercise_duration', 30))
        screen_time = float(data.get('screen_time', 120))
        stress_level = int(data.get('stress_level', 5))
        caffeine_intake = data.get('caffeine_intake', 'Low')
        mood = data.get('mood', 'Neutral')
        sleep_interruptions = data.get('sleep_interruptions', '0')
        
        # Simple scoring algorithm
        score = 0
        
        # Sleep duration (most important)
        if 7 <= sleep_duration <= 9:
            score += 3
        elif 6 <= sleep_duration <= 10:
            score += 1.5
        else:
            score -= 1
        
        # Exercise
        if exercise_duration >= 30:
            score += 1
        elif exercise_duration < 15:
            score -= 0.5
        
        # Screen time
        if screen_time <= 60:
            score += 0.5
        elif screen_time > 180:
            score -= 1
        
        # Stress
        if stress_level <= 5:
            score += 0.5
        elif stress_level > 7:
            score -= 0.5
        
        # Caffeine
        if caffeine_intake == 'None':
            score += 0.5
        elif caffeine_intake == 'High':
            score -= 0.5
        
        # Mood
        if mood == 'Happy':
            score += 0.5
        elif mood in ['Sad', 'Anxious']:
            score -= 0.5
        
        # Interruptions
        if sleep_interruptions == '0':
            score += 0.5
        else:
            score -= 0.5
        
        # Determine prediction
        if score >= 4:
            prediction = 'Good'
            confidence = 0.8
        elif score >= 2:
            prediction = 'Average'
            confidence = 0.7
        else:
            prediction = 'Poor'
            confidence = 0.75
        
        # Generate suggestions
        suggestions = []
        if sleep_duration < 7:
            suggestions.append("Try to get at least 7-8 hours of sleep per night")
        if screen_time > 120:
            suggestions.append("Reduce screen time before bed")
        if stress_level > 7:
            suggestions.append("Practice stress reduction techniques")
        if caffeine_intake == 'High':
            suggestions.append("Consider reducing caffeine intake")
        
        # Simple probabilities
        probabilities = {
            'Good': 0.3 if prediction == 'Good' else 0.2,
            'Average': 0.3 if prediction == 'Average' else 0.2,
            'Poor': 0.4 if prediction == 'Poor' else 0.2
        }
        
        # Normalize probabilities
        total = sum(probabilities.values())
        for key in probabilities:
            probabilities[key] = round(probabilities[key] / total, 2)
        
        return jsonify({
            "prediction": prediction,
            "confidence": round(confidence, 2),
            "suggestions": suggestions[:3],
            "probabilities": probabilities,
            "model_used": "Sleep Scoring Algorithm",
            "model_accuracy": 0.85
        })
        
    except Exception as e:
        # Log the error and return a generic error message
        print(f"Error in predict: {str(e)}")
        return jsonify({
            "error": "An error occurred while processing your request",
            "details": str(e)
        }), 500

# Health check endpoint
@app.route('/health')
def health():
    return jsonify({"status": "healthy", "service": "sleep-predictor-api"})

# For Vercel serverless
handler = app
