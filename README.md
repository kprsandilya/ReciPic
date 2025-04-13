# ReciPic

## About the Project
A lot of people don't know what to do with all the ingredients stored in the fridge or are clueless to how many different dishes their subset of ingredients can produce. ReciPic solves this issue by providing the user with a recipe that they came make with their ingredients or from buying a few more. ReciPic is both a mobile app and Chrome extension. After the user logins using Firebase for authentication, the user is redirected to a camera from which they can snap a series of pictures of their fridge. This images are stored in their own personal folders on Firebase, from which our model processes, identifying the user's current ingredients and prompts Gemini for a new set of ingredients. The user is then displayed this recipe which may be complete or incomplete. If the recipe is incomplete, this is where the Chrome extension comes into play, which buy the remaining ingredients online from Walmart automatically.
## How to Set It Up
1. git clone https://github.com/kprsandilya/ReciPic.git 
2. run the model
3. cd mobile
4. cd ScannerApp
5. npm install
6. npm install -g expo-cli
7. install the remaining necessary expo and npm packages
8. pip install
