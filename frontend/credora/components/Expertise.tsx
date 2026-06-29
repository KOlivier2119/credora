// components/Services.js
"use client";
import React from "react";
import Image from "next/image";
import { FaMoneyBillWave, FaHandHolding, FaClipboardList } from "react-icons/fa"; // Icons for the cards


const Expertise = () => {
  // Data for the service cards
  const services = [
    {
      title: "Up to 20,000$ limit",
      description:
        "Choose Credora for personalized loans, competitive rates, quick approval, expert guidance, and flexible repayment options.",
      image: "/tea.svg", // Replace with your actual image path or URL
      icon: FaMoneyBillWave,
    },
    {
      title: "Lowest bank fees",
      description:
        "Benefit from our lowest bank fees, ensuring more savings and better financial management for your needs.",
      image: "/money.svg", // Replace with your actual image path or URL
      icon: FaHandHolding,
    },
    {
      title: "Easy in 3 steps",
      description:
        "Choose Credora for personalized solutions, competitive rates, quick approval, expert guidance, flexible terms, trusted support.",
      image: "/people.svg", // Replace with your actual image path or URL
      icon: FaClipboardList,
    },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="w-full text-[#061525] text-center py-12">
        <h2 className="text-3xl font-bold">Our expertise is the key reason.</h2>
      </div>

      {/* Services Grid */}
      <div className="w-11/12 h- mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#F5F7FA] shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="h-64 w-full relative">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Icon */}
              <service.icon className="text-[#3A86FF] text-3xl mb-4" />
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;