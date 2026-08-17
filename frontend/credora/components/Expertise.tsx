"use client";

import { CoverImage } from "@/components/cover-image";

const services = [
  {
    title: "Limits that fit the score",
    description: "Recommended amounts come from the AI engine, not a one-size-fits-all cap.",
    image: "/images/expertise-limits.jpg",
    alt: "Planning loan amounts against cash-flow data",
  },
  {
    title: "Transparent pricing",
    description: "APR bands and approval probability are shown before you accept a loan.",
    image: "/images/expertise-pricing.jpg",
    alt: "Handshake after agreeing on loan terms",
  },
  {
    title: "Three clear steps",
    description: "Register, apply with alternative-data fields, then track the decision.",
    image: "/images/expertise-steps.jpg",
    alt: "Applicant completing a loan application",
  },
];

const Expertise = () => {
  return (
    <div className="w-full py-10 sm:py-12">
      <div className="section-shell mb-8 text-center sm:mb-10">
        <h2 className="text-2xl font-bold sm:text-3xl">Built for faster, fairer decisions</h2>
      </div>
      <div className="section-shell grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm last:sm:col-span-2 last:lg:col-span-1">
            <CoverImage
              src={service.image}
              alt={service.alt}
              className="h-40 sm:h-48"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="p-5 sm:p-6">
              <h3 className="mb-2 text-lg font-semibold sm:text-xl">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;
