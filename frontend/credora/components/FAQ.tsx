"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "What documents are required to apply for a loan?",
    answer:
      "A government-issued ID, proof of income or mobile-money activity, proof of residence, and bank details for disbursement. Extra documents depend on the loan type.",
  },
  {
    question: "Are your services available online?",
    answer:
      "Yes. You can apply, check status, and manage loans online. In-person support is available in Kigali when you prefer to meet the team.",
  },
  {
    question: "How long does processing take?",
    answer:
      "Personal and emergency loans are typically reviewed within 1–3 business days after documents are in. Business and student loans may take 5–7 days.",
  },
  {
    question: "How are interest rates set?",
    answer:
      "Rates depend on loan type, amount, term, and the AI score. Illustrative personal rates start around 5% APR. You see a recommended APR band before you accept.",
  },
  {
    question: "Can I repay early without penalties?",
    answer:
      "Yes. Early repayment is allowed on all products with no prepayment penalty.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad scroll-mt-24 w-full bg-muted/50">
      <div className="section-shell">
        <div className="mb-8 text-center sm:mb-10">
          <span className="section-label">FAQs</span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Questions about applying</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left text-sm font-medium text-foreground sm:items-center sm:px-6 sm:text-base"
              >
                <span className="pr-2">{faq.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {activeIndex === index ? <FaMinus className="h-3 w-3" /> : <FaPlus className="h-3 w-3" />}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ${
                  activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                <p className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
