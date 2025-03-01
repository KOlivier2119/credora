"use client";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Contacts from "@/components/Contacts";
import WeAre from "@/components/WeAre";

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WeAre />
      <Testimonials />
      <Contacts />
      <FAQ />
      <Footer />
    </div>
  );
}
