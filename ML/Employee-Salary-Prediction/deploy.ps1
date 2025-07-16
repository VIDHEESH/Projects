# PowerShell script to deploy Streamlit app with ngrok
# Employee Salary Prediction App Deployment

Write-Host "🚀 Employee Salary Prediction App - Ngrok Deployment" -ForegroundColor Green
Write-Host "=" * 55 -ForegroundColor Blue

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found! Please install Python first." -ForegroundColor Red
    exit 1
}

# Install required packages
Write-Host "`n📦 Installing required packages..." -ForegroundColor Yellow
pip install -r requirements.txt

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Packages installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install packages!" -ForegroundColor Red
    exit 1
}

# Instructions for ngrok setup
Write-Host "`n🔧 NGROK SETUP REQUIRED:" -ForegroundColor Cyan
Write-Host "1. Go to https://ngrok.com/ and create a free account" -ForegroundColor White
Write-Host "2. Get your auth token from: https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor White
Write-Host "3. Run this command with your token:" -ForegroundColor White
Write-Host "   ngrok config add-authtoken YOUR_TOKEN_HERE" -ForegroundColor Yellow

Write-Host "`n📋 DEPLOYMENT OPTIONS:" -ForegroundColor Cyan
Write-Host "Option 1 - Quick Deploy:" -ForegroundColor White
Write-Host "   python quick_deploy.py" -ForegroundColor Yellow
Write-Host "`nOption 2 - Full Deploy:" -ForegroundColor White
Write-Host "   python deploy_with_ngrok.py" -ForegroundColor Yellow
Write-Host "`nOption 3 - Manual Deploy:" -ForegroundColor White
Write-Host "   1. Run: streamlit run app.py" -ForegroundColor Yellow
Write-Host "   2. In another terminal: ngrok http 8501" -ForegroundColor Yellow

Write-Host "`n🎯 Choose your preferred option above!" -ForegroundColor Green
