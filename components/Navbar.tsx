import React from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'

const Navbar = () => {
  return (
    <div className='w-full bg-white flex justify-between p-6 font-semibold m-auto'>
      <div className='flex flex-row'>
        <Image src={logo} alt='' className='h-8 w-8'/>
        <h1 className='text-[#4B4F5E]'>Credora</h1>
      </div>
      <div className='flex flex-row gap-6 text-[#4B4F5E]'>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Services</h1>
        <h1>Contact</h1>
        <h1>Faq</h1>
      </div>
      <div className='flex flex-row gap-3'>
        <button className='bg-[#061525] text-white px-10 py-2 rounded-md'>Login</button>
        <button className='text-[#4B4F5E] bg-white px-10 py-2 rounded-md border-[#4B4F5E] border'>Register</button>
      </div>
    </div>

  )
}

export default Navbar
