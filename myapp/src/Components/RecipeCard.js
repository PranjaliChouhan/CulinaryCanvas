import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import InfoIcon from '@mui/icons-material/Info'; 


import RecipeDetailsModal from "./RecipeDetailsModal";


function RecipeCard({ recipe, onDelete, onUpdate }) {
  
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  

  const handleToggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const handleDelete = () => {
    onDelete(recipe._id);
  };

  

  

  

 


  
  return (
    <Card style={{ marginBottom: '10px' }}>
      <CardContent>
        
        
            <>
            <Typography variant="h6">{recipe.title}</Typography>
            <Typography  >Ingredients: {recipe.ingredients.join(', ')}</Typography>
            

            
            <Typography>
            Instructions: <br />
            {recipe.instructions
              .split('\n')
              .slice(0, 2) // Only display the first two lines
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </Typography>
          
            <IconButton onClick={handleDelete} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleToggleDetails} aria-label="View Details">
              <InfoIcon />
        </IconButton>
       
          </>
        
      </CardContent>
      {isDetailsOpen && (
        <RecipeDetailsModal recipe={recipe} onClose={handleToggleDetails} />
      )}
    </Card>
  );
}

export default RecipeCard;



