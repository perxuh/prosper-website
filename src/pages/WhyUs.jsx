import React, { useEffect, useRef } from 'react';
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
    <div ref={containerRef} className="pt-32 pb-40 px-6 md:px-12 max-w-5xl mx-auto relative min-h-screen overflow-hidden">
      
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="ambient-glow absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-pink/10 rounded-full blur-[150px]"></div>
        <div className="ambient-glow absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" style={{ animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative z-10">
        <div className="narrative-block text-center mb-24">
          <div className="inline-block text-cyan text-sm uppercase tracking-widest font-bold mb-4 bg-cyan/10 px-4 py-1.5 rounded-full border border-cyan/20 backdrop-blur-sm">
            The Philosophy
          </div>
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-white tracking-tighter leading-none mb-6">
            Wealth is <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-pink to-cyan italic font-drama pe-4">Asymmetric</span>
          </h1>
          <p className="font-heading text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            The traditional financial system is built to keep the complex opaque and the simple expensive. We engineered Prosper to shatter that asymmetry.
          </p>
        </div>

        <div className="space-y-16 mt-32 border-l border-white/10 pl-8 md:pl-16 relative">
          <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-accent via-cyan to-transparent"></div>
          
          <div className="narrative-block relative">
            <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-[#14151B] border-2 border-accent rounded-full shadow-[0_0_15px_#9F83F1]"></div>
            <h2 className="font-heading font-bold text-3xl text-white mb-4">The Information Gap</h2>
            <p className="font-heading text-lg text-white/60 leading-relaxed max-w-3xl">
              Wall Street thrives on information asymmetry. While institutional investors use algorithmic models and dedicated analysts to make decisions, retail investors are left with reactionary news and latency. <strong>Prosper’s AI Education Engine democratizes the institutional knowledge base.</strong>
            </p>
          </div>

          <div className="narrative-block relative">
            <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-[#14151B] border-2 border-cyan rounded-full shadow-[0_0_15px_#46C7D9]"></div>
            <h2 className="font-heading font-bold text-3xl text-white mb-4">The Advice Premium</h2>
            <p className="font-heading text-lg text-white/60 leading-relaxed max-w-3xl">
              A 1% AUM fee doesn't sound like much until you realize it devours nearly a third of your returns over 30 years. We replaced the rent-seeking model with a flat SaaS architecture, giving you direct access to <strong>fiduciary advisors who don't take a cut of your growth.</strong>
            </p>
          </div>

          <div className="narrative-block relative">
            <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-[#14151B] border-2 border-pink rounded-full shadow-[0_0_15px_#DF74B8]"></div>
            <h2 className="font-heading font-bold text-3xl text-white mb-4">The Interface Problem</h2>
            <p className="font-heading text-lg text-white/60 leading-relaxed max-w-3xl">
              Finance platforms look like spreadsheets from 1998 because their backend technology is from 1998. We built Prosper with modern UI engines, rendering complex data via WebGL to make tracking your portfolio feel like steering a spaceship.
            </p>
          </div>
        </div>

        <div className="stats-section grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          <div className="stat-card p-8 bg-surface border border-white/5 rounded-3xl text-center backdrop-blur-xl">
            <div className="font-drama text-5xl text-white mb-2 shadow-accent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">0%</div>
            <div className="font-heading text-sm text-white/50 tracking-wide uppercase">AUM Fees</div>
          </div>
          <div className="stat-card p-8 bg-surface border border-white/5 rounded-3xl text-center backdrop-blur-xl">
            <div className="font-drama text-5xl text-accent mb-2 drop-shadow-[0_0_10px_rgba(159,131,241,0.5)]">100%</div>
            <div className="font-heading text-sm text-white/50 tracking-wide uppercase">Fiduciary Standard</div>
          </div>
          <div className="stat-card p-8 bg-surface border border-white/5 rounded-3xl text-center backdrop-blur-xl">
            <div className="font-drama text-5xl text-cyan mb-2 drop-shadow-[0_0_10px_rgba(70,199,217,0.5)]">24/7</div>
            <div className="font-heading text-sm text-white/50 tracking-wide uppercase">AI Accessibility</div>
          </div>
        </div>
      </div>
    </div>
  );
}
