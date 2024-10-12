// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { connectPlugWallet } from '../services/plugService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setConnecting(true);

    try {
      const principal = await connectPlugWallet();
      // Optionally, fetch user profile to verify existence
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <FaSignInAlt className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Login</h2>
          <p className="text-gray-400">Access your account</p>
        </div>

        {error && (
          <div className="alert alert-error shadow-lg mb-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M6 18L18 6"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogin}
          className={`btn btn-primary w-full flex items-center justify-center ${
            connecting ? 'loading' : ''
          }`}
          disabled={connecting}
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{' '}
          <a href="/" className="text-blue-500 hover:underline">
            Sign Up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
