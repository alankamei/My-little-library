import React, { useState } from "react";
import axios from "axios";
import '../styles/Home.css';
import { Link } from "react-router-dom";

function Home({ books }) {
  const [clickCounts, setClickCounts] = useState({});

  const handleReadMoreClick = async (bookId) => {
    console.log(`Read More clicked for book ID: ${bookId}`);
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const token = localStorage.getItem('access');
      console.log(`User: ${user.username} (ID: ${user.id}) is logged in`);
      try {
        const response = await axios.post('http://localhost:8000/api/click-log/', {
          book: bookId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Click logged successfully!', response.data);
        setClickCounts((prevCounts) => ({
          ...prevCounts,
          [bookId]: (prevCounts[bookId] || 0) + 1 // Increment click count for this book
        }));
      } catch (error) {
        console.error('Error logging click:', error);
      }
    } else {
      console.log('No user is logged in');
    }
  };

  return (
    <div className="menuContainer">
      <h2>Welcome to our little library!</h2>
      <div className="menus">
        {books.map(book => (
          <div className="menu" key={book.id}>
            <h3>{book.title}</h3>
            {book.cover_image && <img src={book.cover_image} alt={book.title} />}
            <Link to={`/menu/${book.id}`} onClick={() => handleReadMoreClick(book.id)}>
              <button>Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;






























// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import '../styles/Home.css';
// import { Link } from "react-router-dom";

// function Home({ books }) {
//   return (
//     <div className="menuContainer">
//       <h2>Welcome to our little library!</h2>
//       <div className="menus">
//         {books.map(book => (
//           <div className="menu" key={book.id}>
//             <h3>{book.title}</h3>
//             {book.cover_image && <img src={book.cover_image} alt={book.title} />}
//             <Link to={`/menu/${book.id}`}>
//               <button>Read More</button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// } 

// export default Home;
