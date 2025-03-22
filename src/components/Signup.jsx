import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  
  const onSubmit = data => {
    console.log(data);
    // Handle form submission logic here
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create your</h1>
        <h1 className="text-4xl font-bold text-gray-900">PopX account</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 relative">
          <label className="absolute -top-2 rounded-full left-4 px-1 bg-gray-50 text-purple-600 text-sm">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-lg"
            placeholder="Marry Doe"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && <span className="text-red-500 text-sm">Full name is required</span>}
        </div>
        
        <div className="mb-4 relative">
          <label className="absolute -top-2 rounded-full left-4 px-1 bg-gray-50 text-purple-600 text-sm">
            Phone number<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-lg"
            placeholder="Enter phone number"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && <span className="text-red-500 text-sm">Phone number is required</span>}
        </div>
        
        <div className="mb-4 relative">
          <label className="absolute -top-2 rounded-full left-4 px-1 bg-gray-50 text-purple-600 text-sm">
            Email address<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-lg"
            placeholder="Enter email address"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>
        
        <div className="mb-4 relative">
          <label className="absolute -top-2 rounded-full left-4 px-1 bg-gray-50 text-purple-600 text-sm">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-lg"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
          />
          <button 
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
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
        
        <div className="mb-8 relative">
          <label className="absolute -top-2 rounded-full left-4 px-1 bg-gray-50 text-purple-600 text-sm">
            Company name
          </label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-lg"
            placeholder="Enter company name"
            {...register("companyName")}
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-purple-600 mb-1 text-sm">
            Are you an Agency?<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mt-2">
            <label className="inline-flex items-center mr-4">
              <div className="relative">
                <input
                  type="radio"
                  className="hidden"
                  value="yes"
                  {...register("isAgency", { required: true })}
                  defaultChecked
                />
                <div className="w-6 h-6 border-2 border-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                </div>
              </div>
              <span className="ml-2">Yes</span>
            </label>
            
            <label className="inline-flex items-center">
              <div className="relative">
                <input
                  type="radio"
                  className="hidden"
                  value="no"
                  {...register("isAgency", { required: true })}
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
              </div>
              <span className="ml-2">No</span>
            </label>
          </div>
          {errors.isAgency && <span className="text-red-500 text-sm">Please select an option</span>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-4 rounded-lg text-lg font-medium"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;