import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { booksService } from '../services/api';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const userBooks = await booksService.getAllBooks();
        setBooks(userBooks);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch books', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddBook = () => {
    navigate('/add-book');
  };

  const handleDelete = (bookId) => {
    booksService.deleteBook(bookId);
    setBooks((prevValue) => prevValue.filter((book) => book.id !== bookId));
    navigate('/dashboard');
  };

  const handleViewSummary = (bookData) => {
    console.log(bookData);
    navigate('/summary', {state: bookData});
  };

  const handleUpdate = (bookData) => {
    console.log(bookData);
    navigate('/update', {state: bookData});
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.first_name || 'User'}
        </h1>
        <div>
            
          <button
            onClick={handleAddBook}
            className="bg-green-500 text-white px-4 py-2 rounded mr-4"
          >
            Add Book
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center text-gray-500">
          No books added yet. Start by adding a book!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {books.map((book) => (
            <div className="flex">
                <div>
                    <img className='rounded min-h-full max-w-[237px]' src={book.cover_url} alt="" />
                </div>
                <div 
                    key={book.id} 
                    className="bg-white shadow-md rounded-lg p-6 flex flex-col"
                    >
                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <p className="text-gray-600">by {book.author}</p>
                    <p className="mt-2">Rating: {book.rating}/10</p>
                    <p className="mt-2"><span className='font-bold'> Description</span> <br/>{book.brief_summary}</p>
                    <div className='flex justify-between mt-auto'>
                        <button onClick={() => handleViewSummary(book)} className='p-2 bg-blue-200 rounded'>View Summary</button>
                        <button onClick={() => handleUpdate(book)} className='p-2 px-4 bg-orange-200 rounded'>Update</button>
                        <button onClick={() => handleDelete(book.id)} className='p-4 py-2 bg-red-200 rounded'>Delete</button>
                    </div>
                </div>
            </div>
          ))}
        </div> 
      )}
    </div>
  );
}

export default Dashboard;