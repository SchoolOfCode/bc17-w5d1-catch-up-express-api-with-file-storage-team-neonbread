import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
    try {
        const data = await fs.readFile('recipes.json', 'utf8');
        const recipes = JSON.parse(data);
        return recipes;
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
            const recipe = recipes.find(recipe => recipe.id === id); // Corrected this line
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
export async function createRecipe(newRecipe) {}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}
