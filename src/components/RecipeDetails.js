import React from 'react'; 
import { Dialog, DialogContent, Grid, Typography, Link, CardMedia, IconButton, Box, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close'; 
import SaveIcon from '@mui/icons-material/Save'; 
import EmailIcon from '@mui/icons-material/Email'; 
import PinterestIcon from '@mui/icons-material/Pinterest'; 
import FacebookIcon from '@mui/icons-material/Facebook'; 
import TwitterIcon from '@mui/icons-material/Twitter';

const styles = {
  dialogContent: {
    backgroundColor: '#ffffff', // Changed to white
    padding: '24px'
  },
  centeredText: {
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px' // Reduced margin bottom
  },
  sectionContent: {
    marginBottom: '24px',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative'
  },
  ingredientsList: {
    listStyleType: 'disc',
    paddingLeft: '20px'
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px'
  },
  tagTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  tagList: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '16px',
    marginBottom: '24px'
  },
  socialIconLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit'
  },
  divider: {
    margin: '8px 0' // Reduced margin
  },
  nutritionInfo: {
    textAlign: 'center',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '8px',
    backgroundColor: '#f9f9f9'
  },
  nutritionValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#8EC5FC'
  },
  nutritionLabel: {
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#000'
  }
};

function RecipeDetails({ recipe, open, onClose }) {
  if (!recipe) {
    return null;
  }

  const handleSaveRecipe = () => {
    const recipeData = `
      Recipe: ${recipe.label}
      Source: ${recipe.source} (${recipe.url})
      Calories: ${Math.round(recipe.calories)}
      Servings: ${recipe.servings}
      Ingredients: ${recipe.ingredients.join(', ')}
      Instructions: ${recipe.preparation}
    `;

    const blob = new Blob([recipeData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${recipe.label}.txt`;
    link.click();
  };

  const nutrientInfo = [
    { label: 'Fat', value: (recipe.totalNutrients?.FAT?.quantity || 0).toFixed(2), unit: recipe.totalNutrients?.FAT?.unit || 'g' },
    { label: 'Carbs', value: (recipe.totalNutrients?.CHOCDF?.quantity || 0).toFixed(2), unit: recipe.totalNutrients?.CHOCDF?.unit || 'g' },
    { label: 'Sugar', value: (recipe.totalNutrients?.SUGAR?.quantity || 0).toFixed(2), unit: recipe.totalNutrients?.SUGAR?.unit || 'g' },
    { label: 'Protein', value: (recipe.totalNutrients?.PROCNT?.quantity || 0).toFixed(2), unit: recipe.totalNutrients?.PROCNT?.unit || 'g' },
    { label: 'Fiber', value: (recipe.totalNutrients?.FIBTG?.quantity || 0).toFixed(2), unit: recipe.totalNutrients?.FIBTG?.unit || 'g' },
    { label: 'Sodium', value: (recipe.totalNutrients?.NA?.quantity || 0).toFixed(2), unit: recipe.totalNutrients?.NA?.unit || 'mg' },
    { label: 'Cholesterol', value: (recipe.totalNutrients?.CHOLE?.quantity || 0).toFixed(2), unit: recipe.totalNutrients?.CHOLE?.unit || 'mg' }
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent sx={styles.dialogContent}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="300"
              image={recipe.image}
              alt={recipe.label}
              sx={{ borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={styles.centeredText}>
              <Typography variant="h4" gutterBottom>{recipe.label}</Typography>
              <Typography variant="subtitle1" gutterBottom>
                By: <Link href={recipe.url} target="_blank">{recipe.source}</Link>
              </Typography>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveRecipe}
                sx={{ marginY: 2, bgcolor: '#4caf50', color: 'white', '&:hover': { bgcolor: '#45a045' } }}
              >
                Save Recipe
              </Button>
              <Box sx={styles.socialIcons}>
                <Link href={`mailto:?subject=${recipe.label}&body=Check out this recipe: ${recipe.url}`} sx={styles.socialIconLink}>
                  <EmailIcon /> Email
                </Link>
                <Link href={`https://www.pinterest.com/pin/create/button/?url=${recipe.url}`} target="_blank" sx={styles.socialIconLink}>
                  <PinterestIcon /> Pinterest
                </Link>
                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${recipe.url}`} target="_blank" sx={styles.socialIconLink}>
                  <FacebookIcon /> Facebook
                </Link>
                <Link href={`https://twitter.com/intent/tweet?url=${recipe.url}`} target="_blank" sx={styles.socialIconLink}>
                  <TwitterIcon /> Twitter
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={styles.sectionTitle}>Ingredients</Typography>
              <Divider sx={styles.divider} />
              <Box sx={styles.sectionContent}>
                <ul style={styles.ingredientsList}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}><Typography>{ingredient}</Typography></li>
                  ))}
                </ul>
              </Box>
              <Typography sx={styles.tagTitle}>Tags</Typography>
              <Divider sx={styles.divider} />
              <Box sx={styles.sectionContent}>
                <Box sx={styles.tagList}>
                  {recipe.dietLabels.map((label, index) => (
                    <Chip key={index} label={label} color="primary" />
                  ))}
                  {recipe.healthLabels.map((label, index) => (
                    <Chip key={index} label={label} color="secondary" />
                  ))}
                  {recipe.cautions.map((label, index) => (
                    <Chip key={index} label={label} color="error" />
                  ))}
                </Box>
              </Box>
              <Typography sx={styles.sectionTitle}>Preparation</Typography>
              <Divider sx={styles.divider} />
              <Box sx={styles.sectionContent}>
                <Button variant="contained" sx={{ bgcolor: '#9370DB', color: 'white', '&:hover': { bgcolor: '#7B68EE' } }}>
                  Instructions
                </Button>
                <Typography variant="body1" component="span" sx={{ marginLeft: '8px' }}>on <Link href={recipe.preparation} target="_blank">{recipe.source}</Link></Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={styles.sectionTitle}>Nutrition Values</Typography>
              <Divider sx={styles.divider} />
              <Box sx={styles.sectionContent}>
                {[
                  { value: Math.round(recipe.calories), label: 'Calories' },
                  { value: `${(recipe.totalDaily?.ENERC_KCAL?.quantity || 0).toFixed(2)}%`, label: 'Daily Value' },
                  { value: recipe.servings, label: 'Servings' },
                  { value: `${(recipe.totalWeight || 0).toFixed(2)}g`, label: 'Total Weight' },
                  { value: recipe.totalTime, label: 'Total Time (min)' }
                ].map((item, index) => (
                  <Box key={index} sx={styles.nutritionInfo}>
                    <Typography sx={styles.nutritionValue}>{item.value}</Typography>
                    <Typography sx={styles.nutritionLabel}>{item.label}</Typography>
                  </Box>
                ))}
              </Box>
              <Typography sx={styles.sectionTitle}>Other Nutritional Information</Typography>
              <Divider sx={styles.divider} />
              <Box sx={styles.sectionContent}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nutrient</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Unit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {nutrientInfo.map((nutrient, index) => (
                        <TableRow key={index}>
                          <TableCell>{nutrient.label}</TableCell>
                          <TableCell align="right">{nutrient.value}</TableCell>
                          <TableCell align="right">{nutrient.unit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeDetails;