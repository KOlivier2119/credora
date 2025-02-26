"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 cursor-pointer hover:bg-white shadow-md hover:shadow-lg transition-all duration-300`}
      style={{ ...style, zIndex: 10 }}
      onClick={onClick}
    >
      <svg
        className="h-6 w-6 text-[#061525]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 cursor-pointer hover:bg-white shadow-md hover:shadow-lg transition-all duration-300`}
      style={{ ...style, zIndex: 10 }}
      onClick={onClick}
    >
      <svg
        className="h-6 w-6 text-[#061525]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
};

const Hero = () => {
  // Background images for the carousel (ensure correct paths in public folder)
  const backgroundImages = [
    { src: "/business.svg", alt: "Business illustration" }, // Current image
    { src: "/smile.svg", alt: "Smile illustration" }, // Placeholder
    { src: "/family.svg", alt: "Family illustration" }, // Placeholder
    { src: "/boy.svg", alt: "Boy illustration" }, // Placeholder
    { src: "/real.svg", alt: "Real estate illustration" }, // Placeholder
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Slider settings
  const settings = {
    dots: false, // Disable default dots (we’ll use custom dots)
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    cssEase: "linear",
    afterChange: (index) => setCurrentSlide(index), // Update current slide index
  };

  return (
    <div className="relative w-full" style={{ cursor: "url('/custom-cursor.png'), auto" }}>
      {/* Hero Carousel */}
      <Slider {...settings} ref={sliderRef}>
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="relative h-[80vh] w-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${image.src})` }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 text-white text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-md">
                Design Your Loan with the Experts
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-gray-200 drop-shadow-md">
                At Credora, we leverage AI technology to manage your finances and loans effectively, supporting you every step of the way.
              </p>
              <button
                className="px-6 py-3 bg-white text-[#061525] rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-opacity-90 hover:bg-gray-50 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-md"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Dot Indicators */}
      <div className="absolute bottom-6 w-full flex justify-center z-10">
        <div className="flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white border-2 border-white" // Smaller dot with a border for active state
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="relative mx-4 sm:mx-6 md:mx-auto md:absolute md:bottom-[-80px] md:right-12 max-w-md w-full">
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-[#061525] mb-3 drop-shadow-sm">
            5% Interest Rate
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed drop-shadow-sm">
            Discover our dependable loan solutions designed to empower your financial journey with competitive rates and expert support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;