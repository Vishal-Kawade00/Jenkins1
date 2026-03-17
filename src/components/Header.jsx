import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: 'rgb(194, 97, 97)' }}>
          OS Scheduling Visualizer
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-red-700 font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-700 font-medium">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-700 font-medium">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
