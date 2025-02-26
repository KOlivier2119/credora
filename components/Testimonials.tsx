import React from 'react'
import Image from 'next/image'
import testimonial from "@/public/testimonial.png";

const Testimonials = () => {
  return (
    <div className='mx-auto w-11/12'>
      <div className="flex justify-center w-full">
        <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-5 mb-8">
          TESTIMONIALS
        </button>
      </div>
      <h1 className='text-[#061525] text-4xl font-semibold py-4'>What our 1200+ Customers are saying</h1>
      <div className='flex flex-col md:flex-row gap-10 text-[#4B4F5E] mx-auto'>
        <div className='flex flex-col gap-3 bg-[#EDEEEF] p-3'>
          <div className='flex gap-2'>
            <Image src={testimonial} alt='' className='rounded-full object-contain'/>
            <div>
              <h1>Brian Clark</h1>
              <p>CEO, Martin Group</p>
            </div>
          </div>
          <p>CredoPay transformed my business! Their
            expert team guided me through the entire
            process, helping me secure the funding I
            needed. I couldn’t have grown my business
            without their support.</p>
        </div>
        <div className='flex flex-col gap-3 bg-[#EDEEEF] p-3'>
          <div className='flex gap-2'>
            <Image src={testimonial} alt='' className='rounded-full object-contain'/>
            <div>
              <h1>Brian Clark</h1>
              <p>CEO, Martin Group</p>
            </div>
          </div>
          <p>CredoPay transformed my business! Their
            expert team guided me through the entire
            process, helping me secure the funding I
            needed. I couldn’t have grown my business
            without their support.</p>
        </div>
        <div className='flex flex-col gap-3 bg-[#EDEEEF] p-3'>
          <div className='flex gap-2'>
            <Image src={testimonial} alt='' className='rounded-full object-contain'/>
            <div>
              <h1>Brian Clark</h1>
              <p>CEO, Martin Group</p>
            </div>
          </div>
          <p>CredoPay transformed my business! Their
            expert team guided me through the entire
            process, helping me secure the funding I
            needed. I couldn’t have grown my business
            without their support.</p>
        </div>
      </div>

    </div>
  )
}

export default Testimonials
