import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutUsSection from '../components/ui/about-us-section';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
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
    if (!cardRef.current) return;
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
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <div className="h-72 w-full shrink-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#14151B] to-transparent z-10"></div>
          <img 
            src={advisor.image} 
            alt={advisor.name} 
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
    <div ref={containerRef} className="pt-24 pb-32">
      {/* Advisors Section (Moved to top) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 mb-32 relative z-10">
        <div className="advisor-header text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight mb-6">
            Meet the Fiduciaries
          </h2>
          <p className="font-heading text-lg text-white/60">
            Technology powers the platform, but human expertise directs the strategy. Our advisors are legally bound to act in your best interest.
          </p>
        </div>

        <div className="advisors-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advisors.map((advisor, index) => (
            <TiltAdvisorCard key={index} advisor={advisor} />
          ))}
        </div>
      </div>

      {/* Abstract About Section */}
      <AboutUsSection />
    </div>
  );
}
