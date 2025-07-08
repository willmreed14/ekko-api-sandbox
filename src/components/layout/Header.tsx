/* Header Component */

import { type FC } from 'react';

const Header: FC = () => {
  return (
    <header className="p-4 border-b border-solid border-gray-700">
      <div className="flex justify-end items-center">
        {/* Dummy buttons for future functionality */}
        <div className="flex space-x-4">
          <button className="px-3 py-1 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-md">
            Documentation
          </button>
          <button className="px-3 py-1 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-md">
            Settings
          </button>
          <button className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
