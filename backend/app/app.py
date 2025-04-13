import requests
from google import genai
from flask import Flask
from dotenv import load_dotenv
import os
import re
import json

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

images = ["spinach", "pineapple"]

app = Flask(__name__)

def get_objects(image_name):
    url = "http://128.211.134.20:8000/infer"

    image_name = f"{image_name}.jpg"

    files = {'file': open(f"../images/{image_name}", "rb")}

    response = requests.post(url, files=files)

    print(response.json())

    return response.json()

@app.route('/recipe', methods=['POST', 'GET'])
def gen_recipe():
    ing_list = []
    for image in images:
        top_ing = get_objects(image)
        ing_list.append(top_ing[0])
    prompt = (
        "Using these ingredients and maybe some more: " + str(ing_list) +
        ", create a recipe. Return:\n"
        "- The recipe and steps as normal text\n"
        "- The used ingredients as a separate JSON block like this:\n"
        "```json\n[\"ingredient1\", \"ingredient2\", ...]\n```"
    )
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
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

    return returned

@app.route('/recipe_test', methods=['POST', 'GET'])
def gen_recipe_test():
    with open("../../data.json", 'r') as file:
        json_content = json.load(file)

    return json_content

print(gen_recipe_test())