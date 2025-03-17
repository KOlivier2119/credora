/* Custom styles for the hero section */
.hero-slider .slick-slide {
    transition: opacity 0.8s ease;
  }
  
  .hero-slider .slick-active {
    z-index: 1;
  }
  
  /* Custom animation for slide transitions */
  @keyframes fadeInScale {
    from {
      opacity: 0.4;
      transform: scale(1.05);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .hero-slider .slick-active {
    animation: fadeInScale 1.2s forwards;
  }
  
  /* Improve dots animation */
  @keyframes dotPulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
  }
  
  .hero-slider .slick-dots li.slick-active button:before {
    animation: dotPulse 2s infinite;
  }
  
  /* Ensure hero content is visible below fixed navbar */
  .hero-slider {
    margin-top: 0;
  }
  
  /* Make sure navigation arrows are visible */
  .hero-slider .slick-prev,
  .hero-slider .slick-next {
    width: 44px;
    height: 44px;
    z-index: 20;
  }
  
  .hero-slider .slick-prev {
    left: 20px;
  }
  
  .hero-slider .slick-next {
    right: 20px;
  }
  
  /* Ensure arrows are visible on all backgrounds */
  .hero-slider .slick-prev:before,
  .hero-slider .slick-next:before {
    display: none;
  }
  
  /* Adjust content positioning for different screen sizes */
  @media (max-width: 640px) {
    .hero-slider .slick-slide > div {
      padding-top: 4rem;
    }
  
    /* Ensure navigation arrows are visible on mobile */
    .hero-slider .slick-prev,
    .hero-slider .slick-next {
      display: none !important;
    }
  }
  
  