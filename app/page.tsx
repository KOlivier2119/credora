import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="w-full h-full bg-white">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}
