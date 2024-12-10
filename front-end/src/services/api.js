import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Your backend URL
});

// Add interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication services
export const authService = {
  async login(username, password) {
    try {
      const response = await api.post('/auth/login', { username, password });
      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Login failed');
    }
  },

  async register(username, password, first_name) {
    try {
      const response = await api.post('/auth/register', { 
        username, 
        password, 
        first_name 
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Registration failed');
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Books service
export const booksService = {
  async getAllBooks() {
    try {
      const response = await api.get('/users-books');
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch books');
    }
  },

  async addBook(bookData) {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to add book');
    }
  },

  async updateBook(id, bookData) {
    try {
      const response = await api.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to update book');
    }
  },

  async deleteBook(id) {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to delete book');
    }
  }
};