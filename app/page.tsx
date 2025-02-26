"use client";
import Image from "next/image";
import { motion } from "framer-motion";
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
  // Animation variants for diverse effects
  const animations = {
    fadeInUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    },
    rotateIn: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
    },
    slideDown: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    },
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
      {/* Navbar with fadeInUp animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.fadeInUp}
      >
        <Navbar />
      </motion.div>

      {/* Hero with fadeInLeft animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.fadeInLeft}
      >
        <Hero />
      </motion.div>

      {/* About with fadeInRight animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.fadeInRight}
      >
        <About />
      </motion.div>

      {/* Services with scaleUp animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.scaleUp}
      >
        <Services />
      </motion.div>

      {/* WeAre with fadeInUp animation (different from others) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.fadeInUp}
      >
        <WeAre />
      </motion.div>

      {/* Testimonials with rotateIn animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.rotateIn}
      >
        <Testimonials />
      </motion.div>

      {/* Contacts with slideDown animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.slideDown}
      >
        <Contacts />
      </motion.div>

      {/* FAQ with fadeInRight animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.fadeInRight}
      >
        <FAQ />
      </motion.div>

      {/* Footer with scaleUp animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.scaleUp}
      >
        <Footer />
      </motion.div>
    </div>
  );
}