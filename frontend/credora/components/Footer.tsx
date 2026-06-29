// app/components/Footer.jsx
'use client';

import { FaApple, FaAppStore, FaFacebook, FaGooglePlay, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-[#061525] text-[#DDDDDD] px-4 md:px-12 py-16 mt-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Company Info Section */}
        <div className="md:col-span-2">
          <div className="text-2xl font-bold mb-4">Credora</div>
          <p className="text-gray-400 mb-6">
            25 years of expert loan and finance services. Trusted solutions tailored to your financial growth and security.
          </p>
          <div>
            <h3 className="text-lg font-semibold mb-3">Get your mobile app</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="https://www.apple.com/app-store/" 
                target="_blank"
                className="flex items-center justify-center gap-2 border border-gray-500 hover:border-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                <FaAppStore size={20} /> App Store
              </Link>
              <Link 
                href="https://play.google.com/store" 
                target="_blank"
                className="flex items-center justify-center gap-2 border border-gray-500 hover:border-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                <FaGooglePlay size={20} /> Google Play
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-start md:items-center">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" className="hover:text-white transition-colors duration-300">
              <FaFacebook size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-white transition-colors duration-300">
              <FaTwitter size={24} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors duration-300">
              <FaLinkedin size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-white transition-colors duration-300">
              <FaInstagram size={24} />
            </Link>
          </div>
        </div>

        {/* Pages Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pages</h3>
          <ul className="space-y-2">
            <li><Link href="/how-it-works" className="hover:text-white transition-colors duration-300">How it works</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors duration-300">Pricing</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors duration-300">Blog</Link></li>
            <li><Link href="/demo" className="hover:text-white transition-colors duration-300">Demo</Link></li>
          </ul>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><Link href="/personal-loans" className="hover:text-white transition-colors duration-300">Personal Loans</Link></li>
            <li><Link href="/student-loans" className="hover:text-white transition-colors duration-300">Student Loans</Link></li>
            <li><Link href="/business-loans" className="hover:text-white transition-colors duration-300">Small Business Loans</Link></li>
            <li><Link href="/emergency-loans" className="hover:text-white transition-colors duration-300">Emergency Loans</Link></li>
          </ul>
        </div>

        {/* Map Section */}
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-semibold mb-3">Our Location</h3>
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377965.73481983!2d-124.12856331399925!3d53.072575540246056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8254214a3196af57%3A0x13945eec8c70c0cb!2sCredora!5e1!3m2!1sen!2srw!4v1740473179583!5m2!1sen!2srw"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="max-w-full"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Credora. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;