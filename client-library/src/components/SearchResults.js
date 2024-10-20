import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useLocation, Link } from 'react-router-dom';
import '../styles/SearchResults.css';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');

        const fetchData = async () => {
            if (query) {
                try {
                    const response = await axiosInstance.get(`search/?query=${query}`);
                    setResults(response.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    if (error.response && error.response.status === 401) {
                        console.log('Token expired, consider refreshing or logging out');
                    }
                }
            }
        };

        const handler = setTimeout(fetchData, 300); // Debounce for 300ms

        return () => {
            clearTimeout(handler); // Cleanup
        };
    }, [location.search]);

    return (
        <div>
            <h2>Search Results</h2>
            {results.length > 0 ? (
                <div className="search-results">
                    {results.map(book => (
                        <div key={book.id} className="search-book-details">
                            <Link to={`/menu/${book.id}`}>
                                <div className='search-leftdiv'>
                                    <img src={book.cover_image} alt={book.title} />
                                    <h2>{book.title}</h2>
                                </div>
                                <div className="search-rightdiv">
                                    <p>Author: {book.author}</p>
                                    <p>Genre: {book.genre}</p>
                                    <p>Description: {book.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;



















// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';
// import { useLocation, Link } from 'react-router-dom';
// import '../styles/SearchResults.css'
// const SearchResults = () => {
//     const [results, setResults] = useState([]);
//     const location = useLocation();

//     useEffect(() => {
//         const query = new URLSearchParams(location.search).get('query');
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get(`search/?query=${query}`);
//                 setResults(response.data);
//             } catch (error) {
//                 console.error('Error fetching search results:', error);
//                 if (error.response && error.response.status === 401) {
//                     console.log('Token expired, consider refreshing or logging out');
//                 }
//             }
//         };

//         if (query) {
//             fetchData();
//         }
//     }, [location.search]);

//     return (
//         <div>
//             <h2>Search Results</h2>
//             {results.length > 0 ? (
//                 <div className="search-results">
//                     {results.map(book => (
//                         <div key={book.id} className="search-book-details">
//                             <Link to={`/menu/${book.id}`}>
//                                 <div className='search-leftdiv'>
//                                     <img src={book.cover_image} alt={book.title} />
//                                     <h2>{book.title}</h2>
//                                 </div>
//                                 <div className="search-rightdiv">
//                                     <p>Author: {book.author}</p>
//                                     <p>Genre: {book.genre}</p>
//                                     <p>Description: {book.description}</p>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No results found.</p>
//             )}
//         </div>
//     );
// };

// export default SearchResults;

























