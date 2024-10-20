import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/Menu.css'
function Menu({ books }) {
  const { id } = useParams();
  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return <div>Book not found!</div>;
  }

  return (
    <div className="book-details">
      <div className='leftdiv'>
        <img src={book.cover_image} alt={book.title} />
        <h2>{book.title}</h2>
      </div>
      <div className="rightdiv">
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>
        <p>Description: {book.description}</p>
      </div>
      <Link to={"/"}><button>Go Back</button></Link>
    </div>
  );
  
}

export default Menu;
