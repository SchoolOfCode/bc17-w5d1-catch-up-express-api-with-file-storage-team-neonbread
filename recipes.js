import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
    try {
        const data = await fs.readFile('recipes.json', 'utf8');
        const recipes = JSON.parse(data);
        return Array.isArray(recipes) ? recipes : [];
        // return recipes;
    } catch (error){
        console.error('Error reading recipes.json:', error);
        return [];
    }
}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
   
        try {
            const data = await fs.readFile('recipes.json', 'utf8');
            const recipes = JSON.parse(data);
            const recipe = Array.isArray(recipes) ? recipes.find(recipe => recipe.id === id) : null;
            // const recipe = recipes.find(recipe => recipe.id === id); // Corrected this line
            if (!recipe) {
                throw new Error(`No recipe with ID ${id} found.`);
            }
            return recipe;
       
    } catch (error){
        console.error('Error reading recipes.json:', error);
        return [];
    }
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {

    try {
        // Create a new recipe object with a unique ID
        const newrecipe = {
            id: uuidv4(), // Generate a unique ID
            ...newRecipe
        };

        // Get existing recipes
        const data = await fs.readFile('recipes.json', 'utf8').catch(() => '[]'); // Handle case where file does not exist
        const recipes = JSON.parse(data);
        const recipesArray = Array.isArray(recipes) ? recipes : [];
        // Add the new recipe to the array
        recipesArray.push(newrecipe);

        // Write the updated recipes array back to the file
        await fs.writeFile('recipes.json', JSON.stringify(recipesArray, null, 2));

        // Return the newly created recipe
        return newrecipe;

    } catch (error) {
        console.error('Error writing to recipes.json:', error);
        return null;
    }
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}
