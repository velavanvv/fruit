import React, { useState } from 'react';
import { Button, Typography, TextField, Box, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartslice';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        total_amount: cart.total,
        payment_method: 'cash', // or whatever method you prefer
        shipping_address: JSON.stringify(shippingAddress),
        items: cart.items.map(item => ({
          fruit_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await api.createOrder(orderData);
      dispatch(clearCart());
      setOrderSuccess(true);
    } catch (err) {
      console.error('Order error:', err);
    }
  };

  if (cart.items.length === 0 && !orderSuccess) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h5">Your cart is empty</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/')}
          style={{ marginTop: '20px' }}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h4" gutterBottom>Order Placed Successfully!</Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for your order. We'll process it shortly.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/')}
          style={{ marginTop: '20px' }}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Street Address"
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="State/Province"
                value={shippingAddress.state}
                onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="ZIP/Postal Code"
                value={shippingAddress.zip}
                onChange={(e) => setShippingAddress({...shippingAddress, zip: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Country"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
              />
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total: ${cart.total.toFixed(2)}
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: '20px' }}
        >
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default Checkout;