import React from "react";
import Image from "next/image";
import paper from "@/public/paper.svg";
import LoanCalculator from "./LoanCalculator";
import { FaStarHalfStroke } from "react-icons/fa6";

function WeAre() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-stretch p-6">
      {/* Image Section */}
      <div className="flex-1">
        <Image
          src={paper}
          className="object-cover w-full h-4/6" // Reduced size of the image to 75% of its container width
          alt="Paper illustration"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 text-[#4B4F5E] p-4 overflow-y-auto h-full">
        <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-6 font-medium hover:bg-[#4B415F] hover:text-white transition-colors duration-300">
          WHO WE ARE
        </button>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Flexible, Quick, and Fast Business Loans
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Get the funding you need with our flexible and quick business loans.
            Tailored to meet your unique needs, our loans offer competitive
            rates and fast approval. Empower your business to grow and thrive
            with the right financial support.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaStarHalfStroke className="text-[#4B415F] text-3xl" />
              <p className="text-gray-700">Robust data ensuring client privacy.</p>
            </div>
            <div className="flex items-center gap-4">
              <FaStarHalfStroke className="text-[#4B415F] text-3xl" />
              <p className="text-gray-700">User-friendly interface application.</p>
            </div>
            <div className="flex items-center gap-4">
              <FaStarHalfStroke className="text-[#4B415F] text-3xl" />
              <p className="text-gray-700">Customized loan plans for unique needs.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaStarHalfStroke className="text-[#4B415F] text-3xl" />
              <p className="text-gray-700">Expert assistance every step of the way.</p>
            </div>
            <div className="flex items-center gap-4">
              <FaStarHalfStroke className="text-[#4B415F] text-3xl" />
              <p className="text-gray-700">Competitive rates to ease financial burdens.</p>
            </div>
            <div className="flex items-center gap-4">
              <FaStarHalfStroke className="text-[#4B415F] text-3xl" />
              <p className="text-gray-700">Streamlined processes for fast approvals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Calculator Section */}
      <div className="flex-1 p-4 bg-white">
        <LoanCalculator />
      </div>
    </div>
  );
}

export default WeAre;