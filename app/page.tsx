import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ"
import Contacts from "@/components/Contacts";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden bg-gray-50 font-sans">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contacts />
      <FAQ />
      <Footer />
    </div>
  );
}
