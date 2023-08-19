import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
function RecipeDetailsModal({ recipe, onClose }) {
    return (
      <Dialog open={true} onClose={onClose} fullScreen>
        <DialogContent>
          <Typography variant="h6">{recipe.title}</Typography>
          <Typography>Ingredients: {recipe.ingredients.join(', ')}</Typography>
          <Typography>
            Instructions: <br />
            {recipe.instructions.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
          <IconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    );
  }
  

export default RecipeDetailsModal;
