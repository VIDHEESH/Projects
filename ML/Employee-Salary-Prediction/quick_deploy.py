"""
Quick ngrok deployment for Streamlit app
Run this script to quickly deploy your app with ngrok
"""

from pyngrok import ngrok
import os
import sys

def quick_deploy():
    """Quick deployment with ngrok"""
    print("🚀 Quick Deploy: Employee Salary Prediction App")
    print("=" * 45)
    
    # You need to set your ngrok auth token first
    # Get it from: https://dashboard.ngrok.com/get-started/your-authtoken
    auth_token = os.getenv("NGROK_AUTH_TOKEN")
    
    if auth_token:
        ngrok.set_auth_token(auth_token)
        print("✅ Auth token set!")
    
    try:
        # Create tunnel to port 8501 (default Streamlit port)
        print("🌐 Creating public tunnel...")
        public_url = ngrok.connect(8501)
        
        print(f"\n🎉 SUCCESS! Your app will be available at:")
        print(f"🔗 {public_url}")
        print(f"\n📋 Next steps:")
        print(f"1. Open a new terminal/command prompt")
        print(f"2. Navigate to: {os.getcwd()}")
        print(f"3. Run: streamlit run app.py")
        print(f"4. Your app will be live at the URL above!")
        print(f"\n⚠️  Keep this window open to maintain the tunnel")
        
        input("\nPress Enter to close the tunnel...")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n🔧 Make sure to:")
        print("1. Install pyngrok: pip install pyngrok")
        print("2. Get auth token from: https://ngrok.com/")
    
    finally:
        ngrok.kill()
        print("🛑 Tunnel closed!")

if __name__ == "__main__":
    quick_deploy()
