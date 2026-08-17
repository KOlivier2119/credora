"use client";

import Link from "next/link";
import { CoverImage } from "@/components/cover-image";

function RateCard({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm ${
        compact ? "p-4 sm:p-5" : "p-6"
      }`}
    >
      <h2 className="mb-1.5 text-xl font-bold text-primary sm:mb-2 sm:text-2xl">From 5% APR</h2>
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground sm:mb-4">
        Competitive personal and MSME loans scored on real cash-flow signals, not only bureau history.
      </p>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <div>
          <span className="text-sm text-muted-foreground">Starting from</span>
          <span className="ml-2 text-lg font-bold text-primary">$5,000</span>
        </div>
        <Link href="/#calculator" className="text-sm font-medium text-primary hover:underline">
          Calculate rate
        </Link>
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="grid min-h-[100dvh] lg:grid-cols-2">
        <div className="relative h-[40vh] min-h-[240px] max-h-[360px] sm:h-[46vh] sm:max-h-[440px] lg:order-2 lg:h-auto lg:min-h-full lg:max-h-none">
          <CoverImage
            src="/images/hero.jpg"
            alt="Loan officer reviewing an application with an applicant"
            className="absolute inset-0"
            imageClassName="object-[center_18%]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061525]/50 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-[#061525]/25" />
          <div className="absolute inset-x-6 bottom-6 z-10 hidden max-w-md lg:block lg:inset-x-auto lg:right-8 lg:bottom-8">
            <RateCard />
          </div>
        </div>

        <div className="order-2 flex flex-col justify-center bg-gradient-to-br from-[#061525] via-[#0d2744] to-[#163a63] px-5 py-10 sm:px-10 sm:py-14 lg:order-1 lg:px-16 lg:pb-20 lg:pt-28">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider text-white/90 backdrop-blur-sm sm:mb-6 sm:px-4 sm:text-xs">
              Alternative data · AI credit scoring
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Credit for people without a traditional file
            </h1>
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/80 sm:mb-10 sm:text-base md:text-lg">
              Credora scores applicants on income, employment, mobile money, and utility payments — so lenders can
              include the unbanked, not exclude them.
            </p>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/register"
                className="rounded-full bg-white px-8 py-3.5 text-center text-sm font-semibold text-primary shadow-lg transition hover:scale-[1.02] hover:shadow-xl sm:text-base"
              >
                Get started
              </Link>
              <Link
                href="/#about"
                className="rounded-full border border-white/30 px-8 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:text-base"
              >
                Learn more
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/80 sm:mt-10 sm:text-sm">
              <span>AI-assisted decisions</span>
              <span className="hidden h-4 w-px bg-white/30 sm:block" />
              <span>Secure applications</span>
              <span className="hidden h-4 w-px bg-white/30 sm:block" />
              <span>Built for inclusive lending</span>
            </div>
            <div className="mt-8 lg:hidden">
              <RateCard compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
