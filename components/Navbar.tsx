"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Faq', href: '#' },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Image 
              src="/logo.png" 
              alt="Credora Logo" 
              width={40} 
              height={40}
              className="h-10 w-10"
            />
            <h1 className="ml-3 text-2xl font-bold text-[#4B4F5E]">Credora</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#4B4F5E] hover:text-[#061525] transition-colors duration-300 text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="bg-[#061525] text-white px-6 py-2.5 rounded-md text-base font-medium hover:bg-opacity-90 transition-all duration-300">
              Login
            </button>
            <button className="text-[#4B4F5E] bg-white px-6 py-2.5 rounded-md border border-[#4B4F5E] text-base font-medium hover:bg-[#4B4F5E] hover:text-white transition-all duration-300">
              Register
            </button>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#4B4F5E] hover:text-[#061525] focus:outline-none"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2.5 text-[#4B4F5E] hover:text-[#061525] hover:bg-gray-100 transition-colors duration-300 text-lg font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-3 pb-4 px-3 space-y-3">
              <button className="w-full bg-[#061525] text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-all duration-300">
                Login
              </button>
              <button className="w-full text-[#4B4F5E] bg-white px-6 py-3 rounded-md border border-[#4B4F5E] text-lg font-medium hover:bg-[#061525] hover:text-white transition-all duration-300">
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;