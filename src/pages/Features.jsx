import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, User, TrendingUp, ShieldCheck, Cpu, BarChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "ai-education",
    title: "AI Education Engine",
    description: "Our proprietary AI doesn't just answer questions; it builds a customized curriculum based on your financial literacy and goals. From Roth IRAs to advanced options trading, learn at your own pace through interactive, narrative-driven modules.",
    icon: <Brain size={48} className="text-cyan drop-shadow-[0_0_15px_rgba(70,199,217,0.8)]" />,
    color: "cyan",
    image: "/app_education.png"
  },
  {
    id: "human-advisors",
    title: "Certified Advisor Network",
    description: "When algorithms aren't enough, connect instantly with our network of vetted fiduciaries. They have full context of your portfolio and learning progress, ensuring every consultation is highly efficient and personalized.",
    icon: <User size={48} className="text-accent drop-shadow-[0_0_15px_rgba(159,131,241,0.8)]" />,
    color: "accent",
    image: "/app_advisor.png"
  },
  {
    id: "portfolio-tracking",
    title: "Unified Wealth Dashboard",
    description: "Aggregate every asset class—from traditional equities and real estate to crypto and private equity. Experience zero-latency portfolio tracking with cinematic data visualization that makes understanding your net worth effortless.",
    icon: <TrendingUp size={48} className="text-[#4ADE80] drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]" />,
    color: "[#4ADE80]",
    image: "/app_dashboard.png"
  }
];

export default function Features() {
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Delay allows GSAP and DOM to settle before jumping
    }
  }, [location]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.feature-hero', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });

      // Feature staggered scroll animations
      gsap.utils.toArray('.feature-row').forEach((row, i) => {
        gsap.from(row.children, {
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 w-full max-w-7xl mx-auto overflow-hidden">
      
      {/* Hero Section */}
      <div className="feature-hero text-center max-w-3xl mx-auto mb-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10"></div>
        <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6 tracking-tight">
          Platform <span className="font-drama italic text-cyan drop-shadow-[0_0_30px_rgba(70,199,217,0.4)]">Capabilities</span>
        </h1>
        <p className="font-heading text-lg md:text-xl text-white/60 leading-relaxed">
          Explore the tools engineered to accelerate your journey to financial independence. Powerful abstractions, zero compromises.
        </p>
      </div>

      {/* Feature Rows */}
      <div className="space-y-32">
        {features.map((feat, index) => (
          <div key={index} id={feat.id} className={`feature-row scroll-mt-32 flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 relative`}>
            
            <div className="w-full md:w-1/2 space-y-6 relative z-10">
              <div className="mb-8 p-4 bg-white/5 inline-block rounded-2xl border border-white/10 shadow-lg backdrop-blur-md">
                {feat.icon}
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
                {feat.title}
              </h2>
              <p className="font-heading text-lg text-white/60 leading-relaxed">
                {feat.description}
              </p>
              
              <ul className="space-y-4 pt-4">
                {[1, 2, 3].map((_, i) => (
                  <li key={i} className="flex items-center gap-3 font-heading text-sm text-white/80">
                    <ShieldCheck size={18} className={`text-${feat.color} drop-shadow-[0_0_5px_currentColor]`} />
                    Enterprise-grade security & encryption standard
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/2 perspective-[1500px]">
              <div className="relative rounded-[2rem] border border-white/10 bg-[#1A1B23]/50 backdrop-blur-xl p-4 shadow-2xl overflow-hidden transform-gpu hover:rotate-y-[5deg] hover:rotate-x-[5deg] transition-transform duration-700">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${feat.color}/20 blur-[50px]`}></div>
                <img 
                  src={feat.image} 
                  alt={feat.title} 
                  className="w-full h-auto rounded-xl shadow-inner contrast-125 object-cover"
                />
              </div>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}
