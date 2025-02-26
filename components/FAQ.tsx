"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import image from "@/public/image.svg";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What documents are required to apply for a loan?",
      answer:
        "To apply for a loan with FinancePro, you’ll need to provide the following documents: a valid government-issued ID (e.g., passport or national ID), proof of income (e.g., pay stubs or bank statements from the last 3 months), proof of residence (e.g., utility bill), and your bank account details for disbursement. Additional documents may be required depending on the loan type.",
    },
    {
      question:
        "Are your services available online or only in physical locations?",
      answer:
        "We offer both online and offline services. You can apply for loans, check your application status, and manage your account entirely online through our website or mobile app. For those who prefer in-person assistance, visit our office in Kigali, Rwanda, where our team is ready to assist you.",
    },
    {
      question: "How long does it take to process a loan application?",
      answer:
        "The processing time varies by loan type. Personal and emergency loans are typically processed within 1-3 business days after all documents are submitted. Business and student loans may take 5-7 business days due to additional verification. You’ll receive updates via email or SMS.",
    },
    {
      question: "What are the interest rates for your loans?",
      answer:
        "Interest rates depend on the loan type, amount, and repayment term. Rates start as low as 5% APR for personal loans and can go up to 15% APR for emergency loans. Check our Pricing page or contact us for a personalized quote based on your needs.",
    },
    {
      question: "Can I repay my loan early without penalties?",
      answer:
        "Yes, FinancePro allows early repayment on all our loans with no prepayment penalties. Paying off your loan early can even save you on interest costs. Simply log into your account or visit our office to arrange early repayment.",
    },
  ];

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Header */}
        <div className="text-center mb-10">
          <button className="text-[#4B415F] border-2 border-[#4B415F] rounded-full py-1.5 px-5 text-sm font-medium uppercase tracking-wider bg-white">
            FAQs
          </button>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#061525] mt-4 leading-tight tracking-tight">
            Document Guideline FAQ Regarding Credora
          </h2>
        </div>

        {/* Accordion Section */}
        <div className="space-y-3 w-[85%] mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-[#061525] font-medium text-lg sm:text-xl lg:text-2xl focus:outline-none bg-white"
              >
                <span className="pr-6">{faq.question}</span>
                <span className="flex-shrink-0 bg-[#4B415F] text-white rounded-full p-2">
                  {activeIndex === index ? (
                    <FaMinus className="w-4 h-4" />
                  ) : (
                    <FaPlus className="w-4 h-4" />
                  )}
                </span>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mt-12 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#061525] mb-4 leading-snug tracking-tight">
            We build trust with all customers by combining creativity with
            tailored business solutions
          </h2>
          <button className="bg-[#061525] text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
            Contact Us
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src={image}
            alt="Illustration"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;