import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartslice';

const FruitListing = () => {
  const [fruits, setFruits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const [fruitsRes, categoriesRes] = await Promise.all([
        api.get('/fruits'),
        api.get('/categories')
      ]);
      setFruits(fruitsRes.data);
      setCategories(categoriesRes.data);
    };
    fetchData();
  }, []);

  const filteredFruits = fruits.filter(fruit => {
    const matchesCategory = !selectedCategory || fruit.category_id === selectedCategory;
    const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        fruit.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (fruit) => {
    dispatch(addItem({
      id: fruit.id,
      name: fruit.name,
      price: fruit.price,
      quantity: 1,
      image: fruit.image_url
    }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          label="Search Fruits"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '50%' }}
        />
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          style={{ width: '200px' }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))}
        </Select>
      </div>

      <Grid container spacing={3}>
        {filteredFruits.map(fruit => (
          <Grid item xs={12} sm={6} md={4} key={fruit.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={fruit.image_url || '/placeholder-fruit.jpg'}
                alt={fruit.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {fruit.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {fruit.description}
                </Typography>
                <Typography variant="h6" style={{ margin: '10px 0' }}>
                  ${fruit.price.toFixed(2)}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => handleAddToCart(fruit)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FruitListing;