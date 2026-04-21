import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, User, TrendingUp, ShieldCheck, Cpu, BarChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "ai-education",
    title: "AI Education Engine",
    description: "Your learning experience adapts to your starting point and goals. The platform guides you step by step through key topics such as retirement accounts, investing basics, and advanced strategies through structured lessons.",
    bullets: [
      "Encrypted user data across all sessions",
      "Secure identity verification and account protection",
      "Continuous monitoring to protect personal information"
    ],
    icon: <Brain size={48} className="text-cyan drop-shadow-[0_0_15px_rgba(70,199,217,0.8)]" />,
    color: "cyan",
    image: "/app_education.png"
  },
  {
    id: "human-advisors",
    title: "Certified Advisor Network",
    description: "Speak directly with experienced fiduciary advisors who understand your financial picture and learning progress. Every conversation stays focused and relevant to your next step.",
    bullets: [
      "Encrypted advisor communication channels",
      "Protected document sharing and storage",
      "Verified advisor access controls for privacy protection"
    ],
    icon: <User size={48} className="text-accent drop-shadow-[0_0_15px_rgba(159,131,241,0.8)]" />,
    color: "accent",
    image: "/app_advisor.png"
  },
  {
    id: "portfolio-tracking",
    title: "Unified Wealth Dashboard",
    description: "Track accounts and assets in one place. View your full financial position clearly across investments, property, and digital assets with simple visual summaries.",
    bullets: [
      "Secure account aggregation connections",
      "Protected portfolio data synchronization",
      "Private net worth tracking across linked platforms"
    ],
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
    <div ref={containerRef} className="pt-20 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 w-full max-w-7xl mx-auto overflow-hidden">
      <Helmet>
        <title>Features | PRO$PER</title>
        <meta name="description" content="Explore Prosper's AI Education Engine, Certified Advisor Network, and Unified Wealth Dashboard — tools built to help you learn investing and track your portfolio." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/features" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Features | PRO$PER" />
        <meta property="og:description" content="Explore Prosper's AI Education Engine, Certified Advisor Network, and Unified Wealth Dashboard — tools built to help you learn investing and track your portfolio." />
        <meta property="og:image" content="https://www.buildingwealthsoftware.com/prosper-logo.png" />
        <meta property="og:url" content="https://www.buildingwealthsoftware.com/features" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Features | PRO$PER" />
        <meta name="twitter:description" content="Explore Prosper's AI Education Engine, Certified Advisor Network, and Unified Wealth Dashboard — tools built to help you learn investing and track your portfolio." />
        <meta name="twitter:image" content="https://www.buildingwealthsoftware.com/prosper-logo.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.buildingwealthsoftware.com/"},
              {"@type": "ListItem", "position": 2, "name": "Features", "item": "https://www.buildingwealthsoftware.com/features"}
            ]
          }
        `}</script>
      </Helmet>
      
      {/* Hero Section */}
      <div className="feature-hero text-center max-w-3xl mx-auto mb-16 md:mb-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10"></div>
        <h1 className="font-heading font-bold text-4xl md:text-7xl text-white mb-6 tracking-tight">
          Platform <span className="font-drama italic text-cyan drop-shadow-[0_0_30px_rgba(70,199,217,0.4)]">Capabilities</span>
        </h1>
        <p className="font-heading text-lg md:text-xl text-white/60 leading-relaxed">
          Explore the tools built to help you move forward with clarity and structure. Each feature supports steady progress toward stronger financial decisions.
        </p>
      </div>

      {/* Feature Rows */}
      <div className="space-y-16 md:space-y-32">
        {features.map((feat, index) => (
          <div key={index} id={feat.id} className={`feature-row scroll-mt-32 flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 relative`}>
            
            <div className="w-full md:w-1/2 space-y-6 relative z-10 transform-gpu" style={{ willChange: "transform, opacity" }}>
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
                {feat.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 font-heading text-sm text-white/80">
                    <ShieldCheck size={18} className={`text-${feat.color} drop-shadow-[0_0_5px_currentColor]`} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/2 perspective-[1500px] transform-gpu" style={{ willChange: "transform, opacity" }}>
              <div className="relative rounded-[2rem] border border-white/10 bg-[#1A1B23]/50 backdrop-blur-xl p-4 shadow-2xl overflow-hidden transform-gpu hover:rotate-y-[5deg] hover:rotate-x-[5deg] transition-transform duration-700">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${feat.color}/20 blur-[50px]`}></div>
                <img 
                  src={feat.image} 
                  alt={feat.title} 
                  loading="lazy"
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
