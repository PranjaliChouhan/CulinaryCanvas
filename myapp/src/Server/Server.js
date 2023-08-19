const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); 
const cors = require('cors');


const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(cors());
app.use(express.static(path.join(__dirname, '../myapp/build')));


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/recipeapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Recipe schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const newRecipe = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    };
    

    const createdRecipe = await Recipe.create(newRecipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error); // Log the actual error
    res.status(500).json({ error: 'Could not add recipe' });
  }
});

  

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Could not get recipes' });
  }
});


app.delete('/api/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Delete the recipe from the database
      const deletedRecipe = await Recipe.findOneAndDelete({ _id: id });
  
      if (!deletedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      res.status(204).send(); // 204 No Content response
    } catch (error) {
      res.status(500).json({ error: 'Could not delete recipe' });
    }
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../myapp/build/index.html'));
});

  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
