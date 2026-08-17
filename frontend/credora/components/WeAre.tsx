"use client";

import Link from "next/link";
import LoanCalculator from "./LoanCalculator";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Expertise from "./Expertise";
import { CoverImage } from "@/components/cover-image";

const points = [
  "Privacy-first handling of applicant data",
  "Clear applicant and institution portals",
  "Loan plans matched to cash-flow signals",
  "Guidance through each application step",
  "Competitive rates from the scoring engine",
  "Faster decisions with automated scoring",
];

function WeAre() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-10 xl:grid-cols-3">
        <div className="relative min-h-[240px] overflow-hidden rounded-2xl sm:min-h-[320px] lg:min-h-[420px] xl:min-h-full">
          <CoverImage
            src="/images/who-we-are.jpg"
            alt="Credora team collaborating with applicants and lenders"
            className="absolute inset-0"
            imageClassName="object-[center_22%]"
            sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
            <p className="text-xs uppercase tracking-wider text-white/70 sm:text-sm">Who we are</p>
            <p className="mt-2 max-w-sm text-xl font-semibold leading-snug sm:mt-3 sm:text-2xl">
              Inclusive credit infrastructure for thin-file applicants.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center text-foreground lg:px-2">
          <span className="section-label">Who we are</span>
          <div className="mt-4 space-y-4">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              Flexible credit, scored on real activity
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              Get funding with competitive rates and a transparent AI recommendation. Built for people and small
              businesses that banks often cannot see.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <FaStarHalfStroke className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground md:text-base">{point}</p>
              </div>
            ))}
          </div>
          <Link
            href="/register"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:opacity-90 sm:w-auto"
          >
            Get started
            <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="lg:col-span-2 xl:col-span-1">
          <LoanCalculator />
        </div>
      </div>
      <Expertise />
    </div>
  );
}

export default WeAre;
