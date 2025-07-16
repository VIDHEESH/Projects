import streamlit as st
import joblib
import numpy as np
import pandas as pd

# Load the trained model
model = joblib.load("salary_prediction_model.pkl")

# Title of the Streamlit App
st.title("💰 Employee Salary Prediction App")

st.write("Enter details to predict the expected salary.")

# User Input Fields
age = st.number_input("Age", min_value=18, max_value=70, value=30)
gender = st.selectbox("Gender", ["Male", "Female"])
education = st.selectbox("Education Level", ["Bachelor's", "Master's", "PhD"])
job_title = st.text_input("Job Title (Type your Job)")
experience = st.number_input("Years of Experience", min_value=0, max_value=50, value=5)

# Encode categorical inputs
gender_dict = {"Male": 1, "Female": 0}
education_dict = {"Bachelor's": 0, "Master's": 1, "PhD": 2}

gender_encoded = gender_dict[gender]
education_encoded = education_dict[education]

# Process job title (dummy encoding)
job_title_encoded = hash(job_title) % 200  # Simple hashing for unseen job titles

# Prepare input for model
input_data = np.array(
    [[age, gender_encoded, education_encoded, job_title_encoded, experience]]
)

# Prediction Button
if st.button("Predict Salary 💰"):
    predicted_salary = model.predict(input_data)
    st.success(f"Predicted Salary: **${predicted_salary[0]:,.2f}**")
