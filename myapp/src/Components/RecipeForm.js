import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function RecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = { title, ingredients: ingredients.split(','), instructions };
  
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
  
      if (response.ok) {
        onAddRecipe(newRecipe);
        setTitle('');
        setIngredients('');
        setInstructions('');
      }
    } catch (error) {
      console.error('Error adding recipe', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        style={{ marginBottom: '10px' }}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Ingredients "
        value={ingredients}
        style={{ marginBottom: '10px' }}
        onChange={(e) => setIngredients(e.target.value)}
        fullWidth
      />
      <TextField
        label="Instructions"
        value={instructions}
        style={{ marginBottom: '10px' }}
        onChange={(e) => setInstructions(e.target.value)}
        multiline
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '10px' }}>
        Add Recipe
      </Button>
    </form>
  );
}

export default RecipeForm;
