import React, { useState } from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleRecipeClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Header />
      <Container>
        <SearchBar setRecipes={setRecipes} />
        <RecipeList recipes={recipes} onRecipeSelect={handleRecipeSelect} />
        {selectedRecipe && (
          <RecipeDetails
            recipe={selectedRecipe}
            open={Boolean(selectedRecipe)}
            onClose={handleRecipeClose}
          />
        )}
      </Container>
    </div>
  );
}

export default App;