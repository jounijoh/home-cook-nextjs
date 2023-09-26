# HomeCookBot Backend and simple UI to test it with browser

## Overview

HomeCookBot, crafted using Next.js, serves as a versatile culinary assistant, aiming to enhance your cooking experience. The application primarily focuses on generating personalized recipes, providing detailed instructions, and creating comprehensive shopping lists.

## How it Works

1. **Fetching Recipes**: 
   - The application sends a prompt to OpenAI's API, seeking a list of recipes.
   - The received content is then parsed and mapped into an array of recipe objects, each containing a name and description.

2. **Fetching Instructions**:
   - Upon selecting a recipe, a user can fetch cooking instructions.
   - The app constructs a prompt with the selected recipe's name and description and sends it to OpenAI's API to receive detailed cooking instructions.

3. **Additional Features**:
   - Users can interact with components such as `FindNutriInfo` and `CreateShoppingList` for additional information and utility.


### Components

- **FindRecipes**: Responsible for fetching and displaying a list of recipes.
- **FindInstructions**: Fetches and displays cooking instructions for the selected recipe.
- **FindNutriInfo**: Fetches and displays nutriotinal information about the selected recipe.
- **CreateShoppingList**: Fetches and creates shoppinglist with tips about the selected recipe.

### API

The backend features an API endpoint `/api/recipes` which handles the interaction with OpenAI's API, sending prompts based on user input and receiving responses to be processed and displayed in the application.

## License

Distributed under the MIT License. See `LICENSE` for more information.


Project Links: 
- [Backend repostiory](https://github.com/jounijoh/HomeCookBot)
- [Frontend repostiory](https://github.com/jounijoh/Home-Cook-Recipes-MobileApp-React-Native/)


## Acknowledgements

- [Next.js](https://nextjs.org/)
- [OpenAI](https://openai.com/)
