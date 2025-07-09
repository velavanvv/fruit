import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../../store/cartslice';

const Cart = ({ onCheckout }) => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id: item.id, quantity: parseInt(newQuantity) }));
        }
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item, e.target.value)}
                                        inputProps={{ min: 1 }}
                                        style={{ width: '60px' }}
                                    />
                                </TableCell>
                                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        color="error"
                                        onClick={() => dispatch(removeItem(item.id))}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3} align="right">Total:</TableCell>
                            <TableCell>${cart.total.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => dispatch(clearCart())}
                >
                    Clear Cart
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={onCheckout}
                    disabled={cart.items.length === 0}
                >
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
};

export default Cart;