import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', data);
      setSuccessMessage("Registration successful! Please log in.");
      setErrorMessage(''); // Clear any previous error messages
      setData({ username: '', email: '', password: '' });
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage(''); // Clear success message on error
      // Handle different error responses
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail || 'Registration failed!'); // Use specific error message if available
      } else {
        setErrorMessage('Registration failed!');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={data.username}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={data.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
}

export default Register;


































// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// function Register() {
    
//     const [data, setData] = useState({username:'',email:'', password:''})
//     const[successMessage, setSuccessMessage] = useState('')

    
//     const handleSubmit = async (e) =>{
//         e.preventDefault()
//         try {
//             const response = await axios.post('http://localhost:8000/api/register/', data);
//             setSuccessMessage("Registration successful please login!")
//             setData({username:'', email:'', password:''})
//         } catch (error) {
//             console.error('error', error)
//             setSuccessMessage('Registration failed!')
//         }
//     }
    

//     const handleChange = (e) => {
//         const {name, value } = e.target;
//         setData((data) =>({...data,[name]:value}))
//     }


//   return (
//     <div>
//        <form onSubmit={handleSubmit}>
//        <input type='text' name='username' placeholder='username' value={data.username} onChange={handleChange}/>
//        <input type='email' name='email' placeholder='email' value={data.email} onChange={handleChange}/>
//        <input type='password' name='password' placeholder='password' value={data.password} onChange={handleChange}/>
//        <button type='submit'>Submit</button>
//        </form>
//         {successMessage && <p>{successMessage}</p>}

//     </div>
//   )
// }

// export default Register