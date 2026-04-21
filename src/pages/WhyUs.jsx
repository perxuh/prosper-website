import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split text-like staggered reveal for narrative
      gsap.from('.narrative-block', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        },
        y: 40,
        opacity: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: 'power3.out'
      });

      gsap.to('.ambient-glow', {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'linear'
      });
      
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%'
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'back.out(1.5)'
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-20 pb-20 md:pt-32 md:pb-40 px-6 md:px-12 max-w-5xl mx-auto relative min-h-screen overflow-hidden">
      <Helmet>
        <title>Why PRO$PER | PRO$PER</title>
        <meta name="description" content="Built on 25+ years of wealth management experience, $220M+ in assets, and 0% AUM fees. Discover why Prosper is the financial platform built differently." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/why-us" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Why Prosper | PRO$PER" />
        <meta property="og:description" content="Built on 25+ years of wealth management experience, $220M+ in assets, and 0% AUM fees. Discover why Prosper is the financial platform built differently." />
        <meta property="og:image" content="https://www.buildingwealthsoftware.com/prosper-logo.png" />
        <meta property="og:url" content="https://www.buildingwealthsoftware.com/why-us" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why Prosper | PRO$PER" />
        <meta name="twitter:description" content="Built on 25+ years of wealth management experience, $220M+ in assets, and 0% AUM fees. Discover why Prosper is the financial platform built differently." />
        <meta name="twitter:image" content="https://www.buildingwealthsoftware.com/prosper-logo.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.buildingwealthsoftware.com/"},
              {"@type": "ListItem", "position": 2, "name": "Why Prosper", "item": "https://www.buildingwealthsoftware.com/why-us"}
            ]
          }
        `}</script>
      </Helmet>
      
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="ambient-glow absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-pink/10 rounded-full blur-[150px]"></div>
        <div className="ambient-glow absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" style={{ animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative z-10">
        <div className="narrative-block text-center mb-12 md:mb-24">
          <div className="inline-block text-[#9F83F1] text-sm uppercase tracking-widest font-bold mb-4 bg-[#9F83F1]/10 px-4 py-1.5 rounded-full border border-[#9F83F1]/20 backdrop-blur-sm">
            Why Prosper
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-7xl text-white tracking-tighter leading-tight mb-6">
            Your Financial Future, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-pink to-cyan italic font-drama pe-4">Simplified.</span>
          </h1>
          <p className="font-heading text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Most investing platforms give you tools without guidance or guidance without clarity. Prosper brings both together so you can learn faster, track everything in one place, and move forward with confidence supported by real advisors and intelligent education.
          </p>
        </div>

        <div className="space-y-16 mt-16 md:mt-32 border-l border-white/10 pl-6 md:pl-16 relative">
          <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-accent via-pink to-transparent"></div>
          
          {[
            {
              title: "Real Advisors From the Start",
              copy: "Many apps rely only on automation. Prosper connects you with experienced fiduciary professionals who help you understand decisions as your portfolio grows.\n\nYou are not left guessing what to do next. You move forward with structure and support at every stage.",
              color: "border-accent",
              shadow: "shadow-[0_0_15px_#9F83F1]"
            },
            {
              title: "Education That Helps You Take Action",
              copy: "Learning about investing should feel simple and practical. Prosper uses intelligent education tools designed to explain retirement accounts, diversification, and long term strategy in a way that makes sense right away.\n\nYou learn what matters and how to apply it to your own goals.",
              color: "border-cyan",
              shadow: "shadow-[0_0_15px_#46C7D9]"
            },
            {
              title: "Experience Behind the Platform",
              copy: "Prosper is built by leadership with more than 25 years in financial planning and wealth management. That experience includes helping guide firms responsible for managing more than 220 million dollars in client assets.\n\nThe platform reflects strategies shaped through years of working directly with investors building real portfolios.",
              color: "border-pink",
              shadow: "shadow-[0_0_15px_#DF74B8]"
            },
            {
              title: "Everything in One Clear Dashboard",
              copy: "Your finances should not live across multiple disconnected platforms. Prosper brings your accounts together so you can track progress, monitor performance, and stay focused on long term growth without confusion.",
              color: "border-accent",
              shadow: "shadow-[0_0_15px_#9F83F1]"
            },
            {
              title: "Built for Where You Are Today",
              copy: "Whether you are opening your first investment account or organizing a growing portfolio, Prosper adapts to support your next step.\n\nYou get education when you are learning. You get guidance when decisions matter more. You keep control as your financial picture becomes stronger.",
              color: "border-cyan",
              shadow: "shadow-[0_0_15px_#46C7D9]"
            },
            {
              title: "Transparent and Simple Pricing",
              copy: "Prosper keeps platform pricing clear so you always know what you are paying for. There are no platform AUM fees tied to your account balance.\n\nYou stay focused on building wealth instead of worrying about hidden costs.",
              color: "border-pink",
              shadow: "shadow-[0_0_15px_#DF74B8]"
            }
          ].map((section, index) => (
            <div key={index} className="narrative-block relative">
              <div className={`absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-[#14151B] border-2 ${section.color} rounded-full ${section.shadow}`}></div>
              <h2 className="font-heading font-bold text-3xl text-white mb-4">{section.title}</h2>
              {section.copy.split('\n\n').map((paragraph, i) => (
                <p key={i} className="font-heading text-lg text-white/60 leading-relaxed max-w-3xl mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="stats-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32">
           <div className="stat-card p-8 bg-surface border border-white/5 rounded-3xl text-center backdrop-blur-xl flex flex-col items-center justify-center min-h-[160px]">
            <div className="font-drama text-5xl text-white mb-3 shadow-accent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">0%</div>
            <div className="font-heading text-sm text-white/50 tracking-wide uppercase">Platform AUM Fees</div>
          </div>
          <div className="stat-card p-8 bg-surface border border-white/5 rounded-3xl text-center backdrop-blur-xl flex flex-col items-center justify-center min-h-[160px]">
            <div className="font-drama text-5xl text-accent mb-3 drop-shadow-[0_0_10px_rgba(159,131,241,0.5)]">25+</div>
            <div className="font-heading text-sm text-white/50 tracking-wide uppercase">Years Leadership Experience</div>
          </div>
          <div className="stat-card p-8 bg-surface border border-white/5 rounded-3xl text-center backdrop-blur-xl flex flex-col items-center justify-center min-h-[160px]">
            <div className="font-drama text-5xl text-pink mb-3 drop-shadow-[0_0_10px_rgba(223,116,184,0.5)]">$220M+</div>
            <div className="font-heading text-sm text-white/50 tracking-wide uppercase">Client Assets Managed</div>
          </div>
          <div className="stat-card p-8 bg-surface border border-white/5 rounded-3xl text-center backdrop-blur-xl flex flex-col items-center justify-center min-h-[160px]">
             <div className="font-drama text-5xl text-cyan mb-3 drop-shadow-[0_0_10px_rgba(70,199,217,0.5)]">24/7</div>
            <div className="font-heading text-sm text-white/50 tracking-wide uppercase">AI Education Access</div>
          </div>
        </div>
      </div>
    </div>
  );
}
