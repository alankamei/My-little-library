import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/login/', data);
        console.log('API response:', response.data);

        const user = {
            username: response.data.username, // Ensure backend returns this
            email: response.data.email,       // Store email as well
        };

        // Store user data and tokens
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);

        setSuccessMessage("Login successful!");
        setErrorMessage('');
        window.location.href = '/'; // Redirect to home
    } catch (error) {
        console.error('Login error:', error);
        setErrorMessage('Login failed! Please check your credentials.');
        setSuccessMessage('');
    }
};



  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;































// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [data, setData] = useState({ email: '', password: '' });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/login/', data);
//       setSuccessMessage("Login successful!");
//       setErrorMessage(''); // Clear error message on success
//     } catch (error) {
//       setErrorMessage('Login failed! Please check your credentials.');
//       setSuccessMessage(''); // Clear success message on error
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={data.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={data.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//         {successMessage && <p>{successMessage}</p>}
//         {errorMessage && <p>{errorMessage}</p>}
//       </form>
//     </div>
//   );
// }

// export default Login;
