import React from "react";
import Image from "next/image";
import man from "../public/man.png";
import discuss from "../public/discuss.png";

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
          <p className="mt-4">
            With over 25 years of expertise in the finance industry, we bring
            unparalleled experience and knowledge to every client we serve. Our
            highly skilled team is dedicated to providing comprehensive finance
            solutions tailored to your needs, ensuring you receive the best
            coverage and service. We are committed to building long-term
            relationships, offering strategic advice that supports your
            financial growth and security. Trust us to navigate the complexities
            of finance with precision and care.
          </p>
        </div>
        <div className="grid grid-rows-1 md:grid-rows-2 gap-2 w-full md:w-[50%]">
          {/* First Image: Covers full width (2 columns) */}
          <div className="row-span-1 md:row-span-2">
            <Image
              src={man}
              alt="Man Image"
              width={100} // Reduced width
              height={5} // Reduced height
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Second Row: Split into two parts */}
          <div>
            <Image
              src={discuss}
              alt="Discussion Image"
              width={200} // Reduced width
              height={120} // Reduced height
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="bg-[#061525] flex flex-col justify-center items-center p-3 rounded-lg text-center">
            <h1 className="font-bold text-white text-3xl">25+</h1>
            <p className="text-white text-sm">Years of Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
