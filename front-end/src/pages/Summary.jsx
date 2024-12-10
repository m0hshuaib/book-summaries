import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();

  const book = location.state || {};


  const handleDashboard = () => {
    navigate('/dashboard');
  };
  


    const date = new Date(book.date_summarised);
    const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
    });


  return (
    <div className="flex pt-4 px-2 h-full">
        <div className="flex flex-col p-1  border-r border-solid border-grey">
            {book.cover_url ? (
            <img className='max-w-[237px] max-h-[355px] rounded' src={book.cover_url} alt={book.title || 'Book Cover'} />
            ) : (
            <p>No cover available</p>
            )}
            <p className='m-2'><span className='font-bold'>Author:</span> {book.author}</p>
            <p className='m-2'><span className='font-bold'>Rating:</span> {book.rating}/10</p>
            <p className='m-2'><span className='font-bold'>Isbn:</span> {book.isbn}</p>
            <p className='m-2'><span className='font-bold'>Date:</span> {formattedDate}</p>
        </div>
        <div className="flex flex-col flex-1 bg-white p-2">
                <div className='flex px-4 w-full'> 
                    <h1 className='text-4xl text-center flex-1'>Book Summary</h1>
                    <button onClick={handleDashboard} className='ml-auto rounded bg-green-500 text-white px-2'>Dashboard</button>
                </div>
                <div className='mt-5 bg-gray-100 rounded p-1'>
                    <h2 className='mb-2 font-bold'>Description</h2>
                    <p>{book.brief_summary}</p>
                </div>
                <div className='mt-5 bg-gray-100 rounded p-1'>
                    <h2 className='mb-2 font-bold'>Summary</h2>
                    <p>{book.full_summary}</p>
                </div>
        </div>
    </div>
  );
}

export default Summary;