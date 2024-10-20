import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      setUser(userData);
    }
  }, []);

  const handleSearch = async () => {
    if (isSearching || !searchTerm) return;

    setIsSearching(true);
    try {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(''); // Clear search term after navigating
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link className="nav-link" to="/">
          Logo
        </Link>
      </div>
      <div className="search-container">
        <input
          className="search-input"
          placeholder="Search books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Show Recommendations
        </button>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-user">{user.username}</span>
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;





















// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Updated import
// import SearchIcon from "@mui/icons-material/Search";
// import "../styles/Navbar.css";

// function Navbar() {
//   const [user, setUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

//   useEffect(() => {
//     const loggedUser = localStorage.getItem("user");
//     if (loggedUser) {
//       const userData = JSON.parse(loggedUser);
//       setUser(userData);
//     }
//   }, []);

//   const handleSearch = () => {
//     if (searchTerm) {
//       navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // Updated to use navigate
//     }
//     setSearchTerm()
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     window.location.href = "/";
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <Link className="nav-link" to="/">
//           Logo
//         </Link>
//       </div>
//       <div className="search-container">
//         <input
//           className="search-input"
//           placeholder="Search books"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         {/* <SearchIcon className="search-icon" onClick={handleSearch} /> */}
//         <button className="search-button" onClick={handleSearch}>
//           Show Recommendations
//         </button>
//       </div>
//       <div className="nav-links">
//         {user ? (
//           <>
//             <span className="nav-user">{user.username}</span>
//             <button className="nav-link" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link className="nav-link" to="/login">
//               Login
//             </Link>
//             <Link className="nav-link" to="/register">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;