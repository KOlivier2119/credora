"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import image from "@/public/image.svg";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
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
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* FAQ Header */}
        <div className="text-center mb-12">
          <button className="text-[#4B415F] border-2 border-[#4B415F] rounded-full py-2 px-6 text-sm font-medium tracking-wide transition-all duration-300">
            FAQs
          </button>
          <h2 className="text-4xl md:text-5xl font-bold text-[#061525] mt-6 leading-tight">
            Document Guideline FAQ Regarding Credora
          </h2>
        </div>

        {/* Accordion Section */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-6 text-left text-[#061525] font-semibold text-lg md:text-xl focus:outline-none hover:bg-gray-50 transition-colors duration-200"
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-[#061525] w-5 h-5" />
                ) : (
                  <FaChevronDown className="text-[#061525] w-5 h-5" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-96 p-6" : "max-h-0 p-0"
                }`}
              >
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="max-w-6xl mx-auto px-6 mt-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#061525] mb-6 leading-snug">
            We build trust with all customers by combining creativity with
            tailored business solutions
          </h2>
          <button className="bg-[#061525] text-white font-medium py-3 px-8 rounded-full hover:bg-[#172c42] transition-all duration-300 shadow-md">
            Contact Us
          </button>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={image}
            alt="Illustration"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;