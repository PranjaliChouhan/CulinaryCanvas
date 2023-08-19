

import './App.css';

import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm'; 
import { sampleRecipes } from './components/SampleRecipes';

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
 

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('http://localhost:5000/api/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes', error);
      }
    }

    fetchRecipes();
  }, []);

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
  
      if (response.ok) {
        const createdRecipe = await response.json();
        setRecipes([...recipes, createdRecipe]);
      } else {
        console.error('Error adding recipe');
      }
    } catch (error) {
      console.error('Error adding recipe', error);
    }
  };
  
  const handleDeleteRecipe = async (recipeId) => {
    try {
      await fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
        method: 'DELETE',
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe', error);
    }
  };

  
  
  return (
    <div>
      <Header />
      <Container>
        <h1>Share-Recipe</h1>
        <RecipeForm onAddRecipe={handleAddRecipe} /> {/* Use handleAddRecipe */}
        <div>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id ? recipe._id.toString() : recipe._id}
              recipe={recipe}
              onDelete={() => handleDeleteRecipe(recipe._id)}
              
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
