import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get('/api/recipes', async (req, res) => {
  try {
      const recipes = await getRecipes();
      res.json(recipes);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
app.get('/api/recipes/:id', async (req, res) => {
  try {
    
      const recipes = await getRecipeByID(req.params.id);
      res.json(recipes);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.post('/api/recipes', async(req, res)=>{
  try{
    const recipes = await createRecipe(req.body);
    if (recipes) {
      res.status(201).json({
        success: true, 
        payload: recipes
      });
  } else {
      res.status(500).json({ 
        success: false, 
        payload: 'Failed to fetch recipes'
       });
  }
  }
  catch(error){
    res.status(500).json({ 
      success: false, 
      payload: 'Failed to fetch recipes'
     });
  }
  

})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
