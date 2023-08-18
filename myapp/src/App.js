
import './App.css';

import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Header from './Components/Header';
import RecipeCard from './Components/RecipeCard';
import RecipeForm from './Components/RecipeForm';
import { sampleRecipes } from './Components/SampleRecipes';


function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('http://localhost:5000/api/recipes');
        const data = await response.json();
        console.log(data); 
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes', error);
      }
    }

    fetchRecipes();
  }, []);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleDeleteRecipe = async (recipeId) => {
    console.log('Deleting recipe with ID:', recipeId);

    try {

      await fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
        method: 'DELETE',
      });
  
      
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe', error);
    }
  };
  
  const handleEditRecipe = async (recipeId) => {
    // Implement logic to open a modal or a form for editing the recipe details
    // After editing, send a PUT request to your server to update the recipe
    console.log('Edit recipe with ID:', recipeId);
  };
  

  return (
    <div>
      <Header />
      <Container>
        <h1>Recipe Sharing App</h1>
        <RecipeForm onAddRecipe={addRecipe} />
        <div>
        {recipes.map((recipe) => (
  <RecipeCard
    key={recipe._id ? recipe._id.toString() : recipe._id} // Check if _id is defined
    recipe={recipe}
    onDelete={() => handleDeleteRecipe(recipe._id)} // Use _id for deletion
    onEdit={() => handleEditRecipe(recipe._id)} // Use _id for editing
  />
))}
        </div>
      </Container>
    </div>
  );
}

export default App;
