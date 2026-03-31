import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageSquare, Brain, User, TrendingUp } from 'lucide-react';
import CircularTestimonials from '../components/ui/circular-testimonials';
import AboutUsSection from '../components/ui/about-us-section';
import { LiquidButton } from '../components/ui/liquid-glass-button';

gsap.registerPlugin(ScrollTrigger);

function Hero({ onOpenWaitlist }) {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force GSAP to recalculate pin positions after the card expansion finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 550);
    return () => clearTimeout(timer);
  }, [isScrolled]);

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
      {/* Static Over-sized Video Canvas to prevent object-cover resize artifacts */}
      <div className="absolute top-0 left-0 w-full h-[150vh] z-0 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="none"
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source src="/space_background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dynamic Gradient Overlay glued exactly to Hero bounds for seamless transition */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#14151B] via-[#14151B]/60 to-transparent pointer-events-none"></div>

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
              Learn faster, track everything in one place, and grow your portfolio with real financial advisors and smart AI guiding every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <LiquidButton colorMode="purple">
                  <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current mr-1" aria-hidden="true">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  Download on the App Store
                </LiquidButton>
                <LiquidButton colorMode="purple">
                  <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current mr-1" aria-hidden="true">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  Get it on Google Play
                </LiquidButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto w-full text-left">
              {[
                { 
                  title: "AI Education", 
                  desc: "Clear guidance when you need it. Prosper’s AI walks you through retirement accounts, investing basics, and wealth building strategies step by step so you always understand what comes next.",
                  icon: <Brain size={24} className="text-cyan drop-shadow-[0_0_10px_rgba(70,199,217,0.5)]" />,
                  hash: "ai-education"
                },
                { 
                  title: "Human Advisors", 
                  desc: "Real advisors. Real conversations. Connect with experienced professionals who help translate education into decisions aligned with your goals and timeline.",
                  icon: <User size={24} className="text-accent drop-shadow-[0_0_10px_rgba(159,131,241,0.5)]" />,
                  hash: "human-advisors"
                },
                { 
                  title: "Track Portfolio", 
                  desc: "See everything in one place. Track accounts, performance, and progress toward retirement with dashboards built for clarity and confidence.",
                  icon: <TrendingUp size={24} className="text-[#4ADE80] drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />,
                  hash: "portfolio-tracking"
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  onClick={() => navigate(`/features#${item.hash}`)}
                  className="parallax-card cursor-pointer p-6 md:p-8 rounded-[2rem] border border-white/5 bg-[#14151B]/50 backdrop-blur-xl hover:bg-surface hover:border-white/10 transition-colors shadow-2xl relative overflow-hidden group flex flex-col items-start"
                  style={{
                    transform: `translateZ(${30 + i * 20}px)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent blur-2xl group-hover:from-accent/40 transition-colors duration-500"></div>
                  
                  <div className="flex items-center gap-4 mb-1">
                    {item.icon}
                    <div className="text-lg font-heading font-bold text-white relative z-10 tracking-wide">{item.title}</div>
                  </div>
                  
                  {/* Smooth height expansion via CSS Grid */}
                  <div className={`grid ${isScrolled ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] group-hover:grid-rows-[1fr]'} transition-[grid-template-rows] duration-500 ease-out w-full`}>
                    <div className="overflow-hidden">
                      <div className="text-sm font-heading text-white/60 leading-relaxed relative z-10 pt-3 pb-1 border-t border-white/5 mt-3">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}

function AppWalkthrough() {
  const navigate = useNavigate();
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
        { autoAlpha: 0, y: 20 },
        { 
          autoAlpha: 1, y: 0, 
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
          anticipatePin: 1,
        }
      });
      
      tl.to({}, { duration: 0.5 }); 
      tl.fromTo(text1Ref.current, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -20, duration: 0.3 }); 
      tl.to(screenContentRef.current, { y: '-33.33%', duration: 1, ease: 'power2.inOut' }, "<"); 
      tl.fromTo(text2Ref.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.6"); 
      tl.to({}, { duration: 0.5 });
      tl.fromTo(text2Ref.current, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -20, duration: 0.3 });
      tl.to(screenContentRef.current, { y: '-66.66%', duration: 1, ease: 'power2.inOut' }, "<");
      tl.fromTo(text3Ref.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.6");
      tl.to({}, { duration: 0.5 });
      
      tl.fromTo(text3Ref.current, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, duration: 0.3 }, `exit`);
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
            <div ref={text1Ref} className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="font-heading font-bold text-3xl text-white mb-4">Dashboard</h3>
              <p className="font-heading text-white/70 text-xl leading-relaxed mb-8">Understand your financial position instantly. Visual tools help you monitor growth, transfers, and account activity without complexity.</p>
              <LiquidButton colorMode="purple" onClick={() => navigate('/features#portfolio-tracking')}>
                Learn More <ArrowRight size={20} />
              </LiquidButton>
            </div>
          </div>
          <div ref={text2Ref} className="absolute inset-x-0 opacity-0 translate-y-10 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-heading font-bold text-3xl text-white mb-4">AI Powered Education</h3>
            <p className="font-heading text-white/70 text-xl leading-relaxed mb-8">Ask questions anytime. Get simple answers about Roth IRAs, 401ks, diversification, and long term investing without needing prior experience.</p>
            <LiquidButton colorMode="purple" onClick={() => navigate('/features#ai-education')}>
              Learn More <ArrowRight size={20} />
            </LiquidButton>
          </div>
          <div ref={text3Ref} className="absolute inset-x-0 opacity-0 translate-y-10 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-heading font-bold text-3xl text-white mb-4">Human Advisors</h3>
            <p className="font-heading text-white/70 text-xl leading-relaxed mb-8">Move from learning to action with guidance from professionals who help you make informed financial decisions with structure and direction.</p>
            <LiquidButton colorMode="purple" onClick={() => navigate('/features#human-advisors')}>
              Learn More <ArrowRight size={20} />
            </LiquidButton>
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

function PricingTiers({ onOpenWaitlist }) {
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
          <p className="font-heading text-white/50 mt-4 text-lg">Choose the right level of support for your financial journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center perspective-[2000px]">
          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-10 bg-surface border border-white/5 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(86,185,235,0.1)] hover:border-cyan/30">
            <h3 className="font-heading font-bold text-2xl text-white mb-2">Basic Plan</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-10">Start organizing your finances</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-heading font-bold text-white">$0</span>
              <span className="text-lg text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 font-heading text-sm text-white/70">
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-cyan" /> Connect up to 3 accounts</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-cyan" /> Track portfolio performance</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-white/20" /> Access core financial dashboards</li>
            </ul>
            <LiquidButton colorMode="dark" className="w-full" onClick={onOpenWaitlist}>
              Start Free
            </LiquidButton>
          </TiltCard>

          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-12 bg-[#222330] border border-accent/40 text-white transition-shadow duration-500 relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 hover:shadow-[0_0_80px_rgba(159,131,241,0.2)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent via-[#B697F4] to-pink text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_5px_15px_rgba(159,131,241,0.5)] whitespace-nowrap">Most Popular</div>
            <h3 className="font-heading font-bold text-2xl mb-2">Pro Plan</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-10">Smarter education and deeper insights</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-heading font-bold">$19</span>
              <span className="text-lg text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 font-heading text-sm text-white/80">
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Unlimited linked accounts</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Personalized AI education assistant</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Priority support access</li>
            </ul>
            <LiquidButton colorMode="purple" className="w-full" onClick={onOpenWaitlist}>
              Go Pro
            </LiquidButton>
          </TiltCard>

          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-10 bg-surface border border-white/5 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(223,116,184,0.1)] hover:border-pink/30">
            <h3 className="font-heading font-bold text-2xl text-white mb-2">Elite Plan</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-10">Advisor supported financial planning</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-heading font-bold text-white">$99</span>
              <span className="text-lg text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 font-heading text-sm text-white/70">
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-pink" /> Everything in Pro</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-pink" /> Monthly advisor strategy session</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-pink" /> Direct support from financial professionals</li>
            </ul>
            <LiquidButton colorMode="pink" className="w-full" onClick={onOpenWaitlist}>
              Contact Sales
            </LiquidButton>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: 150,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", 
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "Prosper helped me finally understand how my accounts connect to my long term plan. The education is clear and the advisor support makes it easier to take action with confidence.",
      name: "Tamar Mendelson",
      designation: "Member",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1588&auto=format&fit=crop"
    },
    {
      quote: "I've tried other platforms, but nothing bridges the gap quite like Prosper. The automated portfolio tracking paired with real human insights gives me a level of clarity I've never had before.",
      name: "Michael Chang",
      designation: "Early Adopter",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1587&auto=format&fit=crop"
    },
    {
      quote: "The ability to learn about complex topics like tax strategies and immediately discuss them with a vetted professional is a game-changer. I finally feel completely in control of my wealth.",
      name: "Jessica Albright",
      designation: "Premium Member",
      src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1587&auto=format&fit=crop"
    }
  ];

  return (
    <section id="testimonials" ref={containerRef} className="relative w-full flex flex-col items-center justify-center -mt-24 md:-mt-48 pb-12 pt-12 px-6 lg:px-24 bg-transparent z-10 overflow-hidden transform-gpu">
      <div className="text-center mb-16 relative z-20">
        <h2 className="font-heading text-white text-5xl md:text-6xl font-bold tracking-tight">Member Experience</h2>
      </div>
      <CircularTestimonials
        testimonials={testimonials}
        autoplay={true}
        colors={{
          name: "#ffffff",
          designation: "#46C7D9",
          testimony: "rgba(255, 255, 255, 0.8)",
          arrowBackground: "rgba(255, 255, 255, 0.05)",
          arrowForeground: "#ffffff",
          arrowHoverBackground: "#9F83F1",
        }}
        fontSizes={{
          name: "2rem",
          designation: "1rem",
          quote: "1.5rem",
        }}
      />
    </section>
  );
}

export default function Home() {
  const { onOpenWaitlist } = useOutletContext() || {};
  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Give layout time to shift into place before scrolling
    }
  }, [location]);

  useEffect(() => {
    // Removed GSAP background color animation to maintain a consistent dark background
  }, []);

  return (
    <div ref={mainRef} className="relative bg-transparent">
      <Helmet>
        <title>Prosper | Build Wealth With Structure</title>
        <meta name="description" content="Prosper is a financial education and wealth building platform combining AI-guided learning with real fiduciary advisors. Learn investing, track your portfolio, and grow your wealth with confidence." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/" />
      </Helmet>
      <Hero onOpenWaitlist={onOpenWaitlist} />
      <AppWalkthrough />
      <Testimonials />
      <AboutUsSection />
      <PricingTiers onOpenWaitlist={onOpenWaitlist} />
    </div>
  );
}
