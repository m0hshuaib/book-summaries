import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { 
  getUserBooks, 
  addBook, 
  updateEntry, 
  deleteEntry 
} from '../controllers/books.controller.js';

const router = express.Router();

router.get('/users-books', authenticateToken, getUserBooks);
router.post('/books', authenticateToken, addBook);
router.put('/books/:id', authenticateToken, updateEntry);
router.delete('/books/:id', authenticateToken, deleteEntry);

export default router;