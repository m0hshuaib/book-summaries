import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  const { username, password, first_name } = req.body;

  try {
    const existingUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await db.query(
      "INSERT INTO users (username, password, first_name) VALUES ($1, $2, $3) RETURNING id, username, first_name",
      [username, hashedPassword, first_name]
    );

    const token = jwt.sign(
      { id: result.rows[0].id, username }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      user: result.rows[0],
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Error during registration" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Error during login" });
  }
};