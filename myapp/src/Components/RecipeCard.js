import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 

function RecipeCard({ recipe, onDelete, onEdit }) {
  const handleDelete = () => {
    onDelete(recipe._id);
  };

  const handleEdit = () => {
    onEdit(recipe._id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>
        <Typography>Ingredients: {recipe.ingredients.join(', ')}</Typography>
        <Typography>Instructions: {recipe.instructions}</Typography>
        <IconButton onClick={handleEdit} aria-label="Edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
