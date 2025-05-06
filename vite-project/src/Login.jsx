import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission and login logic
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password
      });

      // Check if login was successful
      if (response.data.token) {
        // Save the JWT token to localStorage
        console.log(response);
        localStorage.setItem('token', response.data.token);
        
        // Navigate to a protected route (e.g., dashboard or home)
        navigate('/');
      }
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-300 to-purple-300">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 font-mono">Login</h1>
        </div>

        {/* Show error message if login fails */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="flex flex-col gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-500 ">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-500">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>

          <button
            onClick={handleLogin}
            className="mt-4 w-full bg-green-500 hover:bg-green-200 hover:text-black text-white py-2 rounded-lg transition duration-200 font-semibold border border-green-800 cursor-pointer"
          >
            Login
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            Not registered?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
