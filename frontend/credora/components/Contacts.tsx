"use client";

import { FormEvent, useState } from "react";
import { FaCalendar, FaClock, FaEnvelope, FaPhone, FaArrowRight } from "react-icons/fa";
import { CoverImage } from "@/components/cover-image";

const Contacts = () => {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sent");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="w-full scroll-mt-24">
      <div className="grid lg:grid-cols-2">
        <div className="relative overflow-hidden text-white">
          <CoverImage
            src="/images/contact.jpg"
            alt="Modern workspace for applicant and lender conversations"
            className="absolute inset-0"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/15" />
          <div className="relative z-10 flex flex-col justify-end px-5 py-10 sm:px-8 sm:py-12 md:px-12 lg:min-h-[560px]">
            <span className="mb-5 inline-flex w-fit rounded-full border border-white/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider sm:mb-6 sm:px-5 sm:text-xs">
              Contact us
            </span>
            <h2 className="mb-3 max-w-lg text-2xl font-bold leading-tight sm:mb-4 sm:text-3xl md:text-4xl">
              Talk to us about scoring and lending
            </h2>
            <p className="mb-6 max-w-md text-sm text-white/80 sm:mb-8 sm:text-base">
              Applicants and institutions can reach the Credora team for onboarding, product questions, or partnership.
            </p>
            <div className="space-y-3 text-sm sm:space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="shrink-0" />
                <a href="mailto:credora@gmail.com" className="break-all hover:underline">
                  credora@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="shrink-0" />
                <p>+250 787 289 178</p>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="shrink-0" />
                <p>Online applications 24/7</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendar className="shrink-0" />
                <p>Support: Mon–Fri, 9 AM – 4 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary px-5 py-10 text-white sm:px-8 sm:py-14 md:px-12 md:py-16">
          {status === "sent" ? (
            <div className="rounded-xl bg-white/10 p-6 text-sm">
              Thanks — we received your message and will reply by email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5 lg:mx-0">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-2 text-sm">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="rounded-md bg-white/20 p-3 text-base text-white outline-none ring-white focus:ring-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="rounded-md bg-white/20 p-3 text-base text-white outline-none ring-white focus:ring-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="mb-2 text-sm">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="resize-y rounded-md bg-white/20 p-3 text-base text-white outline-none ring-white focus:ring-2"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3 font-semibold text-primary transition hover:bg-white/90 sm:w-auto"
              >
                Submit
                <FaArrowRight className="ml-2" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contacts;
