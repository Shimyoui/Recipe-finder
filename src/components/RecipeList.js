import React, { useState } from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box, Divider } from '@mui/material';

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 140,
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto', // Ensures this section is at the bottom
  },
  infoText: {
    color: '#000', // Black color for text
    marginRight: '5px',
  },
  infoNumber: {
    color: '#8EC5FC', // Similar color to banner
    fontWeight: 'bold',
  },
  divider: {
    margin: '0 10px',
    backgroundColor: '#E0C3FC',
    height: '24px',
    width: '2px',
  },
  authorContainer: {
    textAlign: 'left',
    marginTop: '10px',
  },
  author: {
    color: '#2e8b57', // SeaGreen color
  },
  selectedCard: {
    backgroundColor: '#e0f7fa', // Light cyan color for selected card
  },
};

function RecipeList({ recipes, onRecipeSelect }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    onRecipeSelect(recipe);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {recipes.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ ...styles.card, ...(selectedRecipe === item && styles.selectedCard) }}>
            <CardActionArea onClick={() => handleRecipeSelect(item)} sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                sx={styles.media}
                image={item.image}
                alt={item.label}
              />
              <CardContent sx={styles.cardContent}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.label}
                </Typography>
                <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
                <Box sx={styles.infoContainer}>
                  <Typography sx={styles.infoText}>Calories:</Typography>
                  <Typography sx={styles.infoNumber}>{Math.round(item.calories)}</Typography>
                  <Divider sx={styles.divider} orientation="vertical" flexItem />
                  <Typography sx={styles.infoText}>Ingredients:</Typography>
                  <Typography sx={styles.infoNumber}>{item.ingredients.length}</Typography>
                </Box>
                <Box sx={styles.authorContainer}>
                  <Typography sx={styles.author}>
                    By: {item.source}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeList;