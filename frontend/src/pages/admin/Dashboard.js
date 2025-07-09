import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <Typography variant="body1" gutterBottom>
                Welcome back, {user?.name}!
            </Typography>
            
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Total Products</Typography>
                        <Typography variant="h4">124</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Total Orders</Typography>
                        <Typography variant="h4">56</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Revenue</Typography>
                        <Typography variant="h4">$2,450.00</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;