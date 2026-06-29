"use client";
import React from "react";
import Image from "next/image";
import man from "@/public/man_2.svg";
import discuss from "@/public/discuss.svg";

const About = () => {
  return (
    <div className="p-6 md:p-12 text-[#4B4F5E] text-base sm:text-lg md:text-xl">
      <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-5 mb-5 text-sm sm:text-base">
        ABOUT US
      </button>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-full md:w-1/2 text-center md:text-left mt-12 md:mt-24">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            25 years of expert loan and finance services.
          </h1>
          <div>
            <p className="mt-4 text-start">
              With over 25 years of expertise in the finance industry, we bring unparalleled experience and knowledge to every client we serve.
            </p>
            <p className="mt-4 text-start">
              Our highly skilled team is dedicated to providing comprehensive finance solutions tailored to your needs, ensuring you receive the best coverage and service.
            </p>
            <p className="mt-4 text-start">
              We are committed to building long-term relationships, offering strategic advice that supports your financial growth and security.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between my-10 md:mr-8 mt-12 md:mt-20 gap-6">
            <div className="flex flex-col items-center py-4 md:py-0 md:items-start">
              <h1 className="text-4xl sm:text-5xl font-bold outlined-text">25+</h1>
              <span>Years of trusted expertise</span>
            </div>
            <div className="flex flex-col items-center py-4 md:py-0 md:items-start">
              <h1 className="text-4xl sm:text-5xl font-bold outlined-text">50K</h1>
              <span>Loan approved</span>
            </div>
            <div className="flex flex-col items-center py-4 md:py-0 md:items-start">
              <h1 className="text-4xl sm:text-5xl font-bold outlined-text">10K</h1>
              <span>Satisfied clients</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-1/2">
          <div className="row-span-1 sm:row-span-2">
            <Image
              src={man}
              alt="Man Image"
              width={300}
              height={100}
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div>
            <Image
              src={discuss}
              alt="Discussion Image"
              width={50}
              height={20}
              className="rounded-md object-cover w-full"
            />
          </div>
          <div className="bg-[#061525] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10 rounded-lg text-center">
            <h1 className="font-bold text-white text-2xl sm:text-3xl outlined-text">25+</h1>
            <p className="text-white text-sm sm:text-base">Years of Experience</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full mx-auto py-6">
        <div className="bg-[#EDEEEF] p-6 sm:p-8 h-auto flex flex-col justify-center rounded-md">
          <h1 className="text-[#4B4F5E] font-bold">Company Mission</h1>
          <p>Our mission is to provide innovative and reliable financial solutions tailored to your unique needs.</p>
        </div>
        <div className="bg-[#EDEEEF] p-6 sm:p-8 h-auto flex flex-col justify-center rounded-md">
          <h1 className="text-[#4B4F5E] font-bold">Target, Vision & Goal</h1>
          <p>Our vision is to provide reliable and innovative financial solutions tailored to your needs.</p>
        </div>
        <div className="bg-[#EDEEEF] p-6 sm:p-8 h-auto flex flex-col justify-center rounded-md">
          <h1 className="text-[#4B4F5E] font-bold">Dedicated Teams</h1>
          <p>Our dedicated teams are committed to providing personalized solutions for all your financial needs.</p>
        </div>
      </div>
    </div>
  );
};

export default About;