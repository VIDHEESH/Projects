# 💰 Employee Salary Prediction App

A machine learning web application built with Streamlit that predicts employee salaries based on various factors like age, gender, education, job title, and experience.

## 🌟 Features

- **Interactive Web Interface**: User-friendly Streamlit interface
- **Real-time Predictions**: Instant salary predictions based on input parameters
- **Multiple Deployment Options**: Local, ngrok, and cloud deployment support
- **Machine Learning Model**: Trained model for accurate salary predictions

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip package manager

### Installation

1. **Clone or download this repository**
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## 🌐 Deployment Options

### Option 1: Local Deployment
```bash
streamlit run app.py
```
Access at: http://localhost:8501

### Option 2: Ngrok Deployment (Recommended for sharing)

#### Step 1: Setup Ngrok
1. Go to [ngrok.com](https://ngrok.com/) and create a free account
2. Get your auth token from [ngrok dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
3. Set up ngrok:
   ```bash
   ngrok config add-authtoken YOUR_TOKEN_HERE
   ```

#### Step 2: Deploy
Choose one of these methods:

**Quick Deploy (Easiest):**
```bash
python quick_deploy.py
```

**Full Deploy (Advanced):**
```bash
python deploy_with_ngrok.py
```

**PowerShell Deploy (Windows):**
```powershell
.\deploy.ps1
```

**Manual Deploy:**
```bash
# Terminal 1
streamlit run app.py

# Terminal 2
ngrok http 8501
```

## 📱 How to Use

1. **Age**: Enter employee age (18-70)
2. **Gender**: Select Male or Female
3. **Education**: Choose from Bachelor's, Master's, or PhD
4. **Job Title**: Enter the job position
5. **Experience**: Enter years of experience (0-50)
6. **Click "Predict Salary"** to get the prediction

## � Project Structure

```
Employee_Salary_Prediction/
├── app.py                      # Main Streamlit application
├── deploy_with_ngrok.py         # Full ngrok deployment script
├── quick_deploy.py              # Quick ngrok deployment
├── deploy.ps1                   # PowerShell deployment script
├── requirements.txt             # Python dependencies
├── salary_prediction_model.pkl  # Trained ML model
├── README.md                    # This file
└── Datasets/
    ├── salaries.csv
    └── Salary Data.csv
```

## 📦 Dependencies

- streamlit
- pandas
- scikit-learn
- numpy
- matplotlib
- joblib
- pyngrok

## 🤝 Sharing Your App

After deploying with ngrok, you'll get a public URL like:
```
https://abc123.ngrok.io
```

Share this URL with anyone to let them use your salary prediction app!

## ⚠️ Important Notes

- **Ngrok Free Plan**: The free ngrok plan provides temporary URLs that expire when you close the tunnel
- **Keep Terminal Open**: Don't close the terminal running the deployment
- **Internet Required**: Ngrok requires an internet connection
- **Model Accuracy**: Predictions are based on the trained model and may vary

## 🛠️ Troubleshooting

### Common Issues:

1. **"Port already in use"**
   - Stop other Streamlit apps or change the port

2. **"Ngrok auth token required"**
   - Make sure you've set your ngrok auth token correctly

3. **"Module not found"**
   - Run `pip install -r requirements.txt`

4. **"Model file not found"**
   - Ensure `salary_prediction_model.pkl` is in the project directory

## 🎯 Next Steps

- Improve model accuracy with more data
- Add more input features
- Implement user authentication
- Deploy to cloud platforms (Heroku, AWS, etc.)

---

**Made with ❤️ using Streamlit and Machine Learning**
