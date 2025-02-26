import React from "react";
import Image from "next/image";
import man from "@/public/man_2.svg";
import discuss from "@/public/discuss.svg";

const About = () => {
  const imageUrl =
    "https://s3-alpha-sig.figma.com/img/c397/a4ab/260634dc82dc45f18a63edc265527e0f?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Yd2apNIOcCr5I4RBRxoC3Q5O4bYaHSTbho9E0L~3Wa3rL0dKeNjh0ZYcnrF-F~on9PMotDiTCJmyS9STaaDV-GyL-f7n~bdYMOYlWSVwb~k0e8mUpNTYVUrIWfTJf74XMphNcwmjwgrkAC15KKHiATI4Fnwbu8VAjaCwdNBnlw84~owDFOdmZ~e8uCNaG4F67~JY4l4iWN5GZk6EF0On2aVWGfaBsCw5cuMUi7OAI-g0efCU2haKeWyPofsED9v2k~qHcUwo1DtJAQJR8PAvB-SjZyUPhouSSRBvbNzhT~idPe4v5Ifc469LhSXS4HhVSOOyCpTcD63yebje9ewwxQ__";

  const anotherUrl =
    "https://s3-alpha-sig.figma.com/img/f40b/bd2f/6aa4ae7f033f0b13f92219134abc518c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dsGhqjMLF8-ryrRYoycUU33e5r2rWKTi7IRrt9PVJrISgiP~Oq2rxgFdD30SRXXgyCmCgDkqSi0miSCdCo~d4ae5lYhR5Mo1LD~NeBw~MmXof7aOVHSdWrdPWeGq3W1mynGCMte~UVhwbSjgV~OCFIQ8ZqDM609OdfuKCjXVZVlQsOz7e50t1L5-TxbCfoQCn2BgxdE63yZHsUTMERBNi-PtKbV5xNbWPYY3IZBqH1jte6iVrU8KAgD-lybXJQec4t7AX6mtKsJrzOmobP8EwGwoIyMd~QNkBs6DIHlUXPrDLKvPkw5F~pvHw74cORJjN7FzzEEQxReUh0Y5t9-yAw__";

  return (
    <div className="p-8 md:p-16 text-[#4B4F5E] text-lg md:text-xl">
      <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-5 mb-5">
        ABOUT US
      </button>

      <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
        <div className="w-full md:w-[50%] text-center md:text-left mt-24">
          <h1 className="text-2xl md:text-3xl font-bold">
            25 years of expert loan and finance services.
          </h1>
          <div>
            <p className="mt-4 text-start">
              With over 25 years of expertise in the finance industry, we bring
              unparalleled experience and
            </p>
            <p className="mt-4 text-start">
              knowledge to every client we serve. Our highly skilled team is
              dedicated to providing comprehensive finance solutions tailored to
              your needs, ensuring you receive the best coverage
            </p>
            <p className="mt-4 text-start">
              and service. We are committed to building long-term relationships,
              offering strategic advice
            </p>
            <p className="mt-4 text-start">
              that supports your financial growth and security. Trust us to
              navigate the complexities of finance with precision and care.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between my-10 mr-8 mt-20">
            <div className="flex flex-col items-center py-6 md:py-0 md:items-start">
              <h1 className="text-5xl font-bold outlined-text">25+</h1>
              <span>Years of trusted expertise</span>
            </div>
            <div className="flex flex-col items-center py-6 md:py-0 md:items-start">
              <h1 className="text-5xl font-bold outlined-text">50K</h1>
              <span>Loan approved</span>
            </div>
            <div className="flex flex-col items-center py-6 md:py-0 md:items-start">
              <h1 className="text-5xl font-bold outlined-text">10K</h1>
              <span>Satisfied clients</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:w-[50%]">
          <div className="row-span-1 md:row-span-2">
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
          <div className="bg-[#061525] flex flex-col justify-center items-center p-6 lg:p-20 rounded-lg text-center">
            <h1 className="font-bold text-white text-3xl">25+</h1>
            <p className="text-white text-sm">Years of Experience</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full mx-auto py-4">
        <div className="bg-[#EDEEEF] p-8 h-64 flex flex-col justify-center rounded-md">
          <h1 className="text-[#4B4F5E] font-bold">Company Mission</h1>
          <p>
            Our mission is to provide innovative and reliable financial
            solutions tailored to your unique needs.
          </p>
        </div>
        <div className="bg-[#EDEEEF] p-8 h-64 flex flex-col justify-center rounded-md">
          <h1 className="text-[#4B4F5E] font-bold">Target, Vision & Goal</h1>
          <p>
            Our vision is to provide reliable and innovative financial solutions
            tailored to your needs.
          </p>
        </div>
        <div className="bg-[#EDEEEF] p-8 h-64 flex flex-col justify-center rounded-md">
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
