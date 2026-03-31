import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each card (always show 3: left, center, right)
  function getImageStyle(index) {
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0%) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(-70%) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(70%) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other cards
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0%) scale(0.5) rotateY(0deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-12 relative z-10 perspective-[2000px] flex flex-col items-center">
      {/* 3D Rotating Cards */}
      <div className="relative w-full h-[32rem] md:h-[38rem] flex justify-center transform-style-[preserve-3d]" ref={imageContainerRef}>
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={testimonial.src}
              className={`absolute w-[90%] max-w-[420px] h-full rounded-[2rem] overflow-hidden bg-[#1A1B23]/90 shadow-2xl flex flex-col border transition-colors duration-500 cursor-pointer ${isActive ? 'border-accent/40 shadow-[0_0_50px_rgba(159,131,241,0.2)]' : 'border-white/5'}`}
              data-index={index}
              style={getImageStyle(index)}
              onClick={() => setActiveIndex(index)}
            >
              {/* Image Top Half */}
              <div className="h-[50%] w-full shrink-0 relative overflow-hidden rounded-t-[2rem]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B23]/90 via-[#1A1B23]/20 to-transparent z-10" />
                <img 
                  src={testimonial.src} 
                  alt={testimonial.name} 
                  className={`w-full h-full object-cover object-[center_20%] transition-transform duration-1000 ${isActive ? 'scale-105 grayscale-0' : 'grayscale-[60%] scale-100'}`} 
                />
              </div>
              
              {/* Content Bottom Half */}
              <div className="px-6 md:px-8 pb-8 pt-6 relative z-20 -mt-6 bg-gradient-to-t from-[#1A1B23]/90 via-[#1A1B23]/90 to-transparent flex flex-col flex-grow text-left">
                <div className="text-[#46C7D9] text-xs font-data tracking-widest uppercase mb-1 drop-shadow-sm">{testimonial.designation}</div>
                <h3 className="text-2xl font-heading font-bold text-white tracking-tight mb-4">{testimonial.name}</h3>
                
                {/* Scrollable quote container to prevent text overflow */}
                <div className="flex-grow overflow-y-auto custom-scrollbar border-t border-white/5 pt-4">
                  <p className="font-heading text-[0.95rem] md:text-base text-white/70 leading-relaxed font-light italic relative">
                    <span className="text-[#9F83F1] text-4xl absolute -top-4 -left-3 opacity-30 font-serif leading-none">"</span>
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-12 relative z-20">
        <button
          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/5 bg-[#14151B]/50 backdrop-blur-xl hover:bg-accent/20 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(159,131,241,0.2)] hover:scale-105 active:scale-95 text-white/50 hover:text-white"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <ArrowLeft size={22} />
        </button>
        <button
          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/5 bg-[#14151B]/50 backdrop-blur-xl hover:bg-cyan/20 hover:border-cyan/30 hover:shadow-[0_0_20px_rgba(70,199,217,0.2)] hover:scale-105 active:scale-95 text-white/50 hover:text-white"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default CircularTestimonials;
