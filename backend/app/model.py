import requests

url = "http://128.211.134.20:8000/infer"

image_name = "spinach.jpg"

files = {'file': open(f"backend/images/{image_name}", "rb")}

response = requests.post(url, files=files)

if response.status_code == 200:
    with open("result.txt", "wb") as f:
        f.write(response.content)
    print("Inference successful. Result saved to result.txt")
else:
    print("Error:", response.text)