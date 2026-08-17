import Image from "next/image";

const quotes = [
  {
    name: "Amina K.",
    role: "Shop owner, Kigali",
    photo: "/images/portrait-amina.jpg",
    body: "I had no formal credit file. Credora used my mobile-money activity and I finally got working capital.",
  },
  {
    name: "Jean P.",
    role: "Loan officer",
    photo: "/images/portrait-jean.jpg",
    body: "The AI summary and approval probability help us decide faster without ignoring thin-file applicants.",
  },
  {
    name: "Grace N.",
    role: "Applicant",
    photo: "/images/portrait-grace.jpg",
    body: "Applying and tracking status in one place was straightforward. I always knew where my file stood.",
  },
];

const Testimonials = () => {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="mb-6 flex justify-center sm:mb-8">
          <span className="section-label">Testimonials</span>
        </div>
        <h2 className="mb-8 text-2xl font-semibold sm:mb-10 sm:text-3xl md:text-4xl">
          What applicants and lenders say
        </h2>
        <div className="grid gap-5 text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q) => (
            <div key={q.name} className="flex flex-col gap-4 rounded-2xl bg-muted p-6 last:sm:col-span-2 last:lg:col-span-1 sm:p-8">
              <div className="flex items-center gap-3">
                <Image
                  src={q.photo}
                  alt={q.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{q.name}</p>
                  <p className="text-sm">{q.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed sm:text-base">{q.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
