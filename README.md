# Sleep Quality Predictor

A Machine Learning-based web application that analyzes lifestyle and physiological factors to classify sleep quality as **Good, Average, or Poor** with personalized recommendations for improvement.

## 🌐 **Live Demo**
**Deployed on Vercel:** [https://your-app-url.vercel.app](https://your-app-url.vercel.app)

## Features

- **🤖 Multiple ML Algorithms**: Random Forest, Logistic Regression, Decision Tree, SVM
- **📊 Smart Model Selection**: Automatically chooses the best performing model
- **🕐 Time-based Analysis**: Bedtime and wake-up time inputs with auto-calculated duration
- **📱 Responsive Design**: Beautiful, mobile-friendly interface with soft blues and purples
- **⚡ Real-time Analysis**: Instant predictions with confidence scores
- **💡 Personalized Suggestions**: Dynamic recommendations based on your input
- **📈 History Tracking**: View past predictions and sleep trends
- **🎨 Interactive Elements**: Sliders, dropdowns, and radio buttons for easy data entry

## Tech Stack

### Backend
- **Python** with Flask (Serverless on Vercel)
- **scikit-learn** for Machine Learning
- **pandas** & **NumPy** for data processing
- **Multiple ML Algorithms**: Random Forest, Logistic Regression, Decision Tree, SVM

### Frontend
- **HTML5**, **CSS3**, **JavaScript**
- **Poppins** font for modern typography
- **Font Awesome** icons
- **Chart.js** for trend visualization

### Deployment
- **Vercel** for serverless hosting
- **GitHub** for version control
- **Automatic CI/CD** deployment

## Project Structure

```
sleep-quality-predictor/
├── index.html              # Main frontend page
├── api/
│   └── index.py           # Serverless Flask API
├── static/
│   ├── css/
│   │   └── style.css      # Responsive styling
│   └── js/
│       └── script.js      # Interactive functionality
├── app.py                 # Local development server
├── vercel.json           # Vercel configuration
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation
```

## 🚀 **Deployment Guide**

### Method 1: Vercel (Recommended)
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin https://github.com/yourusername/sleep-predictor.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Deploy"

### Method 2: Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
python app.py

# Open http://localhost:5000
```

## 🎯 **How It Works**

### Data Collection
The application analyzes:
- **Sleep Duration** (auto-calculated from bedtime/wake-up)
- **Exercise Duration** (minutes per day)
- **Screen Time** (minutes before bed)
- **Stress Level** (0-10 scale)
- **Caffeine Intake** (None/Low/Medium/High)
- **Mood** (Happy/Neutral/Sad/Anxious)
- **Sleep Interruptions** (Yes/No)

### ML Pipeline
1. **Data Preprocessing**: Time conversion, categorical encoding
2. **Model Training**: 4 algorithms trained on synthetic data
3. **Best Model Selection**: Automatic accuracy-based selection
4. **Prediction**: Real-time classification with confidence scores
5. **Suggestions**: Personalized recommendations

### Features in Detail

#### Input Interface
- **Time Pickers**: Bedtime and wake-up time selection
- **Auto-calculation**: Sleep duration computed automatically
- **Interactive Slider**: Stress level (0-10)
- **Dropdown Menus**: Caffeine intake and mood selection
- **Radio Buttons**: Sleep interruption frequency
- **Real-time Validation**: Input checking with visual feedback

#### Output Display
- **Quality Badge**: Color-coded prediction (green/yellow/red)
- **Confidence Meter**: Visual confidence percentage
- **Model Information**: Shows which algorithm was used
- **Probability Distribution**: Breakdown for all three categories
- **Personalized Suggestions**: Context-aware recommendations
- **History Tracking**: Past predictions with trend charts

## 📊 **Model Performance**

The system trains multiple algorithms and selects the best:
- **Random Forest**: ~85-90% accuracy
- **Logistic Regression**: ~80-85% accuracy
- **Decision Tree**: ~75-80% accuracy
- **SVM**: ~82-87% accuracy

**Key Features Identified:**
1. Sleep duration timing
2. Stress level impact
3. Exercise consistency
4. Screen time effects

## 🎨 **Design System**

### Colors
- **Primary**: Soft blues (#667eea) and purples (#764ba2)
- **Success**: Green gradients (#4ade80 to #22c55e)
- **Warning**: Yellow gradients (#fbbf24 to #f59e0b)
- **Error**: Red gradients (#f87171 to #ef4444)

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- **Responsive**: Scales properly on all devices

### Icons
- **Moon**: Sleep and bedtime
- **Sun**: Wake-up time
- **Bed**: Sleep duration
- **Clock**: Time management
- **Brain**: Stress level
- **Coffee**: Caffeine intake

## 🔧 **Customization**

### Adding New Features
1. Update `api/index.py` for new ML features
2. Modify `index.html` for new form fields
3. Update `static/js/script.js` for validation
4. Adjust `static/css/style.css` for styling

### Model Tuning
- Edit training parameters in `app.py`
- Add real datasets for improved accuracy
- Experiment with different algorithms

## 📱 **Mobile Optimization**

- **Responsive Grid**: Adapts to screen sizes
- **Touch Controls**: Mobile-friendly inputs
- **Optimized Typography**: Readable on small screens
- **Smooth Interactions**: Touch-optimized buttons

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is open source and available under the MIT License.

## 🆘 **Support**

For issues or questions:
- Check the browser console for errors
- Verify API endpoints are working
- Test with different input combinations
- Check Vercel deployment logs

---

**Built with ❤️ for better sleep health**  
*Deployed on Vercel • Powered by Machine Learning*

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
