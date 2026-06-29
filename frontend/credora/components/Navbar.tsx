"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Faq", href: "#" },
  ]

  return (
    <nav
      className={`w-full bg-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg py-2" : "shadow-md py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">            
            <h1 className="ml-3 text-2xl font-bold text-[#4B4F5E] tracking-tight">Credora</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-[#4B4F5E] hover:text-[#061525] transition-colors duration-300 text-base font-semibold py-2 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#061525] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="bg-[#061525] text-white px-6 py-2.5 rounded-md text-base font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#061525] focus:ring-opacity-50 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-[#4B4F5E] bg-white px-6 py-2.5 rounded-md border border-[#4B4F5E] text-base font-medium hover:bg-[#4B4F5E] hover:text-white transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4B4F5E] focus:ring-opacity-50 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Register
            </Link>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#4B4F5E] hover:text-[#061525] focus:outline-none focus:ring-2 focus:ring-[#061525] focus:ring-opacity-50 p-2 rounded-md transition-colors duration-300"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-3 pb-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-[#4B4F5E] hover:text-[#061525] hover:bg-gray-50 rounded-md transition-all duration-300 text-base font-medium border-l-2 border-transparent hover:border-[#061525]"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 pb-4 px-4 space-y-3">
            <Link
              href="/login"
              className="w-full bg-[#061525] text-white px-6 py-3 rounded-md text-base font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#061525] focus:ring-opacity-50 flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="w-full text-[#4B4F5E] bg-white px-6 py-3 rounded-md border border-[#4B4F5E] text-base font-medium hover:bg-[#4B4F5E] hover:text-white transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4B4F5E] focus:ring-opacity-50 flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

