import db from '../config/database.js';
import axios from 'axios';

const API_URL = "https://bookcover.longitood.com/bookcover/";

const fetchBookCover = async (bookIsbn) => {
  try {
    const response = await axios.get(API_URL + bookIsbn);
    return response.data.url;
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return null;
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT u.*, b.title, b.cover_url, b.author, b.isbn 
       FROM user_entries u 
       JOIN books b ON u.book_id = b.id 
       WHERE u.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user books:', error);
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const addBook = async (req, res) => {
  const { title, author, isbn, rating, brief_description, detailed_summary, date_summarised } = req.body;

  try {
    const bookCoverUrl = await fetchBookCover(isbn);
    
    // Use a transaction to ensure data consistency
    await db.query('BEGIN');

    let bookId;
    const existingBook = await db.query(
      "SELECT id FROM books WHERE LOWER(title) = $1",
      [title.toLowerCase()]
    );

    if (existingBook.rows.length === 0) {
      const newBook = await db.query(
        `INSERT INTO books (title, cover_url, author, isbn) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id`,
        [title, bookCoverUrl, author, isbn]
      );
      bookId = newBook.rows[0].id;
    } else {
      bookId = existingBook.rows[0].id;
    }

    const entry = await db.query(
      `INSERT INTO user_entries 
       (user_id, book_id, brief_summary, full_summary, date_summarised, rating) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [req.user.id, bookId, brief_description, detailed_summary, date_summarised, rating]
    );

    await db.query('COMMIT');

    res.status(201).json(entry.rows[0]);
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error adding book:', error);
    res.status(500).json({ message: "Error adding book" });
  }
};

export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { brief_summary, full_summary, date_summarised, rating } = req.body;

  try {
    const result = await db.query(
      `UPDATE user_entries 
       SET brief_summary = $1, full_summary = $2, date_summarised = $3, rating = $4 
       WHERE id = $5 AND user_id = $6 
       RETURNING *`,
      [brief_summary, full_summary, date_summarised, rating, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Entry not found or unauthorized" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ message: "Error updating entry" });
  }
};

export const deleteEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM user_entries WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Entry not found or unauthorized" });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: "Error deleting entry" });
  }
};