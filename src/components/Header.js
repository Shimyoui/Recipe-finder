import React from 'react';
import { Box, Typography } from '@mui/material';

const styles = {
  header: {
    backgroundColor: '#8EC5FC',
    backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
    padding: '10px 0',
    textAlign: 'center',
    width: '100%',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: '15px',
    color: '#fff',
    marginTop: '10px',
  },
};

function Header() {
  return (
    <Box sx={styles.header}>
      <Typography sx={styles.title}>Recipe Finder</Typography>
      <Typography sx={styles.subtitle}>Search your own recipe</Typography>
    </Box>
  );
}

export default Header;