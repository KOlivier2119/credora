import Link from "next/link";
import { CoverImage } from "@/components/cover-image";

const services = [
  {
    title: "Personal loans",
    body: "Flexible terms scored on income and payment regularity, not only bureau history.",
    image: "/images/service-personal.jpg",
    alt: "Applicant reviewing personal loan options",
  },
  {
    title: "Emergency loans",
    body: "Faster access when cash-flow signals support the application.",
    image: "/images/service-emergency.jpg",
    alt: "Community support during an urgent cash need",
  },
  {
    title: "Business loans",
    body: "Working capital for MSMEs using mobile-money and revenue patterns.",
    image: "/images/service-business.jpg",
    alt: "Small business owner at a café counter",
  },
  {
    title: "Student loans",
    body: "Education financing with clear terms and early-repayment options.",
    image: "/images/service-student.jpg",
    alt: "Students collaborating on campus",
  },
  {
    title: "Mortgage loans",
    body: "Home financing with documented income and alternative data overlays.",
    image: "/images/service-mortgage.jpg",
    alt: "Home ready for mortgage financing",
  },
  {
    title: "Small business loans",
    body: "Asset-light businesses scored on cash flow instead of collateral alone.",
    image: "/images/service-msme.jpg",
    alt: "Retail shop using point-of-sale payments",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-pad scroll-mt-24 w-full bg-muted/60">
      <div className="section-shell">
        <div className="mb-6 flex justify-center sm:mb-8">
          <span className="section-label">Our services</span>
        </div>
        <h2 className="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl md:text-4xl">
          Loans tailored to how people actually earn
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <CoverImage
                src={item.image}
                alt={item.alt}
                className="h-40 sm:h-44"
                imageClassName="object-[center_25%]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-8 sm:pt-10">
          <Link
            href="/register"
            className="w-full rounded-full bg-primary px-6 py-2.5 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
          >
            Apply now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
