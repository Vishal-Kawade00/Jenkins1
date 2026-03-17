import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-100 border-r border-gray-200 p-6 flex flex-col space-y-8">
      {/* The text strip as requested */}
      <div className="flex flex-col space-y-4">
        <div className="text-sm text-gray-500 font-bold tracking-widest uppercase">
          Options
        </div>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block text-gray-700 hover:text-red-700 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-700 hover:text-red-700 transition-colors">
              Modes
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-700 hover:text-red-700 transition-colors">
              About
            </a>
          </li>
        </ul>
      </div>

      {/* Placeholder for the input panel and other components */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Simulation Settings
        </h2>
        {/* We will add the InputPanel, AlgorithmSelector, and buttons here */}
      </div>
    </div>
  );
};

export default Sidebar;
