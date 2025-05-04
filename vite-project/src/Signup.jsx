import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup() {
  // State variables for the form inputs
  const [username, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigate hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page refresh

    try {
      // Send data to backend using axios
      const res = await axios.post('http://localhost:3001/user/signup', {
        username,
        email,
        password,
      });

      // Handle response (e.g., redirect user after successful signup)
      if (res.status === 201) {
        localStorage.setItem('token', token);
        alert('Account created successfully');
        console.log(res);
        navigate('/login');  // Redirect to login page
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-purple-200 to-blue-200">
      <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 font-mono">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-600">Full Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-600">Password</label>
            <input
              minLength='6'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-green-500 hover:bg-green-200 hover:text-black text-white py-2 rounded-lg transition duration-200 font-semibold border border-green-800 cursor-pointer"
          >
            Signup
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
