import requests
from google import genai

def get_objects():
    url = "http://128.211.134.20:8000/infer"

    image_name = "spinach.jpg"

    files = {'file': open(f"backend/images/{image_name}", "rb")}

    response = requests.post(url, files=files)

    return response.content

