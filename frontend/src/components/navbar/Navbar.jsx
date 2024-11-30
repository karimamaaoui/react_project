import React, { useEffect, useState } from 'react'
import { BsToggleOn } from 'react-icons/bs';
import { FaBell, FaCommentDots, FaSearch } from 'react-icons/fa';

const Navbar = () => {




  return (
      <div className="bg-white shadow flex justify-between items-center p-4">
          {/* Left Side: Search */}
          <div className="flex items-center">
              <FaSearch className="text-gray-400 h-5 w-5 mr-2" />
              <input
                  type="text"
                  placeholder="Type to search..."
                  className="outline-none border-none text-gray-500"
              />
          </div>
          
          {/* Right Side: Icons and User Profile */}
          <div className="flex items-center space-x-6">
              <BsToggleOn className="text-gray-500 h-6 w-6 cursor-pointer" />
              <div className="relative">
                  <FaBell className="text-gray-500 h-6 w-6 cursor-pointer" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="relative">
                  <FaCommentDots className="text-gray-500 h-6 w-6 cursor-pointer" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </div>
              {/* User Profile */}
              <div className="flex items-center space-x-2">
                  
                  <div>
                      <p className="text-sm font-medium text-gray-700">Thomas Anree</p>
                      <p className="text-xs text-gray-400">UX Designer</p>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Navbar