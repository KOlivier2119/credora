// app/components/FAQ.jsx
'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What documents are required to apply for a loan?',
      answer:
        'To apply for a loan with FinancePro, you’ll need to provide the following documents: a valid government-issued ID (e.g., passport or national ID), proof of income (e.g., pay stubs or bank statements from the last 3 months), proof of residence (e.g., utility bill), and your bank account details for disbursement. Additional documents may be required depending on the loan type.',
    },
    {
      question: 'Are your services available online or only in physical locations?',
      answer:
        'We offer both online and offline services. You can apply for loans, check your application status, and manage your account entirely online through our website or mobile app. For those who prefer in-person assistance, visit our office in Kigali, Rwanda, where our team is ready to assist you.',
    },
    {
      question: 'How long does it take to process a loan application?',
      answer:
        'The processing time varies by loan type. Personal and emergency loans are typically processed within 1-3 business days after all documents are submitted. Business and student loans may take 5-7 business days due to additional verification. You’ll receive updates via email or SMS.',
    },
    {
      question: 'What are the interest rates for your loans?',
      answer:
        'Interest rates depend on the loan type, amount, and repayment term. Rates start as low as 5% APR for personal loans and can go up to 15% APR for emergency loans. Check our Pricing page or contact us for a personalized quote based on your needs.',
    },
    {
      question: 'Can I repay my loan early without penalties?',
      answer:
        'Yes, FinancePro allows early repayment on all our loans with no prepayment penalties. Paying off your loan early can even save you on interest costs. Simply log into your account or visit our office to arrange early repayment.',
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-100">
      <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-5 mb-8">
          FAQs
        </button>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#061525] mb-10">
          Document guideline FAQ regarding Credora 
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-5 text-left text-[#061525] font-semibold text-lg focus:outline-none hover:bg-gray-50 transition-colors duration-200"
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-[#061525]" />
                ) : (
                  <FaChevronDown className="text-[#061525]" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-96 p-5' : 'max-h-0 p-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex'>
          <h2>We build trust with all customers by combining creativity with tailored business solutions</h2>
          <button className="bg-[#061525] hover:bg-[#172c42] transition-all duration-500  py-2 px-5 text-white rounded-full">
          Contact Us
        </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;