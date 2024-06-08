import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function SearchBar({ setRecipes }) {
  const [query, setQuery] = useState('');

  const fetchRecipes = async () => {
    const APP_ID = 'fa2ebdd0';
    const APP_KEY = '0b3efee9df57b2ec253193bf5cebef46';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
      const result = await axios.get(url);
      const detailedRecipes = result.data.hits.map(hit => ({
        label: hit.recipe.label || 'No title',
        image: hit.recipe.image || 'https://via.placeholder.com/150',
        url: hit.recipe.url || '#',
        source: hit.recipe.source || 'Unknown source',
        ingredients: hit.recipe.ingredientLines || [],
        calories: hit.recipe.calories || 0,
        totalWeight: hit.recipe.totalWeight || 0,
        servings: hit.recipe.yield || 0,
        dietLabels: hit.recipe.dietLabels || [],
        healthLabels: hit.recipe.healthLabels || [],
        cautions: hit.recipe.cautions || [],
        totalTime: hit.recipe.totalTime || 0,
        cuisineType: hit.recipe.cuisineType || [],
        mealType: hit.recipe.mealType || [],
        dishType: hit.recipe.dishType || [],
        totalNutrients: hit.recipe.totalNutrients || {},
        totalDaily: hit.recipe.totalDaily || {},
        preparation: hit.recipe.url || 'Instructions not available'
      }));
      setRecipes(detailedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchRecipes();
    }
  };

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Search for recipes"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ mr: 1, width: '70%' }}
      />
      <Button variant="contained" color="primary" onClick={fetchRecipes}
      >
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;