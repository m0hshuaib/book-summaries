import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/books.routes.js';
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
}


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

});