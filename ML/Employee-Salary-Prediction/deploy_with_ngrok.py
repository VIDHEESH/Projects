"""
Deployment script for Streamlit app using ngrok
This script starts the Streamlit app and creates a public URL using ngrok
"""

import subprocess
import time
import threading
from pyngrok import ngrok
import os
import sys

def run_streamlit():
    """Run the Streamlit app"""
    print("Starting Streamlit app...")
    subprocess.run([sys.executable, "-m", "streamlit", "run", "app.py", "--server.port=8501"])

def main():
    """Main deployment function"""
    print("🚀 Starting Employee Salary Prediction App Deployment")
    print("=" * 50)
    
    # Set ngrok auth token (you need to get this from ngrok.com)
    # Uncomment and add your auth token:
    # ngrok.set_auth_token("YOUR_NGROK_AUTH_TOKEN_HERE")
    
    try:
        # Start Streamlit in a separate thread
        streamlit_thread = threading.Thread(target=run_streamlit, daemon=True)
        streamlit_thread.start()
        
        # Wait a moment for Streamlit to start
        print("⏳ Waiting for Streamlit to initialize...")
        time.sleep(5)
        
        # Create ngrok tunnel
        print("🌐 Creating ngrok tunnel...")
        public_url = ngrok.connect(8501)
        
        print("\n" + "="*50)
        print("✅ DEPLOYMENT SUCCESSFUL!")
        print("="*50)
        print(f"🌍 Public URL: {public_url}")
        print("📱 Your app is now accessible from anywhere!")
        print("\n💡 Tips:")
        print("   - Share the public URL with others")
        print("   - Keep this terminal window open")
        print("   - Press Ctrl+C to stop the deployment")
        print("="*50)
        
        # Keep the script running
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n🛑 Stopping deployment...")
            ngrok.disconnect(public_url)
            print("✅ Deployment stopped successfully!")
            
    except Exception as e:
        print(f"❌ Error during deployment: {e}")
        print("\n🔧 Troubleshooting:")
        print("1. Make sure you have set your ngrok auth token")
        print("2. Check if port 8501 is available")
        print("3. Ensure all requirements are installed")

if __name__ == "__main__":
    main()
