
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Menu from './pages/Menu';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchResults from './components/SearchResults';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/books/');
        setBooks(response.data);
      } catch (error) {
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/menu/:id' element={<Menu books={books} />} />
          <Route path="/search" element={<SearchResults />} /> 
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
