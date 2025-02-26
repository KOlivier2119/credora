"use client"
// components/LoanCalculator.js
import React, { useState } from 'react';

const LoanCalculator = () => {
  // State for loan amount and duration
  const [loanAmount, setLoanAmount] = useState(6000);
  const [loanDuration, setLoanDuration] = useState(8);

  // Sample interest rate (you can adjust this or make it configurable)
  const interestRate = 5; // 5% annual interest rate
  const monthlyInterestRate = interestRate / 100 / 12;

  // Calculate monthly payment using the formula for fixed monthly payment (PMT)
  const calculateMonthlyPayment = (principal: number, months: number, rate: number) => {
    if (rate === 0) return principal / months;
    return (
      principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1)
    );
  };

  // Calculate total payback
  const monthlyPayment = calculateMonthlyPayment(loanAmount, loanDuration, monthlyInterestRate);
  const totalPayback = monthlyPayment * loanDuration;

  return (
    <div className="max-w-5xl h-4/6 mx-auto p-6 bg-[#EDEEEF] rounded-lg shadow-md text-[#4B4F5E]">
      {/* Loan Amount Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loan Amount: ${loanAmount.toLocaleString()}
        </label>
        <input
          type="range"
          min="1000"
          max="100000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full h-2 bg-[#a2a5ad] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$1,000</span>
          <span>$100,000</span>
        </div>
      </div>

      {/* Loan Duration Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration: {loanDuration} Months
        </label>
        <input
          type="range"
          min="1"
          max="12"
          value={loanDuration}
          onChange={(e) => setLoanDuration(Number(e.target.value))}
          className="w-full h-2 bg-[#a2a5ad] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 Month</span>
          <span>12 Months</span>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-2 text-sm">
        <p className="text-gray-700">Pay Month: ${monthlyPayment.toFixed(2)}</p>
        <p className="text-gray-700">Total Pay Back: ${totalPayback.toFixed(2)}</p>
      </div>

      {/* Apply Button */}
      <button
        className="mt-6 w-full bg-white text-gray-700 border border-[#4B4F5E] rounded-full py-2 px-4 hover:bg-gray-100 transition-colors"
      >
        Apply For Loan
      </button>
    </div>
  );
};

export default LoanCalculator;