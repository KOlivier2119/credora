import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden bg-white font-sans">
      <Navbar />
      <Hero />
      <About />
      <Services />
    </div>
  );
}
