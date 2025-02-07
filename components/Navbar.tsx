import React from 'react'
import Image from 'next/image'
import logo from '/logo.png'

const Navbar = () => {
  return (
    <div className='w-full bg-white flex justify-between p-6 font-semibold m-auto'>
      <div className='flex flex-row'>
        <Image src="/logo.png" alt='' className='h-8 w-8' width={10} height={10}/>
        <h1 className='text-[#4B4F5E]'>Credora</h1>
      </div>
      <div className='flex flex-col md:flex-row gap-6 text-[#4B4F5E]'>
        <h1 className='cursor-pointer'>Home</h1>
        <h1 className='cursor-pointer'>About</h1>
        <h1 className='cursor-pointer'>Services</h1>
        <h1 className='cursor-pointer'>Contact</h1>
        <h1 className='cursor-pointer'>Faq</h1>
      </div>
      <div className='flex flex-col md:flex-row gap-3'>
        <button className='bg-[#061525] text-white px-10 py-2 rounded-md'>Login</button>
        <button className='text-[#4B4F5E] bg-white px-10 py-2 rounded-md border-[#4B4F5E] border hover:bg-[#4B4f5e] hover:text-white transition-all duration-500'>Register</button>
      </div>
    </div>

  )
}

export default Navbar
