import React from 'react';
import { FaCalendar, FaClock, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';

const Contacts = () => {
    return (
        <div className="w-full p-12 bg-[#061525F2] text-white my-5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                {/* Left Section */}
                <div className="flex-1">
                    <button className="text-white border border-white rounded-full py-2 px-6 mb-6 hover:bg-white hover:text-[#061525] transition-colors duration-300">
                        CONTACT US
                    </button>
                    <h1 className="text-4xl font-bold mb-4 leading-tight">
                        Empower your financial journey with personalized solutions
                    </h1>
                    <p className="text-gray-300 mb-6">
                        With Credora Financial, you have the power to take control of your financial future. 
                        Our expert solutions are tailored to your unique needs.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-xl" />
                            <p>credora@gmail.com</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-xl" />
                            <p>+250 787 289 178</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaClock className="text-xl" />
                            <p>24/7 All Loan Services Available</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaCalendar className="text-xl" />
                            <p>Mon to Fri: 9 AM - 4 PM</p>
                        </div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="flex-1">
                    <form className="space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="firstName" className="mb-2">First Name</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                id="firstName" 
                                className="bg-[#EDEEEF80] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="bg-[#EDEEEF80] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message" className="mb-2">Message</label>
                            <textarea 
                                name="message" 
                                id="message" 
                                rows={5}
                                className="bg-[#EDEEEF80] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white resize-y"
                                required
                            />
                        </div>
                        <button 
                            type="submit"
                            className="bg-white py-2 px-6 rounded-md text-[#061525] font-semibold hover:bg-gray-200 transition-colors duration-300"
                        >
                            Submit
                        <FaArrowRight className="ml-2 text-xl inline-block" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contacts;