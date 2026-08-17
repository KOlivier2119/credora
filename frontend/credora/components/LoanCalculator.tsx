"use client";

import Link from "next/link";
import { useState } from "react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(6000);
  const [loanDuration, setLoanDuration] = useState(8);
  const interestRate = 5;
  const monthlyInterestRate = interestRate / 100 / 12;

  const calculateMonthlyPayment = (principal: number, months: number, rate: number) => {
    if (rate === 0) return principal / months;
    return (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  };

  const monthlyPayment = calculateMonthlyPayment(loanAmount, loanDuration, monthlyInterestRate);
  const totalPayback = monthlyPayment * loanDuration;

  return (
    <div id="calculator" className="flex h-full flex-col justify-between rounded-2xl bg-muted p-5 text-foreground shadow-sm scroll-mt-24 sm:p-8">
      <div>
        <h3 className="mb-6 text-xl font-semibold">Loan calculator</h3>
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">
            Amount: ${loanAmount.toLocaleString()}
          </label>
          <input
            type="range"
            min="1000"
            max="100000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/20 accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>$1,000</span>
            <span>$100,000</span>
          </div>
        </div>
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">Duration: {loanDuration} months</label>
          <input
            type="range"
            min="1"
            max="12"
            value={loanDuration}
            onChange={(e) => setLoanDuration(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/20 accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>1 month</span>
            <span>12 months</span>
          </div>
        </div>
        <div className="space-y-1 text-base">
          <p>
            Monthly: <span className="font-semibold">${monthlyPayment.toFixed(2)}</span>
          </p>
          <p>
            Total payback: <span className="font-semibold">${totalPayback.toFixed(2)}</span>
          </p>
          <p className="text-sm text-muted-foreground">Illustrative at {interestRate}% APR</p>
        </div>
      </div>
      <Link
        href="/register"
        className="mt-8 flex w-full items-center justify-center rounded-full border border-primary bg-white py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
      >
        Apply for a loan
      </Link>
    </div>
  );
};

export default LoanCalculator;
