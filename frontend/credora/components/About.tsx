"use client";

import { CoverImage } from "@/components/cover-image";

const About = () => {
  return (
    <section id="about" className="section-pad scroll-mt-24">
      <div className="section-shell">
        <span className="section-label">About us</span>
        <div className="mt-8 flex flex-col items-start gap-10 lg:flex-row lg:gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Scoring that sees cash flow, not just credit files
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Traditional scoring excludes informal workers, women-owned MSMEs, and anyone without a bureau history.
              Credora uses salary, employment, mobile-money volume, and utility regularity — the same alternative
              signals inclusive lenders already rely on.
            </p>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Applicants apply once. Institutions review AI recommendations with a full audit trail.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-12 sm:gap-6">
              <Stat value="Alt-data" label="Income & utilities" />
              <Stat value="AI" label="Score + APR band" />
              <Stat value="2 portals" label="Applicant & lender" />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:w-1/2">
            <div className="relative col-span-2 overflow-hidden rounded-2xl">
              <CoverImage
                src="/images/about-lender.jpg"
                alt="Lending team collaborating on applications"
                className="h-48 sm:h-64 md:h-72"
                imageClassName="object-[center_35%]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                <p className="text-[11px] uppercase tracking-wider text-white/70 sm:text-xs">For lenders</p>
                <p className="mt-1 text-base font-semibold leading-snug sm:text-lg md:text-xl">
                  Review, approve, and track applications in one admin workspace.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <CoverImage
                src="/images/about-applicant.jpg"
                alt="Shop owner serving a customer"
                className="h-36 sm:h-44 md:h-48"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold leading-snug text-white sm:p-4 sm:text-sm">
                Apply without a prior credit file
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <CoverImage
                src="/images/about-team.jpg"
                alt="Team working together on scoring decisions"
                className="h-36 sm:h-44 md:h-48"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold leading-snug text-white sm:p-4 sm:text-sm">
                ML scoring with a human review trail
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
          <Mission title="Mission" body="Expand access to fair credit using data people already generate." />
          <Mission title="Vision" body="A lending stack where thin-file applicants are scored, not turned away." />
          <Mission title="Teams" body="Applicant portal, institution review, and an AI scoring service working together." />
        </div>
      </div>
    </section>
  );
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0">
      <p className="text-lg font-bold text-primary sm:text-2xl md:text-3xl">{value}</p>
      <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-sm">{label}</p>
    </div>
  );
}

function Mission({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-muted p-5 sm:p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

export default About;
