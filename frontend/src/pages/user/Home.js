import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Fruit Store
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Fresh fruits delivered to your doorstep
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        onClick={() => navigate('/fruits')}
      >
        Shop Now
      </Button>
    </Box>
  );
};

export default Home;