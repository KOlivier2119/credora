"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
  { name: "FAQ", href: "/#faq" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-lg py-2" : "py-3"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center" onClick={() => setIsOpen(false)}>
            <Image src="/Credora.svg" alt="Credora" width={32} height={32} className="h-8 w-8 shrink-0" />
            <h1 className="ml-2.5 truncate text-lg font-bold tracking-tight text-primary sm:text-xl">Credora</h1>
          </Link>

          <div className="hidden items-center lg:flex">
            <div className="flex space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden items-center space-x-3 lg:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-muted"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90"
            >
              Get started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-primary lg:hidden"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? "max-h-[calc(100dvh-4.5rem)] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 pb-2 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="space-y-3 px-4 pb-4 pt-2">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-lg border border-primary/20 px-6 py-3 text-sm font-medium text-primary"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
