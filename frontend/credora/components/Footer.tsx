"use client";

import { FaFacebook, FaGooglePlay, FaInstagram, FaLinkedin, FaTwitter, FaAppStore } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-6 w-full bg-primary px-4 py-12 text-white/80 sm:py-16 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 text-2xl font-bold text-white">Credora</div>
          <p className="mb-6 max-w-md text-sm text-white/60">
            AI credit scoring on alternative data — so applicants without a traditional file can still be assessed fairly.
          </p>
          <h3 className="mb-3 text-sm font-semibold text-white">Get the app</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-4 py-2 text-sm transition hover:border-white hover:text-white"
            >
              <FaAppStore size={18} /> App Store
            </Link>
            <Link
              href="https://play.google.com/store"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-4 py-2 text-sm transition hover:border-white hover:text-white"
            >
              <FaGooglePlay size={18} /> Google Play
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                Log in
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white">
                Get started
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Follow</h3>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" className="hover:text-white" aria-label="Facebook">
              <FaFacebook size={20} />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-white" aria-label="Twitter">
              <FaTwitter size={20} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-white" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-white" aria-label="Instagram">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-8 text-center text-sm text-white/50">
        <p>© {new Date().getFullYear()} Credora. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
