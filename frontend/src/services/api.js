import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
   withCredentials: true,
    withXSRFToken: true, // Required for Sanctum cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Add CSRF protection for all non-GET requests
api.interceptors.request.use(async (config) => {
  // Only set CSRF for non-GET requests to your Laravel API
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
    // First ensure we have a CSRF cookie
    await axios.get('/sanctum/csrf-cookie', {
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
      withCredentials: true
    });
  }

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default {
  // Auth
  async register(data) {
    await this.ensureCsrfCookie();
    return api.post('/register', data);
  },
  async login(data) {
    await this.ensureCsrfCookie();
    return api.post('/login', data);
  },
  logout() {
    return api.post('/logout');
  },
  getUser() {
    return api.get('/user');
  },

  // Helper method to ensure CSRF cookie
  async ensureCsrfCookie() {
    return axios.get('/sanctum/csrf-cookie', {
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
      withCredentials: true
    });
  },

  // Categories
  getCategories() {
    return api.get('/categories');
  },
  async createCategory(data) {
    await this.ensureCsrfCookie();
    return api.post('/categories', data);
  },
  async updateCategory(id, data) {
    await this.ensureCsrfCookie();
    return api.put(`/categories/${id}`, data);
  },
  async deleteCategory(id) {
    await this.ensureCsrfCookie();
    return api.delete(`/categories/${id}`);
  },

  // Fruits
  getFruits() {
    return api.get('/fruits');
  },
  async createFruit(data) {
    await this.ensureCsrfCookie();
    return api.post('/fruits', data);
  },
  async updateFruit(id, data) {
    await this.ensureCsrfCookie();
    return api.put(`/fruits/${id}`, data);
  },
  async deleteFruit(id) {
    await this.ensureCsrfCookie();
    return api.delete(`/fruits/${id}`);
  },

  // Orders
  async createOrder(data) {
    await this.ensureCsrfCookie();
    return api.post('/orders', data);
  },
  getOrders() {
    return api.get('/orders');
  },
  getAdminOrders() {
    return api.get('/admin/orders');
  },
  async updateOrderStatus(id, data) {
    await this.ensureCsrfCookie();
    return api.put(`/admin/orders/${id}`, data);
  },

  // Payment
  async createPaymentIntent(data) {
    await this.ensureCsrfCookie();
    return api.post('/payment-intent', data);
  }
};