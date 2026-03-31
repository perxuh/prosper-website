import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageSquare, BarChart2, Activity, ShieldCheck, ArrowUpRight, Cpu, User, Brain, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// COMPONENTS
// -------------------------------------------------------------

function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        ref={navRef}
        className="flex items-center justify-between w-full max-w-5xl px-6 py-4 transition-all duration-500 rounded-full bg-transparent text-white border border-transparent [&.nav-scrolled]:bg-[#14151B]/80 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:shadow-sm [&.nav-scrolled]:shadow-black/50"
      >
        <div className="font-heading font-bold text-xl tracking-tight">Prosper</div>
        <div className="hidden md:flex gap-8 font-heading text-sm font-medium">
          <a href="#features" className="hover:-translate-y-[1px] transition-transform text-white/80 hover:text-white">Features</a>
          <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform text-white/80 hover:text-white">Philosophy</a>
          <a href="#protocol" className="hover:-translate-y-[1px] transition-transform text-white/80 hover:text-white">Protocol</a>
        </div>
        <button className="magnetic-btn bg-accent text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-[0_0_15px_rgba(159,131,241,0.5)]">
          <span className="btn-hover-layer bg-pink border border-transparent"></span>
          <span className="btn-content mix-blend-plus-lighter">Get Early Access</span>
        </button>
      </nav>
    </div>
  );
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x, y });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.parallax-card', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] w-full flex items-center justify-center pt-32 pb-24 overflow-hidden bg-transparent"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none"
        >
          <source src="/space_background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#14151B] via-[#14151B]/60 to-transparent pointer-events-none"></div>
      </div>

      {/* Layer 1 - Furthest back (Background Glows) */}
      <div 
        className="absolute inset-0 z-0 mix-blend-screen pointer-events-none"
        style={{
          transform: `translateX(${mousePos.x * -40}px) translateY(${mousePos.y * -40}px) translateZ(-100px)`,
          transition: "transform 0.3s ease-out"
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[400px] bg-accent/20 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[300px] bg-cyan/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Layer 2 - Middle (Floating Neon Geometry) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          transform: `translateX(${mousePos.x * -20}px) translateY(${mousePos.y * -20}px) translateZ(-50px)`,
          transition: "transform 0.2s ease-out"
        }}
      >
        <div className="absolute top-1/3 right-1/4 w-48 h-48 border border-accent/30 rounded-full rotate-12 blur-[2px]" />
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-pink/10 border border-pink/30 rounded-lg -rotate-12 blur-[1px]" />
      </div>

      {/* Content Layer */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 flex flex-col items-center justify-center h-full"
        style={{
          transform: `translateX(${mousePos.x * 10}px) translateY(${mousePos.y * 10}px) translateZ(50px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <div className="hero-content max-w-4xl space-y-6 flex flex-col items-center text-center">
            <h1 className="flex flex-col items-center gap-2 relative">
                <span className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-white tracking-tight leading-none drop-shadow-sm">
                  Your Financial Future,
                </span>
                <span className="font-drama italic text-6xl md:text-7xl lg:text-9xl text-accent leading-[0.9] drop-shadow-[0_0_30px_rgba(159,131,241,0.3)] pb-2 flex items-center justify-center">
                  Simplified.
                </span>
            </h1>
            <p className="text-white/70 font-heading text-lg md:text-2xl max-w-2xl font-light leading-relaxed mx-auto">
               Bridge the gap between expert human financial advisors and modern AI-powered education. Learn, grow, and build wealth at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <button className="magnetic-btn bg-accent shadow-[0_0_20px_rgba(159,131,241,0.5)] text-white px-8 py-4 rounded-[1.5rem] font-heading font-medium flex items-center justify-center gap-2 text-lg">
                  <span className="btn-hover-layer bg-cyan"></span>
                  <span className="btn-content mix-blend-plus-lighter flex items-center gap-2">Get Early Access <ArrowRight size={20} /></span>
                </button>
                <button className="magnetic-btn bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-[1.5rem] font-heading font-medium flex items-center justify-center gap-2 text-lg hover:border-white/30 transition-colors">
                  <span className="btn-hover-layer bg-white/5"></span>
                  <span className="btn-content flex items-center gap-2">Speak with an advisor <MessageSquare size={20} /></span>
                </button>
            </div>
            
            {/* Parallax Floating Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto w-full text-left">
              {[
                { 
                  title: "AI-Powered Education", 
                  desc: "Interactive chatbot guides you through complex financial concepts like Roth IRAs, 401ks, and portfolio building.",
                  icon: <Brain size={28} className="text-cyan mb-4 drop-shadow-[0_0_10px_rgba(70,199,217,0.5)]" />
                },
                { 
                  title: "Human Financial Advisors", 
                  desc: "Connect with certified financial advisors who understand your unique goals and provide personalized guidance.",
                  icon: <User size={28} className="text-accent mb-4 drop-shadow-[0_0_10px_rgba(159,131,241,0.5)]" />
                },
                { 
                  title: "Portfolio Tracking", 
                  desc: "Monitor your investments and track your financial growth with intuitive dashboards and analytics.",
                  icon: <TrendingUp size={28} className="text-[#4ADE80] mb-4 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="parallax-card p-8 rounded-[2rem] border border-white/5 bg-[#14151B]/50 backdrop-blur-xl hover:bg-surface hover:border-white/10 transition-colors shadow-2xl relative overflow-hidden group flex flex-col items-start"
                  style={{
                    transform: `translateZ(${30 + i * 20}px)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent blur-2xl group-hover:from-accent/40 transition-colors"></div>
                  {item.icon}
                  <div className="text-lg font-heading font-bold text-white mb-2 relative z-10 tracking-wide">{item.title}</div>
                  <div className="text-sm font-heading text-white/50 leading-relaxed relative z-10">{item.desc}</div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}

function AppWalkthrough() {
  const sectionRef = useRef(null);
  const phoneContainerRef = useRef(null);
  const phoneRef = useRef(null);
  const screenContentRef = useRef(null);
  const text1ContainerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(phoneRef.current, 
        { rotateX: 60, rotateY: -30, rotateZ: 20, scale: 0.7, y: 100 },
        { 
          rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, y: 0, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top top',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(text1ContainerRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top top',
            scrub: 1,
          }
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000',
          pin: true,
          scrub: 1,
        }
      });
      
      tl.to({}, { duration: 0.5 }); 
      tl.fromTo(text1Ref.current, { opacity: 1, y: 0 }, { opacity: 0, y: -20, duration: 0.3 }); 
      tl.to(screenContentRef.current, { y: '-33.33%', duration: 1, ease: 'power2.inOut' }, "<"); 
      tl.fromTo(text2Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.6"); 
      tl.to({}, { duration: 0.5 });
      tl.fromTo(text2Ref.current, { opacity: 1, y: 0 }, { opacity: 0, y: -20, duration: 0.3 });
      tl.to(screenContentRef.current, { y: '-66.66%', duration: 1, ease: 'power2.inOut' }, "<");
      tl.fromTo(text3Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.6");
      tl.to({}, { duration: 0.5 });
      
      // Dramatic Exit Animation
      tl.fromTo(text3Ref.current, { opacity: 1, y: 0 }, { opacity: 0, y: -40, duration: 0.3 }, `exit`);
      tl.to(phoneContainerRef.current, {
        rotateX: -45,
        rotateY: 15,
        scale: 0.8,
        y: -100,
        duration: 0.5,
        ease: 'power2.inOut'
      }, `exit`);
      tl.to(phoneContainerRef.current.children, {
        opacity: 0,
        boxShadow: 'none',
        duration: 0.5,
        ease: 'power2.inOut'
      }, `exit`);
      
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="app-walkthrough" className="h-screen w-full bg-transparent relative overflow-hidden flex items-center justify-center p-6 z-20 pt-24">
      
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 px-4 md:px-12">
        <div className="w-full md:w-1/2 relative h-64 md:h-96 flex items-center justify-center text-center md:text-left">
          <div ref={text1ContainerRef} className="absolute inset-x-0 opacity-0 translate-y-10">
            <div ref={text1Ref}>
              <h3 className="font-heading font-bold text-3xl text-white mb-4">Portfolio Tracking</h3>
              <p className="font-heading text-white/70 text-xl leading-relaxed">Comprehensive wealth tracking and investment management to stay on top of your financial future.</p>
            </div>
          </div>
          <div ref={text2Ref} className="absolute inset-x-0 opacity-0 translate-y-10">
            <h3 className="font-heading font-bold text-3xl text-white mb-4">AI-Powered Education</h3>
            <p className="font-heading text-white/70 text-xl leading-relaxed">Interactive chatbot guides you through complex financial concepts like Roth IRAs and 401ks.</p>
          </div>
          <div ref={text3Ref} className="absolute inset-x-0 opacity-0 translate-y-10">
            <h3 className="font-heading font-bold text-3xl text-white mb-4">Human Advisors</h3>
            <p className="font-heading text-white/70 text-xl leading-relaxed">Connect with certified financial advisors who provide personal guidance and actionable strategy.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center perspective-[2000px]">
          <div ref={phoneContainerRef} className="iphone-container relative">
            <div ref={phoneRef} className="iphone-body relative z-10 transition-shadow bg-[#1B1B22] border border-white/5 ring-4 ring-[#14151B] shadow-2xl shadow-black/50">
              <div className="iphone-dynamic-island shadow-md flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-cyan/80 ml-auto mr-4 shadow-[0_0_10px_#46C7D9]"></div>
              </div>
              <div className="iphone-screen bg-[#14151B] border-[4px] border-[#0A0A0D]">
                <div ref={screenContentRef} className="w-full h-[300%] flex flex-col pt-0 mix-blend-screen opacity-90 contrast-125">
                  <div className="h-1/3 w-full shrink-0 relative"><img src="/app_dashboard.png" className="absolute inset-0 w-full h-full object-cover" alt="Dashboard" /></div>
                  <div className="h-1/3 w-full shrink-0 relative"><img src="/app_education.png" className="absolute inset-0 w-full h-full object-cover" alt="Heatmap" /></div>
                  <div className="h-1/3 w-full shrink-0 relative"><img src="/app_advisor.png" className="absolute inset-0 w-full h-full object-cover" alt="Transfers" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, className }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;
    
    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      y: -16,
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
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div 
      ref={cardRef} 
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

function PricingTiers() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".pricing-header", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
      });
      gsap.from(".pricing-card-wrapper", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        y: 120, opacity: 0, stagger: 0.25, duration: 1.5, ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="pricing" className="py-32 px-6 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 pricing-header">
          <h2 className="font-heading font-bold text-4xl text-white">Subscription Tiers</h2>
          <p className="font-heading text-white/50 mt-4 text-lg">Choose the right plan for your financial journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center perspective-[2000px]">
          {/* Tier 1 */}
          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-10 bg-surface border border-white/5 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(86,185,235,0.1)] hover:border-cyan/30">
            <h3 className="font-heading font-bold text-2xl text-white mb-2">Basic</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-10">Automated tracking and insights.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-heading font-bold text-white">$0</span>
              <span className="text-lg text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 font-heading text-sm text-white/70">
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-cyan" /> Connect up to 3 accounts</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-cyan" /> Basic portfolio analytics</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-white/20" /> Standard support</li>
            </ul>
            <button className="magnetic-btn w-full py-4 rounded-[1.5rem] border border-white/10 text-white font-medium bg-primary group-hover:bg-cyan/10 group-hover:border-cyan/50 transition-colors duration-300 shadow-md">
              <span className="btn-content">Start Free</span>
            </button>
          </TiltCard>

          {/* Tier 2 */}
          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-12 bg-[#222330] border border-accent/40 text-white transition-shadow duration-500 relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 hover:shadow-[0_0_80px_rgba(159,131,241,0.2)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent via-[#B697F4] to-pink text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_5px_15px_rgba(159,131,241,0.5)] whitespace-nowrap">Most Popular</div>
            <h3 className="font-heading font-bold text-2xl mb-2">Pro</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-10">Advanced AI education and insights.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-heading font-bold">$19</span>
              <span className="text-lg text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 font-heading text-sm text-white/80">
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Unlimited linked accounts</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Personalized AI chatbot</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Priority email support</li>
            </ul>
            <button className="magnetic-btn w-full py-4 rounded-[1.5rem] bg-accent text-white font-medium shadow-[0_10px_30px_rgba(159,131,241,0.3)] group-hover:bg-pink transition-colors duration-300">
              <span className="btn-content">Go Pro</span>
            </button>
          </TiltCard>

          {/* Tier 3 */}
          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-10 bg-surface border border-white/5 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(223,116,184,0.1)] hover:border-pink/30">
            <h3 className="font-heading font-bold text-2xl text-white mb-2">Elite</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-10">Direct human advisor access.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-heading font-bold text-white">$99</span>
              <span className="text-lg text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 font-heading text-sm text-white/70">
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-pink" /> Everything in Pro</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-pink" /> 1 hour advisor sync monthly</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-pink" /> Dedicated human support</li>
            </ul>
            <button className="magnetic-btn w-full py-4 rounded-[1.5rem] border border-white/10 text-white font-medium bg-primary group-hover:bg-pink/10 group-hover:border-pink/50 transition-colors duration-300 shadow-md">
              <span className="btn-content">Contact Sales</span>
            </button>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-word', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 60%' },
        y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out'
      });
      gsap.to('.phil-bg', {
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        y: 100
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="relative py-40 px-6 bg-transparent overflow-hidden">
      <div className="absolute inset-0 z-0 bg-transparent">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2529&auto=format&fit=crop" 
          className="phil-bg w-full h-[120%] object-cover opacity-10 mix-blend-screen -top-[10%] relative"
          alt="Abstract dark texture" 
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="font-heading text-white/30 text-xl md:text-2xl mb-12 tracking-wide font-light overflow-hidden flex flex-wrap justify-center max-w-2xl px-4">
          <span className="inline-block phil-word">Most</span>
          <span className="inline-block phil-word">&nbsp;financial</span>
          <span className="inline-block phil-word">&nbsp;platforms</span>
          <span className="inline-block phil-word">&nbsp;focus</span>
          <span className="inline-block phil-word">&nbsp;on:</span>
          <span className="inline-block phil-word">&nbsp;fragmented</span>
          <span className="inline-block phil-word">&nbsp;tools</span>
          <span className="inline-block phil-word">&nbsp;and</span>
          <span className="inline-block phil-word">&nbsp;generic</span>
          <span className="inline-block phil-word">&nbsp;advice.</span>
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl leading-tight px-4">
          <span className="font-heading font-medium text-white block mb-4 glow-text">We focus on:</span>
          <span className="font-drama italic text-cyan font-semibold flex flex-wrap justify-center overflow-hidden leading-[1.1] pb-2 drop-shadow-[0_0_15px_rgba(70,199,217,0.5)]">
            <span className="inline-block phil-word">AI-driven</span>
            <span className="inline-block phil-word">&nbsp;clarity</span>
            <span className="inline-block phil-word">&nbsp;with</span>
            <span className="inline-block phil-word">&nbsp;expert</span>
            <span className="inline-block phil-word">&nbsp;guidance.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}

function Protocol() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 15%',
            endTrigger: '.protocol-wrapper',
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
            animation: gsap.to(card, { scale: 0.9, opacity: 0.5, filter: 'blur(20px)', ease: 'none' }),
            scrub: true
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="protocol-wrapper py-32 px-6 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-heading font-bold text-4xl text-white">The Protocol</h2>
          <p className="font-heading text-white/50 mt-4 text-lg">Systematic wealth management steps.</p>
        </div>
        
        <div className="space-y-24 pb-24">
          {/* Card 1 */}
          <div className="protocol-card bg-surface rounded-[3rem] p-8 md:p-12 lg:p-16 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center origin-top relative z-10">
             <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-48 h-48 animate-spin-slow" style={{ animationDuration: '20s' }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full text-cyan stroke-current" fill="none" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px rgba(70,199,217,0.5))' }}>
                    <circle cx="50" cy="50" r="40" strokeOpacity="0.2" />
                    <circle cx="50" cy="50" r="30" strokeDasharray="10 5" className="text-accent" />
                    <circle cx="50" cy="50" r="20" strokeOpacity="0.5" className="text-pink" />
                  </svg>
                </div>
             </div>
             <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                <span className="font-data text-cyan font-bold text-xl inline-block drop-shadow-[0_0_5px_#46C7D9]">01</span>
                <h3 className="font-heading font-bold text-3xl text-white">Portfolio Tracking</h3>
                <p className="font-heading text-white/50 text-lg leading-relaxed">Comprehensive wealth tracking and investment management to stay on top of your financial future.</p>
             </div>
          </div>

          {/* Card 2 */}
          <div className="protocol-card bg-[#1A1C25] rounded-[3rem] p-8 md:p-12 lg:p-16 border border-white/10 shadow-3xl flex flex-col md:flex-row gap-8 md:gap-12 items-center origin-top relative z-20">
             <div className="w-full md:w-1/2 flex justify-center overflow-hidden rounded-2xl bg-[#0D0E12] h-48 relative border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink/20 to-transparent opacity-50"></div>
                <div className="absolute top-0 bottom-0 w-[2px] bg-pink shadow-[0_0_15px_#DF74B8] animate-scan" style={{ left: '0%' }}></div>
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <Cpu size={64} className="opacity-50" />
                </div>
             </div>
             <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                <span className="font-data text-pink font-bold text-xl inline-block drop-shadow-[0_0_5px_#DF74B8]">02</span>
                <h3 className="font-heading font-bold text-3xl text-white">AI-Powered Education</h3>
                <p className="font-heading text-white/50 text-lg leading-relaxed">Interactive chatbot guides you through complex financial concepts like Roth IRAs and 401ks.</p>
             </div>
          </div>

          {/* Card 3 */}
          <div className="protocol-card bg-surface rounded-[3rem] p-8 md:p-12 lg:p-16 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center origin-top relative z-30">
             <div className="w-full md:w-1/2 flex justify-center">
                <svg viewBox="0 0 200 100" className="w-full max-w-[200px]" fill="none" stroke="#A47DF6" strokeWidth="4" style={{ filter: 'drop-shadow(0 0 10px rgba(159,131,241,0.5))' }}>
                  <path d="M0,50 L40,50 L50,10 L70,90 L90,30 L100,50 L200,50" className="animate-draw" strokeDasharray="300" strokeDashoffset="0" />
                </svg>
             </div>
             <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                <span className="font-data text-accent font-bold text-xl inline-block drop-shadow-[0_0_5px_#A47DF6]">03</span>
                <h3 className="font-heading font-bold text-3xl text-white">Human Advisors</h3>
                <p className="font-heading text-white/50 text-lg leading-relaxed">Connect with certified financial advisors who provide personal guidance and actionable strategy.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Membership() {
  return (
    <section id="membership" className="py-32 px-6 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl text-white">Begin the journey.</h2>
        </div>
        <div className="max-w-md mx-auto bg-[#1A1C25] rounded-[3rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center text-cyan mb-6 shadow-[inset_0_0_15px_rgba(70,199,217,0.2)]">
            <User size={32} />
          </div>
          <h3 className="font-heading font-bold text-2xl text-white mb-2">Early Access</h3>
          <p className="font-heading text-white/50 mb-8 max-w-sm">Join an exclusive cohort accessing the future of financial clarity.</p>
          <button className="magnetic-btn w-full bg-cyan text-primary py-4 rounded-[1.5rem] font-heading font-bold text-lg mb-4 shadow-[0_5px_20px_rgba(70,199,217,0.4)] hover:bg-white transition-colors">
            <span className="btn-hover-layer bg-white"></span>
            <span className="btn-content">Get Early Access</span>
          </button>
          <button className="text-sm font-heading text-white/40 hover:text-white transition-colors underline underline-offset-4">
            Or speak with an advisor
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D0E12] pt-24 pb-12 px-6 rounded-t-[4rem] relative z-40 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-6 max-w-sm text-center md:text-left mx-auto md:mx-0">
          <div className="font-heading font-bold text-2xl text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
             <div className="w-8 h-8 bg-gradient-to-tr from-accent to-cyan rounded-full"></div>
             Prosper
          </div>
          <p className="font-heading text-white/40 text-sm leading-relaxed">
            Bridge the gap between expert human financial advisors and modern AI-powered education. Learn, grow, and build wealth at your own pace.
          </p>
        </div>
        <div className="flex gap-16 justify-center md:justify-end">
          <div className="space-y-4">
            <h4 className="font-data text-accent text-xs tracking-widest uppercase font-bold">Platform</h4>
            <div className="flex flex-col gap-3 font-heading text-sm text-white/60">
              <a href="#features" className="hover:text-cyan transition-colors">Features</a>
              <a href="#protocol" className="hover:text-cyan transition-colors">Protocol</a>
              <a href="#" className="hover:text-cyan transition-colors">Advisors</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-data text-accent text-xs tracking-widest uppercase font-bold">Legal</h4>
            <div className="flex flex-col gap-3 font-heading text-sm text-white/60">
              <a href="#" className="hover:text-pink transition-colors">Privacy</a>
              <a href="#" className="hover:text-pink transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-heading text-white/30 text-sm">© {new Date().getFullYear()} Prosper Financial.</p>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]"></div>
          <span className="font-data text-white/60 text-xs tracking-wide">System Operational</span>
        </div>
      </div>
    </footer>
  );
}

function Noise() {
  return (
    <svg className="noise-overlay">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}

export default function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Define a harmonious dark palette progression tailored to the neon dashboard
      const colors = ["#14151B", "#1A1B23", "#1E1F29", "#14151B", "#181A22", "#14151B", "#0D0E12"];
      const sections = ['#app-walkthrough', '#pricing', '#philosophy', '#protocol', '#membership'];
      
      sections.forEach((id, i) => {
        const targetColor = colors[i + 1];
        gsap.to(mainRef.current, {
          backgroundColor: targetColor,
          ease: "none",
          scrollTrigger: {
            trigger: id,
            start: "top bottom",
            end: "top 30%",
            scrub: true
          }
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen relative selection:bg-pink selection:text-white" style={{ backgroundColor: '#14151B' }}>
      <Noise />
      <Navbar />
      <Hero />
      <AppWalkthrough />
      <PricingTiers />
      <Philosophy />
      <Protocol />
      <Membership />
      <Footer />
    </div>
  );
}
