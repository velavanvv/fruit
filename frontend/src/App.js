import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

// Pages
import Home from './pages/user/Home';
import FruitListing from './pages/user/FruitListing';
import Cart from './pages/user/cart.js';
import Checkout from './pages/user/Checkout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import CategoryManagement from './pages/admin/CategoryManagement';
import FruitManagement from './pages/admin/FruitManagement';
import OrderManagement from './pages/admin/OrderManagement';

const theme = createTheme();

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fruit Store
          </Typography>
          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <Button color="inherit" href="/admin">Dashboard</Button>
                  <Button color="inherit" href="/admin/categories">Categories</Button>
                  <Button color="inherit" href="/admin/fruits">Products</Button>
                  <Button color="inherit" href="/admin/orders">Orders</Button>
                </>
              ) : (
                <>
                  <Button color="inherit" href="/">Home</Button>
                  <Button color="inherit" href="/fruits">Shop</Button>
                  <Button color="inherit" href="/cart">Cart</Button>
                </>
              )}
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" href="/login">Login</Button>
              <Button color="inherit" href="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  );
};

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={
                <AppLayout>
                  <Home />
                </AppLayout>
              } />
              <Route path="/fruits" element={
                <AppLayout>
                  <FruitListing />
                </AppLayout>
              } />
              <Route path="/cart" element={
                <AppLayout>
                  <Cart />
                </AppLayout>
              } />
              <Route path="/checkout" element={
                <AppLayout>
                  <Checkout />
                </AppLayout>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/categories" element={
                <ProtectedRoute adminOnly>
                  <AppLayout>
                    <CategoryManagement />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/fruits" element={
                <ProtectedRoute adminOnly>
                  <AppLayout>
                    <FruitManagement />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute adminOnly>
                  <AppLayout>
                    <OrderManagement />
                  </AppLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;