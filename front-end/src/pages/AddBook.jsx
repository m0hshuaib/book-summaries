import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { booksService } from '../services/api';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const brief_description = description;
        const detailed_summary = summary;
        const date_summarised = date;
      await booksService.addBook({title, author, isbn, rating, brief_description, detailed_summary, date_summarised}) // { title, author, isbn, rating, brief_description, detailed_summary, date_summarised } = req.body;
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error Occured');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center flex-col p-8 w-screen">
        <div className='flex justify-end w-full mb-4'>
            <button onClick={handleDashboard} className='bg-green-500 text-white rounded py-2 px-2 hover:bg-green-600'>Dashboard</button>
        </div>
        <div className='bg-white p-8 rounded-lg shadow-md w-96 mr w-full'>
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
            <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Author</label>
                    <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                    />
                </div>
            </div>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">ISBN</label>
                        <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Rating</label>
                        <input
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                        />
                    </div>
                   
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Brief Description</label>
                    <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                    >{description}</textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Detailed Summary</label>
                    <textarea
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                    >{summary}</textarea>
                </div>
                <div className="flex justify-between">
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Date</label>
                        <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                        />
                    </div>
                    <div className='self-center'>
                        <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 px-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
        
      {/* <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default AddBook;