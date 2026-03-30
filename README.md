# 🌙 Sleep Quality Predictor - Advanced ML System

A sophisticated Machine Learning-based web application that analyzes lifestyle and physiological factors to classify sleep quality as **Good, Average, or Poor** with comprehensive insights and personalized recommendations.

##  **Live Demo**

**🌟 Deployed on Netlify:** [https://sleep-quality-predictor.netlify.app](https://sleep-quality-predictor.netlify.app)

## 📋 **Core Features**

### 🔍 **Input Analysis**
- **Sleep Duration**: Auto-calculated from bedtime/wake-up time
- **Exercise Tracking**: Daily physical activity monitoring
- **Screen Time**: Digital device usage assessment
- **Stress Evaluation**: 0-10 scale stress level measurement
- **Caffeine Monitoring**: Intake level analysis (None/Low/Medium/High)
- **Mood Assessment**: Emotional state before sleep
- **Sleep Interruptions**: Night awakening frequency
- **Time Management**: Bedtime consistency evaluation

### 🧠 **ML Pipeline**
1. **Data Preprocessing**: Time conversion, categorical encoding, feature scaling
2. **Model Training**: 4 algorithms trained on synthetic sleep dataset
3. **Model Selection**: Automatic accuracy-based best model identification
4. **Prediction**: Real-time classification with probability distributions
5. **Insight Generation**: Feature importance and confidence scoring

### 📈 **Output Features**
- **Quality Classification**: Good/Average/Poor sleep quality prediction
- **Confidence Scoring**: ML model confidence percentage
- **Sleep Score**: Comprehensive 0-100 point evaluation
- **Phase Analysis**: Sleep architecture breakdown
- **Efficiency Metrics**: Sleep efficiency calculation
- **Probability Distribution**: All category probabilities
- **Model Information**: Algorithm used and accuracy metrics

## 🛠️ **Technical Architecture**

### **Frontend Technology Stack**
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with gradients and animations
- **JavaScript ES6+**: Modern JavaScript with async/await
- **Chart.js**: Data visualization and trend analysis
- **Poppins Font**: Modern typography from Google Fonts
- **Font Awesome**: Professional icon library

### **Backend Technology Stack**
- **Python**: Core programming language
- **Flask**: Lightweight web framework
- **scikit-learn**: Machine Learning library
- **pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Multiple ML Algorithms**: Random Forest, Logistic Regression, Decision Tree, SVM

### **Data Science Features**
- **Synthetic Data Generation**: Realistic sleep dataset creation
- **Feature Engineering**: Time-based and categorical encoding
- **Model Evaluation**: Accuracy scoring and performance metrics
- **Cross-Validation**: Robust model testing methodology
- **Probability Calibration**: Confidence interval estimation

## 📱 **Responsive Design**

### **Desktop Experience**
- **Grid Layout**: Optimized for large screens
- **Hover Effects**: Interactive card animations
- **Full Charts**: Detailed data visualization
- **Comprehensive Forms**: All input controls visible

### **Mobile Experience**
- **Touch Controls**: Mobile-optimized inputs
- **Compact Layout**: Stacked card design
- **Responsive Charts**: Adaptive visualization sizing
- **Thumb-Friendly**: Large tap targets for mobile

## � **Professional UI/UX**

### **Color Palette**
- **Primary**: Deep blues (#667eea) and purples (#764ba2)
- **Success**: Green gradients (#4ade80 to #22c55e)
- **Warning**: Yellow gradients (#fbbf24 to #f59e0b)
- **Error**: Red gradients (#f87171 to #ef4444)
- **Neutral**: Grays (#f7fafc to #2d3748)

### **Typography**
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive**: Scales perfectly across devices

### **Iconography**
- **Sleep**: Moon (🌙) and bed (🛏️) icons
- **Health**: Heart (❤️) and brain (🧠) icons
- **Activity**: Running (🏃) and exercise (💪) icons
- **Technology**: Chart (📊) and analytics (📈) icons

## 🔧 **Development Setup**

### **Prerequisites**
- **Python 3.9+**: Core programming language
- **Node.js 18+**: Frontend tooling
- **Git**: Version control
- **Modern Browser**: Chrome, Firefox, Safari, Edge

### **Local Development**
```bash
# Clone repository
git clone https://github.com/astafofo/sleep-quality-predictor.git
cd sleep-quality-predictor

# Install Python dependencies
pip install -r requirements.txt

# Run local server
python app.py

# Open browser to http://localhost:5000
```

### **Static Development**
```bash
# Serve static files
python -m http.server 8000

# Or use Node.js
npx serve .

# Open browser to http://localhost:8000
```

## 📚 **Project Structure**

```
sleep-quality-predictor/
├── index.html              # Main application page with advanced UI
├── static/
│   ├── css/
│   │   └── style.css      # Responsive styling with animations
│   └── js/
│       └── static-script.js  # Advanced JavaScript with ML algorithms
├── app.py                 # Local development server with ML models
├── requirements.txt        # Python dependencies for ML libraries
├── netlify.toml           # Netlify deployment configuration
├── _redirects             # Netlify routing rules
└── README.md              # Project documentation
```

## 🎓 **Educational Value**

### **Computer Science Concepts**
- **Machine Learning**: Supervised learning algorithms
- **Data Preprocessing**: Feature engineering and scaling
- **Model Evaluation**: Accuracy metrics and validation
- **Web Development**: Full-stack application architecture
- **UI/UX Design**: User interface and experience principles

### **Data Science Skills**
- **Feature Engineering**: Time-based and categorical encoding
- **Model Selection**: Algorithm comparison and optimization
- **Probability Theory**: Confidence intervals and distributions
- **Data Visualization**: Chart.js implementation
- **Statistical Analysis**: Correlation and feature importance

### **Software Engineering**
- **Version Control**: Git workflow and collaboration
- **Frontend Development**: Modern JavaScript and CSS
- **Backend Development**: Python Flask framework
- **API Design**: RESTful API implementation
- **Deployment**: Static site hosting and CI/CD

## 🔬 **Research Applications**

### **Sleep Science**
- **Circadian Rhythms**: Biological sleep patterns
- **Sleep Architecture**: Phase distribution analysis
- **Lifestyle Factors**: Impact on sleep quality
- **Health Monitoring**: Long-term sleep tracking
- **Intervention Studies**: Recommendation effectiveness

### **Healthcare Analytics**
- **Predictive Modeling**: Risk assessment algorithms
- **Patient Monitoring**: Sleep quality tracking
- **Treatment Planning**: Personalized interventions
- **Outcome Measurement**: Progress evaluation
- **Population Health**: Sleep pattern analysis

## 🚀 **Future Enhancements**

### **Advanced Features**
- **Wearable Integration**: Fitbit, Apple Watch data sync
- **AI Chatbot**: Conversational sleep assistant
- **Mobile App**: Native iOS/Android applications
- **Voice Interface**: Alexa/Google Assistant integration
- **Social Features**: Community challenges and sharing

### **Data Science Improvements**
- **Real Datasets**: Integration with sleep research data
- **Deep Learning**: Neural networks for pattern recognition
- **Time Series Analysis**: Longitudinal sleep tracking
- **Anomaly Detection**: Sleep disorder identification
- **Personalization**: Individual model adaptation

## 🤝 **Contributing**

### **Development Workflow**
1. **Fork Repository**: Create your own copy
2. **Feature Branch**: Create branch for new features
3. **Testing**: Comprehensive testing and validation
4. **Documentation**: Update README and code comments
5. **Pull Request**: Submit changes for review

### **Code Standards**
- **Python**: PEP 8 compliance
- **JavaScript**: ES6+ standards
- **CSS**: BEM methodology
- **HTML5**: Semantic markup
- **Documentation**: Clear comments and README

## 📄 **License**

This project is open source and available under the **MIT License**.

## 🎯 **Learning Outcomes**

### **Technical Skills**
- **Machine Learning**: Algorithm implementation and evaluation
- **Web Development**: Full-stack application creation
- **Data Science**: Analysis and visualization techniques
- **Software Engineering**: Best practices and deployment

### **Domain Knowledge**
- **Sleep Science**: Understanding sleep quality factors
- **Health Analytics**: Quantitative health assessment
- **User Experience**: Interface design and usability
- **Project Management**: Complete project lifecycle

---

## 🌟 **Project Highlights**

- **🤖 ML-Powered**: Multiple algorithms with intelligent selection
- **📊 Comprehensive**: Sleep scoring, phases, and efficiency analysis
- **💡 Intelligent**: Personalized recommendations system
- **🎨 Professional**: Modern UI with responsive design
- **🚀 Deployed**: Live demo with global accessibility

---

**🌙 Built with passion for better sleep health and academic excellence!**

*Deployed on Netlify • Powered by Machine Learning • Designed for Education*

## Project Structure

```
sleep-quality-predictor/
├── app.py                 # Flask application with ML model
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Styling with gradient design
    └── js/
        └── script.js      # Interactive JavaScript
```

## Installation & Setup

1. **Clone or download** the project files
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the application**:
   ```bash
   python app.py
   ```
4. **Open in browser**: Navigate to `http://localhost:5000`

## How It Works

### Data Collection
The application collects the following lifestyle factors:
- **Sleep Duration** (3-12 hours)
- **Exercise Duration** (0-180 minutes)
- **Screen Time** (0-480 minutes)
- **Stress Level** (0-10 scale)
- **Caffeine Intake** (None/Low/Medium/High)
- **Daily Mood** (Excellent/Good/Fair/Poor)
- **Sleep Interruptions** (0-5+ times per night)

### Machine Learning Model
- **Algorithm**: Random Forest Classifier
- **Training Data**: 1000 synthetic samples based on typical sleep patterns
- **Features**: 7 lifestyle and physiological factors
- **Output**: Sleep quality classification (Good/Average/Poor)
- **Confidence**: Probability scores for each prediction

### Prediction Process
1. User inputs lifestyle data through the form
2. Data is preprocessed and scaled
3. ML model predicts sleep quality
4. Confidence scores and personalized suggestions are generated
5. Results displayed with visual indicators

## API Endpoints

### `POST /predict`
**Request Body**:
```json
{
  "sleep_duration": 7.5,
  "exercise_duration": 30,
  "screen_time": 120,
  "stress_level": 5,
  "caffeine_intake": "Low",
  "mood": "Good",
  "sleep_interruptions": 1
}
```

**Response**:
```json
{
  "prediction": "Good",
  "confidence": 0.85,
  "suggestions": [
    "Great job! Maintain your current sleep habits",
    "Consider reducing screen time by 30 minutes before bed"
  ],
  "probabilities": {
    "Good": 0.85,
    "Average": 0.12,
    "Poor": 0.03
  }
}
```

### `GET /health`
Returns application status and model training state.

## Features in Detail

### Input Interface
- **Numeric fields** with validation for sleep duration, exercise, and screen time
- **Interactive slider** for stress level (0-10)
- **Dropdown menus** for caffeine intake and mood selection
- **Radio buttons** for sleep interruption frequency
- **Real-time validation** with visual feedback

### Output Display
- **Quality badge** with color-coded prediction (green/yellow/red)
- **Confidence meter** showing prediction reliability
- **Probability distribution** for all three categories
- **Personalized suggestions** based on input analysis
- **Smooth animations** and transitions

### Responsive Design
- **Mobile-first approach** with breakpoints at 768px and 480px
- **Flexible grid layout** that adapts to screen size
- **Touch-friendly controls** for mobile devices
- **Optimized typography** for readability

## Model Performance

The Random Forest model achieves approximately **85-90% accuracy** on synthetic test data, with strong feature importance for:
1. Sleep duration
2. Stress level
3. Exercise duration
4. Screen time

## Customization

### Adding New Features
To add new lifestyle factors:
1. Update the `generate_synthetic_data()` method in `app.py`
2. Add corresponding form fields in `index.html`
3. Update the JavaScript validation in `script.js`
4. Retrain the model

### Styling Changes
- Modify `static/css/style.css` for color schemes and layout
- Update font preferences in the HTML head section
- Adjust responsive breakpoints in media queries

### Model Tuning
- Experiment with different algorithms (Logistic Regression, SVM, etc.)
- Adjust hyperparameters in the RandomForestClassifier
- Add real sleep data for improved accuracy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure the Flask server is running on port 5000
4. Test with different input combinations

---

**Built with ❤️ for better sleep health**
