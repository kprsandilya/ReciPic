    prompt = "Using these ingridients and maybe some more" + str(ing_list) + ", create a recipe. Return the recipe, steps, and an array of used ingridients."
    response = client.models.generate_content(
    model="gemini-2.0-flash", contents=prompt
    )
    print(response.text)