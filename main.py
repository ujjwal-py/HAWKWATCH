import google.generativeai as genai

# Replace with your actual Gemini API key
API_KEY = "AIzaSyDXQCHqM3ruO39-D29r1wbbFF3YaEE0MKE"

genai.configure(api_key=API_KEY)
print(genai.list_models())

model = genai.GenerativeModel("gemini-pro")
response = model.generate_content("What is the capital of France?")
print("Gemini response:", response.text)