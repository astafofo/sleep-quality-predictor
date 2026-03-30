# Sleep Quality Predictor - Advanced ML Analysis System

A sophisticated Machine Learning-based web application that analyzes lifestyle and physiological factors to classify sleep quality with comprehensive insights, interactive graphs, and personalized recommendations.

## Live Demo

**Deployed on Netlify:** [https://sleep-quality-predictor.netlify.app](https://sleep-quality-predictor.netlify.app)

**GitHub Repository:** [https://github.com/astafofo/sleep-quality-predictor](https://github.com/astafofo/sleep-quality-predictor)

## Core Features

### Advanced Prediction System
- **Sleep Quality Classification**: Good/Average/Poor with confidence scoring
- **Comprehensive Sleep Score**: 0-100 point evaluation system
- **Sleep Phase Analysis**: Deep, REM, Light, and Awake phase breakdown
- **Sleep Efficiency Calculation**: Optimal sleep utilization metrics
- **Probability Distribution**: All category probabilities with visual charts
- **Personalized Recommendations**: AI-generated sleep improvement suggestions

### Interactive Data Visualization
- **Radar Charts**: Detailed individual prediction analysis
- **Trend Analysis**: Sleep quality patterns over time
- **Interactive History**: Click-to-view detailed graphs for each prediction
- **Professional Charts**: Chart.js powered visualizations
- **Responsive Graphs**: Adaptive sizing for all devices

### History Management
- **Prediction History**: Store and review past predictions
- **Data Export**: Download history as CSV files
- **Insights Generation**: Statistical analysis of sleep patterns
- **Persistent Storage**: LocalStorage for data persistence
- **Smart Management**: Maximum 10 entries with cleanup options

### Professional UI/UX
- **Modern Design**: Glassmorphism with gradient backgrounds
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover effects and smooth animations
- **Professional Color Scheme**: Consistent blue/purple gradients
- **Accessibility**: Semantic HTML5 with ARIA labels

## Technical Architecture

### Frontend Technology Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with gradients, animations, and glassmorphism
- **JavaScript ES6+**: Modern JavaScript with async/await patterns
- **Chart.js**: Interactive data visualization and trend analysis
- **Poppins Font**: Modern typography from Google Fonts
- **Font Awesome**: Professional icon library

### Data Processing
- **Real-time Calculations**: Sleep duration auto-calculation
- **Feature Engineering**: Time-based and categorical encoding
- **ML Algorithms**: Multiple prediction algorithms with intelligent selection
- **Confidence Scoring**: Probability-based prediction reliability
- **Local Storage**: Client-side data persistence

## Responsive Design

### Desktop Experience
- **Grid Layout**: Optimized for large screens (1200px+)
- **Interactive Charts**: Full-size data visualization
- **Hover Effects**: Professional card animations
- **Comprehensive Forms**: All input controls visible and accessible

### Mobile Experience
- **Touch Controls**: Mobile-optimized input elements
- **Compact Layout**: Stacked card design for small screens
- **Responsive Charts**: Adaptive visualization sizing
- **Thumb-Friendly**: Large tap targets for mobile interaction

## Input Analysis

### Lifestyle Factors
- **Sleep Duration**: Auto-calculated from bedtime/wake-up time
- **Exercise Tracking**: Daily physical activity monitoring (0-180 minutes)
- **Screen Time**: Digital device usage assessment (0-480 minutes)
- **Stress Evaluation**: 0-10 scale stress level measurement
- **Caffeine Monitoring**: Intake level analysis (None/Low/Medium/High)
- **Mood Assessment**: Emotional state before sleep
- **Sleep Interruptions**: Night awakening frequency (0-5+ times)
- **Time Management**: Bedtime consistency evaluation

### Output Features
- **Quality Classification**: Good/Average/Poor sleep quality prediction
- **Confidence Scoring**: ML model confidence percentage
- **Sleep Score**: Comprehensive 0-100 point evaluation
- **Phase Analysis**: Sleep architecture breakdown (Deep/REM/Light/Awake)
- **Efficiency Metrics**: Sleep efficiency calculation
- **Probability Distribution**: All category probabilities
- **Model Information**: Algorithm used and accuracy metrics

## Development Setup

### Prerequisites
- **Modern Browser**: Chrome, Firefox, Safari, Edge
- **Git**: Version control for cloning repository
- **Text Editor**: VS Code, Sublime Text, or similar

### Local Development
```bash
# Clone repository
git clone https://github.com/astafofo/sleep-quality-predictor.git
cd sleep-quality-predictor

# Serve static files (Python)
python -m http.server 8000

# Or use Node.js
npx serve .

# Open browser to http://localhost:8000
```

### Deployment
```bash
# Deploy to Netlify (automatic on git push)
# Or deploy to GitHub Pages
# Static site - no build process required
```

## Project Structure

```
sleep-quality-predictor/
├── LICENSE                # MIT License for open source use
├── README.md              # Project documentation
├── index.html             # Main application page with advanced UI
├── static/
│   ├── css/
│   │   └── style.css      # Responsive styling with animations
│   └── js/
│       └── script-simple.js # Advanced JavaScript with ML algorithms
├── netlify.toml           # Netlify deployment configuration
├── _redirects             # Netlify routing rules
└── package.json            # Project metadata
```

## Design System

### Color Palette
- **Primary**: Linear gradient #667eea to #764ba2
- **Success**: Linear gradient #4ade80 to #22c55e
- **Info**: Linear gradient #06b6d4 to #0891b2
- **Warning**: Linear gradient #fbbf24 to #f59e0b
- **Error**: Linear gradient #f87171 to #ef4444
- **Neutral**: Grays from #f7fafc to #2d3748

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive**: Scales perfectly across devices
- **Accessibility**: High contrast ratios for readability

### Interactive Elements
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Glassmorphism with backdrop blur
- **Forms**: Modern input styling with validation
- **Charts**: Interactive and responsive visualizations

## Features in Detail

### Input Interface
- **Auto-calculated Fields**: Sleep duration from bedtime/wake-up
- **Interactive Slider**: Stress level with real-time display
- **Dropdown Menus**: Caffeine intake and mood selection
- **Radio Buttons**: Sleep interruption frequency
- **Real-time Validation**: Visual feedback for all inputs
- **Responsive Design**: Mobile-optimized controls

### Output Display
- **Quality Badge**: Color-coded prediction (green/yellow/red)
- **Confidence Meter**: Visual prediction reliability indicator
- **Sleep Score Circle**: 0-100 point circular display
- **Phase Bars**: Sleep architecture visualization
- **Efficiency Gauge**: Sleep utilization meter
- **Probability Charts**: All category probabilities
- **Suggestions List**: Personalized recommendations

### History & Analytics
- **Interactive Table**: Click rows for detailed analysis
- **Trend Charts**: Line graphs for sleep patterns
- **Radar Charts**: Individual prediction breakdown
- **Export Functionality**: CSV download for data analysis
- **Insights Generation**: Statistical summaries
- **Clear History**: Option to reset all data

## Use Cases

### Personal Health Monitoring
- **Daily Tracking**: Monitor sleep quality trends
- **Lifestyle Analysis**: Understand factors affecting sleep
- **Improvement Planning**: Get personalized recommendations
- **Progress Measurement**: Track sleep quality over time

### Research & Education
- **Sleep Science**: Understanding sleep quality factors
- **Data Visualization**: Learning chart interpretation
- **ML Concepts**: Understanding prediction algorithms
- **Web Development**: Modern frontend techniques

## Future Enhancements

### Advanced Features
- **Wearable Integration**: Fitbit, Apple Watch data sync
- **AI Chatbot**: Conversational sleep assistant
- **Mobile App**: Native iOS/Android applications
- **Deep Learning**: Neural networks for pattern recognition
- **Time Series Analysis**: Longitudinal sleep tracking
- **Anomaly Detection**: Sleep disorder identification
- **Personalization**: Individual model adaptation

## Contributing

### Development Workflow
1. **Fork Repository**: Create your own copy
2. **Feature Branch**: Create branch for new features
3. **Testing**: Comprehensive testing and validation
4. **Documentation**: Update README and code comments
5. **Pull Request**: Submit changes for review

### Code Standards
- **JavaScript**: ES6+ standards with proper documentation
- **CSS**: BEM methodology with responsive design
- **HTML5**: Semantic markup with accessibility
- **Git**: Clear commit messages and proper branching

## License

This project is open source and available under **MIT License**.

## Project Highlights

- **ML-Powered**: Advanced algorithms with intelligent selection
- **Interactive**: Click-to-view detailed analysis for each prediction
- **Professional**: Modern UI with glassmorphism design
- **Comprehensive**: Sleep scoring, phases, and efficiency analysis
- **Data-Driven**: Export functionality and insights generation
- **Responsive**: Perfect adaptation across all devices
- **Deployed**: Live demo with global accessibility

---

## Built with Passion for Better Sleep Health

**Deployed on Netlify • Powered by Advanced Algorithms • Designed for Professional Use**

---

### Support & Contact

For issues, questions, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/astafofo/sleep-quality-predictor/issues)
- **Live Demo**: [Test the application](https://sleep-quality-predictor.netlify.app)
- **Documentation**: Review this README for detailed information

**Start tracking your sleep quality today!** 
