import React from 'react';
import "../assets/style/error.css"
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='error' >

      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link className='error-link' to="/">Back to Home</Link>
    
    </div>
  )
}

export default Error