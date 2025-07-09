import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Typography } from '@mui/material';
import api from '../../services/api';

const FruitManagement = () => {
    const [fruits, setFruits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentFruit, setCurrentFruit] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image_url: '',
        category_id: ''
    });

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

    const handleOpenDialog = (fruit = null) => {
        if (fruit) {
            setCurrentFruit({
                id: fruit.id,
                name: fruit.name,
                description: fruit.description,
                price: fruit.price,
                quantity: fruit.quantity,
                image_url: fruit.image_url,
                category_id: fruit.category_id
            });
        } else {
            setCurrentFruit({
                name: '',
                description: '',
                price: '',
                quantity: '',
                image_url: '',
                category_id: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentFruit(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (currentFruit.id) {
                await api.updateFruit(currentFruit.id, currentFruit);
            } else {
                await api.createFruit(currentFruit);
            }
            const response = await api.get('/fruits');
            setFruits(response.data);
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving fruit:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.deleteFruit(id);
            const response = await api.get('/fruits');
            setFruits(response.data);
        } catch (error) {
            console.error('Error deleting fruit:', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Typography variant="h5">Fruit Management</Typography>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleOpenDialog()}
                >
                    Add Fruit
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fruits.map(fruit => (
                            <TableRow key={fruit.id}>
                                <TableCell>{fruit.name}</TableCell>
                                <TableCell>{fruit.category?.name}</TableCell>
                                <TableCell>${fruit.price}</TableCell>
                                <TableCell>{fruit.quantity}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={() => handleOpenDialog(fruit)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="error"
                                        onClick={() => handleDelete(fruit.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {currentFruit.id ? 'Edit Fruit' : 'Add New Fruit'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={currentFruit.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        value={currentFruit.description}
                        onChange={handleInputChange}
                    />
                    <Select
                        margin="normal"
                        required
                        fullWidth
                        label="Category"
                        name="category_id"
                        value={currentFruit.category_id}
                        onChange={handleInputChange}
                        style={{ marginTop: '16px', marginBottom: '8px' }}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Price"
                        name="price"
                        type="number"
                        inputProps={{ step: "0.01" }}
                        value={currentFruit.price}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={currentFruit.quantity}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Image URL"
                        name="image_url"
                        value={currentFruit.image_url}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FruitManagement;