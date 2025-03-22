import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';


const Login = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  
  const email = watch('email');
  const password = watch('password');
  
  useEffect(() => {
    // Check if both email and password fields have values
    if (email && password) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [email, password]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      // Authenticate with Supabase
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      
      console.log('Login successful:', authData);
      
      // Navigate to profile page after successful login
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Failed to login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-2">Signin to your PopX account</h1>
      <p className="text-gray-500 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      
      {loginError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {loginError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 relative">
          <label htmlFor="email" className="absolute -top-2 rounded-full left-4 px-1 bg-white text-purple-600 text-sm">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-500"
            {...register('email', { required: true })}
            disabled={isSubmitting}
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>
        
        <div className="mb-6 relative">
          <label htmlFor="password" className="absolute -top-2 left-4 rounded-full px-1 bg-white text-purple-600 text-sm">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-500"
            {...register('password', { required: true })}
            disabled={isSubmitting}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isSubmitting}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
          {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
        </div>
        
        <button
          type="submit"
          className={`w-full p-4 rounded-lg font-medium ${
            isFormFilled && !isSubmitting ? 'bg-purple-600 text-white' : 'bg-gray-300 text-white'
          }`}
          disabled={!isFormFilled || isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;