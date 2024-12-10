import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { booksService } from '../services/api';

function Update() {
  const location = useLocation();
  const book = location.state;
  const [rating, setRating] = useState(book.rating);
  const [description, setDescription] = useState(book.brief_summary);
  const [summary, setSummary] = useState(book.full_summary);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const brief_summary = description;
        const full_summary = summary;
        const date_summarised = date;
      await booksService.updateBook(book.id, {rating, brief_summary, full_summary, date_summarised}) // { title, author, isbn, rating, brief_description, detailed_summary, date_summarised } = req.body;
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
            <h2 className="text-2xl font-bold mb-6 text-center">Update Book</h2>
            <form onSubmit={handleSubmit}>
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
                <div className='self-center'>
                        <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 px-4">Submit</button>
                    </div>
            </form>
        </div>
    </div>
  );
}

export default Update;