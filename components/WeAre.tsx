"use client";
import React from "react";
import Image from "next/image";
import paper from "@/public/paper.svg";
import LoanCalculator from "./LoanCalculator";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Expertise from "./Expertise";

function WeAre() {
  return (
    <div className="w-full">
      {/* Main Content Section */}
      <div className="w-full flex flex-col lg:flex-row items-stretch p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Image Section */}
        <div className="flex-1 order-1 lg:order-1 mb-6 lg:mb-0">
          <Image
            src={paper}
            className="object-cover w-full h-64 sm:h-72 md:h-80 lg:h-full" // Responsive height
            alt="Paper illustration"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 order-3 lg:order-2 text-[#4B4F5E] p-4 sm:p-6 md:p-8 overflow-y-auto">
          <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-4 sm:px-6 font-medium hover:bg-[#4B415F] hover:text-white transition-colors duration-300">
            WHO WE ARE
          </button>
          <div className="space-y-4 mt-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Flexible, Quick, and Fast Business Loans
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
              Get the funding you need with our flexible and quick business loans.
              Tailored to meet your unique needs, our loans offer competitive
              rates and fast approval. Empower your business to grow and thrive
              with the right financial support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <FaStarHalfStroke className="text-[#4B415F] text-2xl sm:text-3xl" />
                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                  Robust data ensuring client privacy.
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <FaStarHalfStroke className="text-[#4B415F] text-2xl sm:text-3xl" />
                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                  User-friendly interface application.
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <FaStarHalfStroke className="text-[#4B415F] text-2xl sm:text-3xl" />
                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                  Customized loan plans for unique needs.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <FaStarHalfStroke className="text-[#4B415F] text-2xl sm:text-3xl" />
                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                  Expert assistance every step of the way.
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <FaStarHalfStroke className="text-[#4B415F] text-2xl sm:text-3xl" />
                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                  Competitive rates to ease financial burdens.
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <FaStarHalfStroke className="text-[#4B415F] text-2xl sm:text-3xl" />
                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                  Streamlined processes for fast approvals.
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8">
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#061525] text-white rounded-full font-semibold text-sm sm:text-base hover:bg-opacity-90 hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
              >
                Get Started
                <FaArrowRight className="inline-block ml-2 text-white text-sm sm:text-base" />
              </button>
            </div>
          </div>
        </div>

        {/* Loan Calculator Section */}
        <div className="flex-1 order-2 lg:order-3 p-4 sm:p-6 bg-white mb-6 lg:mb-0">
          <LoanCalculator />
        </div>
      </div>

      {/* Expertise Section */}
      <Expertise />
    </div>
  );
};

export default WeAre;