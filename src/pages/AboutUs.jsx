import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const copySections = [
  {
    header: "Why We Built Prosper",
    copy: "Prosper was created to close the gap between financial education and real advisor access. Most people are expected to make important financial decisions without guidance or clarity. At the same time, professional advice often feels out of reach for many investors.\n\nProsper brings both together in one place so you can learn faster, understand your options clearly, and move forward with confidence at every stage of building wealth.",
    color: "border-accent",
    shadow: "shadow-[0_0_15px_#9F83F1]"
  },
  {
    header: "Built on Real Wealth Management Experience",
    copy: "Prosper is backed by leadership with more than 25 years of experience helping clients grow and manage their wealth. That experience includes building Magnolia and Veridos, advisory firms responsible for managing more than 220 million dollars in client assets.\n\nThe platform reflects strategies developed through years of working directly with investors, families, and business owners who wanted a clearer path forward with their finances.",
    color: "border-cyan",
    shadow: "shadow-[0_0_15px_#46C7D9]"
  },
  {
    header: "Why Prosper Exists",
    copy: "Most financial platforms either provide tools without guidance or advice without education. We believe investors should have both.\n\nProsper was designed to give individuals access to structured financial education supported by real advisor insight so they can build portfolios with clarity instead of guesswork.",
    color: "border-pink",
    shadow: "shadow-[0_0_15px_#DF74B8]"
  },
  {
    header: "Our Approach",
    copy: "Prosper combines intelligent AI education with access to experienced financial advisors so users can learn how investing works while tracking their progress in one place.\n\nWhether someone is opening their first retirement account or managing a growing portfolio, the platform adapts to support the next step forward.",
    color: "border-accent",
    shadow: "shadow-[0_0_15px_#9F83F1]"
  },
  {
    header: "Our Mission",
    copy: "Our mission is simple. Make professional level financial guidance easier to understand and more accessible so more people can confidently build long term wealth.",
    color: "border-cyan",
    shadow: "shadow-[0_0_15px_#46C7D9]"
  },
  {
    header: "Our Vision",
    copy: "We believe the future of financial planning brings together intelligent technology and real human expertise. Prosper is built to support both.\n\nAs the platform grows, users will continue to gain access to stronger insights, clearer planning tools, and deeper advisor support designed to help them stay on track as their financial goals evolve.",
    color: "border-pink",
    shadow: "shadow-[0_0_15px_#DF74B8]"
  },
  {
    header: "Looking Ahead",
    copy: "Prosper continues to expand its education tools, advisor access, and planning capabilities so users can move from learning about investing to building structured long term strategies inside one connected platform.\n\nOur goal is to make Prosper a trusted starting point for new investors and a reliable planning companion for experienced ones.",
    color: "border-accent",
    shadow: "shadow-[0_0_15px_#9F83F1]"
  }
];

const advisors = [
  {
    name: "Dr. Elena Rostova",
    title: "Chief Investment Officer",
    certifications: "CFA, CFP®",
    bio: "Former partner at Goldman Sachs, Elena brings 15+ years of quantitative trading experience to retail investors.",
    image: "/elena.png"
  },
  {
    name: "Marcus Chen",
    title: "Head of Private Equity",
    certifications: "CPA",
    bio: "Specializing in tech liquidity events and startup equity structuring for early-stage founders.",
    image: "/marcus.png"
  },
  {
    name: "Sarah Jenkins",
    title: "Senior Tax Strategist",
    certifications: "JD, LLM",
    bio: "Tax lawyer turned financial planner, Sarah optimizes complex portfolios for maximum tax efficiency.",
    image: "/sarah.png"
  },
  {
    name: "David Al-Sayed",
    title: "Director of Real Estate",
    certifications: "CAIA",
    bio: "Pioneering fractional real estate models, bridging the gap between traditional asset management and Web3.",
    image: "/david.png"
  }
];

function TiltAdvisorCard({ advisor }) {
  const cardRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isTouchDevice) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div className="h-full">
      <div 
        ref={cardRef} 
        className="group relative rounded-3xl overflow-hidden bg-[#1A1B23]/40 border border-white/5 shadow-2xl transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(159,131,241,0.2)] flex flex-col h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: 'preserve-3d', willChange: isTouchDevice ? 'auto' : 'transform' }}
      >
        <div className="h-72 w-full shrink-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#14151B] to-transparent z-10"></div>
          <img 
            src={advisor.image} 
            alt={advisor.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
          />
        </div>
        
        <div className="p-8 relative z-20 -mt-16 bg-gradient-to-t from-[#14151B] via-[#14151B] to-transparent flex flex-col flex-grow">
          <div className="text-accent text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-sm">{advisor.title}</div>
          <h3 className="text-2xl font-heading font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
            {advisor.name}
            <span className="text-white/40 text-sm font-normal">{advisor.certifications}</span>
          </h3>
          <p className="mt-4 font-heading text-sm text-white/60 leading-relaxed border-t border-white/10 pt-4">
            {advisor.bio}
          </p>
          
          <button className="mt-auto pt-6 flex items-center gap-2 text-cyan font-heading text-sm font-semibold hover:text-white transition-colors group/btn">
            Book Consultation <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AboutUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate narrative sections
      const timelineBlocks = gsap.utils.toArray('.narrative-timeline-block');
      timelineBlocks.forEach((block) => {
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      gsap.from('.advisor-header', {
        scrollTrigger: {
          trigger: '.advisor-header',
          start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.advisors-grid > div', {
        scrollTrigger: {
          trigger: '.advisors-grid',
          start: 'top 75%'
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-20 pb-20 md:pt-32 md:pb-32">
      <Helmet>
        <title>About Us | Meet the Prosper Fiduciary Team</title>
        <meta name="description" content="Learn why Prosper was built and meet the fiduciary advisors behind the platform. 25+ years of wealth management experience helping investors at every stage build long-term financial clarity." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/about" />
      </Helmet>
      {/* Advisors Section (Moved to top) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-40 relative z-10">
        <div className="advisor-header text-center max-w-2xl mx-auto mb-10 md:mb-20">
          <div className="inline-block text-[#9F83F1] text-sm uppercase tracking-widest font-bold mb-4 bg-[#9F83F1]/10 px-4 py-1.5 rounded-full border border-[#9F83F1]/20 backdrop-blur-sm">
            About Us
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-7xl text-white tracking-tight leading-none mb-6">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-pink to-cyan italic font-drama pe-4">Fiduciaries</span>
          </h2>
          <p className="font-heading text-xl text-white/50 leading-relaxed max-w-2xl mx-auto">
            Technology powers the platform, but human expertise directs the strategy. Our advisors are legally bound to act in your best interest.
          </p>
        </div>

        <div className="advisors-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advisors.map((advisor, index) => (
            <TiltAdvisorCard key={index} advisor={advisor} />
          ))}
        </div>
      </div>

      {/* Timeline Narrative Sections */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="space-y-16 border-l border-white/10 pl-6 md:pl-16 relative timeline-container">
          <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-accent via-pink to-transparent"></div>
          
          {copySections.map((section, index) => (
            <div key={index} className="narrative-timeline-block relative">
              <div className={`absolute -left-[33px] md:-left-[73px] top-2 w-4 h-4 bg-[#14151B] border-2 ${section.color} rounded-full ${section.shadow}`}></div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">{section.header}</h2>
              {section.copy.split('\n\n').map((paragraph, i) => (
                <p key={i} className="font-heading text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
