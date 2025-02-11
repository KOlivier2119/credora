import React from "react";
import Image from "next/image";
import man from "/man.png";
import discuss from "/discuss.png";

const About = () => {
  return (
    <div className="p-8 md:p-16 text-[#4B4F5E] text-lg md:text-xl">
      <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-5 mb-5">
        ABOUT US
      </button>
      <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
        <div className="w-full md:w-[50%] text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">
            25 years of expert loan and finance services.
          </h1>
          <p className="mt-4 text-start">
            With over 25 years of expertise in the finance industry, we bring
            unparalleled experience and knowledge to every client we serve. Our
            highly skilled team is dedicated to providing comprehensive finance
            solutions tailored to your needs, ensuring you receive the best
            coverage and service. We are committed to building long-term
            relationships, offering strategic advice that supports your
            financial growth and security. Trust us to navigate the complexities
            of finance with precision and care.
          </p>
          <div className="flex flex-col md:flex-row justify-between my-10 mr-8">
            <div className="flex flex-col">
              <h1 className="text-5xl">25+</h1>
              <span>Years of trusted expertise</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-5xl">50K</h1>
              <span>Loan approved</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-5xl">10K</h1>
              <span>Satisfied clients</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:w-[50%]">
          {/* First Image: Covers full width (2 columns) */}
          <div className="row-span-1 md:row-span-2">
            <Image
              src="/man.png"
              alt="Man Image"
              width={10}
              height={10}
              // Reduced height
              className="rounded-lg object-contain w-full"
            />
          </div>
          {/* Second Row: Split into two parts */}
          <div>
            <Image
              src="/discuss.png"
              alt="Discussion Image"
              height={10}
              width={10}
              // Reduced height
              className="rounded-md object-cover w-full"
            />
          </div>
          <div className="bg-[#061525] flex flex-col justify-center items-center p-14 rounded-lg text-center">
            <h1 className="font-bold text-white text-3xl">25+</h1>
            <p className="text-white text-sm">Years of Experience</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full mx-auto py-4">
        <div className="bg-[#EDEEEF] p-3">
          <h1 className="text-[#4B4F5E] font-bold">Company Mission</h1>
          <p>
            Our mission is to provide innovative and reliable financial
            solutions tailored to your unique needs.
          </p>
        </div>
        <div className="bg-[#EDEEEF] p-3">
          <h1 className="text-[#4B4F5E] font-bold">Target, Vision % Goal</h1>
          <p>
            Our vision is to provide reliable and innovative financial solutions
            tailored to your needs.
          </p>
        </div>
        <div className="bg-[#EDEEEF] p-3">
          <h1 className="text-[#4B4F5E] font-bold">Dedicated Teams</h1>
          <p>
            Our dedicated teams are committed to providing personalized
            solutions for all your financial needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
