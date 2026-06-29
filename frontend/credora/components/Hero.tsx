"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import Slider from "react-slick"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from "next/link"

// Custom arrow components
const CustomNextArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 cursor-pointer hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105`}
      style={{ ...style, zIndex: 20 }}
      onClick={onClick}
      aria-label="Next slide"
    >
      <svg className="h-6 w-6 text-[#061525]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  )
}

const CustomPrevArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className} absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 cursor-pointer hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105`}
      style={{ ...style, zIndex: 20 }}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <svg className="h-6 w-6 text-[#061525]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  )
}

// Scroll indicator component
const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex flex-col items-center animate-bounce">
      <span className="text-white text-sm font-medium mb-2 tracking-wider opacity-80">Scroll Down</span>
      <svg className="h-6 w-6 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  )
}

const Hero = () => {
  // Background images for the carousel (ensure correct paths in public folder)
  const backgroundImages = [
    { index: 1, src: "/business.svg", alt: "Business illustration" },
    { index: 2, src: "/smile.svg", alt: "Smile illustration" },
    { index: 3, src: "/family.svg", alt: "Family illustration" },
    { index: 4, src: "/boy.svg", alt: "Boy illustration" },
    { index: 5, src: "/real.svg", alt: "Real estate illustration" },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sliderRef = useRef<Slider>(null)

  // Animation on mount - delay to prevent layout shift
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    afterChange: (index: number) => setCurrentSlide(index),
    fade: true,
  }

  return (
    <div className="relative w-full overflow-hidden pt-16 md:pt-[70px]">
      {" "}
      {/* Added pt-16 for navbar space */}
      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-[1] bg-[url('/placeholder.svg?height=100&width=100')] opacity-10 pointer-events-none"></div>
      {/* Hero Carousel */}
      <div className="relative">
        <Slider {...settings} ref={sliderRef} className="hero-slider">
          {backgroundImages.map((image, index) => (
            <div key={index} className="relative h-[85vh] w-full flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

              {/* Content - Adjusted positioning */}
              <div
                className={`relative z-10 text-white text-center px-6 sm:px-10 lg:px-12 max-w-5xl mx-auto transition-opacity duration-700 ${
                  isVisible ? "opacity-100" : "opacity-0"
                } mt-0 md:mt-0`}
              >
                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider mb-6 text-white/90 border border-white/20">
                  TRUSTED BY THOUSANDS OF CUSTOMERS
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg tracking-tight leading-[1.2]">
                  Design Your Loan with{" "}
                  <span className="text-white relative inline-block">
                    the Experts
                    <span className="absolute bottom-2 left-0 w-full h-1 bg-white/30 rounded-full"></span>
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 drop-shadow-md max-w-3xl mx-auto leading-relaxed">
                  At Credora, we leverage AI technology to manage your finances and loans effectively, supporting you
                  every step of the way.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <Link
                    href="/register"
                    className="px-8 py-4 bg-white text-[#061525] rounded-full font-semibold text-base sm:text-lg hover:bg-opacity-95 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg group"
                  >
                    Get Started
                    <svg
                      className="inline-block ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <button className="px-8 py-4 bg-transparent text-white border border-white/30 rounded-full font-semibold text-base sm:text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 flex flex-wrap justify-center items-center gap-6 opacity-80">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm">4.9/5 Rating</span>
                  </div>
                  <div className="h-4 w-px bg-white/30"></div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="ml-1 text-sm">Secure Transactions</span>
                  </div>
                  <div className="h-4 w-px bg-white/30"></div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="ml-1 text-sm">10K+ Customers</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Additional navigation arrows for mobile */}
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30 md:hidden">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg className="h-5 w-5 text-[#061525]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30 md:hidden">
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="h-5 w-5 text-[#061525]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Custom Dot Indicators */}
      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <div className="flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              className={`w-12 h-2 rounded-full cursor-pointer transition-all duration-500 ${
                currentSlide === index
                  ? "bg-white w-16" // Wider for active state
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Scroll Indicator */}
      <ScrollIndicator />
      {/* Info Card */}
      <div className="relative mx-6 sm:mx-6 md:mx-auto md:absolute md:bottom-[-80px] md:right-12 max-w-md w-full z-20">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-[#061525]/10 flex items-center justify-center mr-4">
              <svg className="h-5 w-5 text-[#061525]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#061525] drop-shadow-sm">5% Interest Rate</h2>
          </div>
          <p className="text-gray-600 text-base leading-relaxed drop-shadow-sm mb-4">
            Discover our dependable loan solutions designed to empower your financial journey with competitive rates and
            expert support.
          </p>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Starting from</span>
              <span className="ml-2 text-lg font-bold text-[#061525]">$5,000</span>
            </div>
            <button className="text-[#061525] font-medium text-sm hover:underline flex items-center">
              Calculate Rate
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

