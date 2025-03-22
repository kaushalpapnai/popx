import React from 'react';

const Profile = () => {
  return (
    <div className='flex items-center justify-center'>
    <div className="max-w-md mt-12 p-2">
      <div className="flex items-start space-x-4">
        {/* Profile picture with camera icon */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
            <img src="/api/placeholder/150/150" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="purple" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
        </div>
        
        {/* User information */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-900">Marry Doe</h2>
          <p className="text-gray-600">Marry@Gmail.Com</p>
        </div>
      </div>
      
      {/* Lorem ipsum text */}
      <div className="mt-6 text-gray-700">
        <p>
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>
      </div>
      
      {/* Divider */}
      <div className="mt-6 border-t border-gray-200"></div>
    </div>

    </div>
  );
};

export default Profile;