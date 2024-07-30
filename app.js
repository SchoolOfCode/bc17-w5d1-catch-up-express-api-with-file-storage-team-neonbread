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
      res.json({
        success: true, 
        payload: recipes
      });
  } catch (error) {
      res.status(500).json({ 
        error: true, 
        payload: 'Failed to fetch recipes'
       });
  }
});
app.get('/api/recipes/:id', async (req, res) => {
  try {
    
      const recipes = await getRecipeByID(req.params.id);
      res.json({
        success: true, 
        payload: recipes
      });
  } catch (error) {
      res.status(500).json({ 
        error: true, 
        payload: 'Failed to fetch recipes'
       });
  }
});

app.post('/api/recipes', async(req, res)=>{
  try{
    const recipes = await createRecipe(req.body);
    if (recipes) {
      res.status(201).json({
        success: true, 
        message: 'create a new recipe',
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
    res.status(404).json({
      error: true,
      message: error.message || 'Recipe not found',
    });
  }
})

app.patch('/api/recipes/:id', async (req, res)=>{
  try{
    const recipe = await updateRecipeByID(req.params.id, req.body)
    if(recipe){
      res.status(200).json({
        success: true,
        message: 'updated recipe',
        payload: recipe
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to update recipe',
      });
  }
  }
  catch(error){
    res.status(404).json({
      error: true,
      message: error.message || 'Recipe not found',
    });
  }
});

app.delete('/api/recipes/:id', async (req, res)=>{
try{ 
  const recipe = await deleteRecipeByID(req.params.id);
  if(recipe){
    res.status(200).json({
      success: true,
      message: 'recipe deleted ',
      payload: recipe
    });
  }else {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete recipe',
    });
}
}
catch(error){
  res.status(404).json({
    error: true,
    message: error.message || 'Recipe not found',
  });

}
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
