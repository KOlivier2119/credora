import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center bg-[url('/business.svg')] bg-cover bg-center"
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-white text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Design Your Loan with the Experts
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-200">
            At Credora, we leverage AI technology to manage your finances and loans effectively, supporting you every step of the way.
          </p>
          <button 
            className="px-6 py-3 bg-white text-[#061525] rounded-full font-semibold text-sm sm:text-base hover:bg-opacity-90 hover:bg-gray-50 hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="relative mx-4 sm:mx-6 md:mx-auto md:absolute md:bottom-[-80px] md:right-12 max-w-md w-full">
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 transform transition-all duration-300 hover:-translate-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-[#061525] mb-3">5% Interest Rate</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Discover our dependable loan solutions designed to empower your financial journey with competitive rates and expert support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;