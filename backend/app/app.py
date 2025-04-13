import requests
import google.generativeai as genai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import re
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth, storage
import glob

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

cred = credentials.Certificate(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))
firebase_admin.initialize_app(cred, {
    'storageBucket': "recipic-2.firebasestorage.app"
})

images = os.listdir("../images")

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def clear_images():
    folder = "../images/"
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        os.remove(file_path)

def get_objects(image_name):
    url = "http://128.211.134.23:8000/infer"

    files = {'file': open(f"../images/{image_name}", "rb")}

    response = requests.post(url, files=files)

    print(response.json())

    return response.json()

@app.route('/recipe', methods=['POST', 'GET'])
def gen_recipe():
    ing_list = []
    
    for image in os.listdir("../images"):
        top_ing = get_objects(image)
        ing_list.append(top_ing[0])
    prompt = (
        "Using these ingredients and maybe some more: " + str(ing_list) +
        ", create a recipe. Return:\n"
        "- The recipe and steps as normal text\n"
        "- The used ingredients as a separate JSON block like this:\n"
        "```json\n[\"ingredient1\", \"ingredient2\", ...]\n```"
    )

    userinfo = request.get_json(force=True)
    userid = userinfo['userIdentifier']
    bucket = storage.bucket()
    blobs = bucket.list_blobs()
    for blob in bucket.list_blobs():
        if userid in blob.name:
            blob.delete()

    model = genai.GenerativeModel("gemini-2.0-flash")

    response = model.generate_content(prompt)
    print(response.text)

    returned = {}

    match = re.search(r'```json\s*(\[[\s\S]*?\])\s*```', response.text)
    if match:
        ingredients_json = match.group(1)
        ingredients = json.loads(ingredients_json)
        dont_have_ing = [ing for ing in ingredients if ing not in ing_list]

        cleaned_text = re.sub(r'```json\s*[\s\S]*?```', '', response.text).strip()

        returned['recipe'] = cleaned_text
        returned['ingredients'] = ingredients
        returned['unowned ingredients'] = dont_have_ing

        print("Dont have ingredients:", dont_have_ing, " Have: " + str(ing_list))
    else:
        print("No JSON block found.")

    clear_images()

    return jsonify(returned), 200

@app.route('/recipe_test', methods=['POST', 'GET'])
def gen_recipe_test():
    with open("../../data.json", 'r') as file:
        json_content = json.load(file)

    return json_content, 200

@app.route('/')
def home():
    return "hello world"

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    userinfo = request.get_json(force=True)
    userid = userinfo['userIdentifier']
    bucket = storage.bucket()

    clear_images()

    # List all files in the bucket
    blobs = bucket.list_blobs()
    for blob in bucket.list_blobs():
        if userid in blob.name:
            print(blob.name)
            filename = os.path.join("../images/", os.path.basename(blob.name))
            blob.download_to_filename(filename)

    return {"Message": "Uploaded successfully!"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)