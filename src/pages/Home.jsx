import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Brain, User, TrendingUp } from 'lucide-react';
import CircularTestimonials from '../components/ui/circular-testimonials';
import AboutUsSection from '../components/ui/about-us-section';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import ShaderBackground from '../components/ui/shader-background';

gsap.registerPlugin(ScrollTrigger);

const SPLINE_SCENE_URL =
  'https://prod.spline.design/OyzN7pTHWpgWXmEy/scene.splinecode';

const Spline = lazy(() => import('@splinetool/react-spline'));

/** Non-interactive embed: no orbit / zoom / scroll hijack on the canvas. */
function lockSplineScene(app) {
  const c = app?.controls;
  if (c && typeof c.enabled === 'boolean') c.enabled = false;
  if (typeof app?.setZoom === 'function') {
    app.setZoom(0.84);
  }
}

function Hero({ onOpenWaitlist }) {
  const navigate = useNavigate();
  const isTouchDevice = useRef(false);
  const containerRef = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const rafRef = useRef(null);
  const lastMouseEvent = useRef(null);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice.current) return;
    lastMouseEvent.current = e;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const ev = lastMouseEvent.current;
      if (!containerRef.current || !ev) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (ev.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (ev.clientY - rect.top - rect.height / 2) / rect.height;
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateX(${x * -20}px) translateY(${y * -20}px)`;
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateX(${x * 10}px) translateY(${y * 10}px)`;
      }
    });
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
      className="relative w-full flex flex-col items-center pt-28 pb-10 md:pb-16 overflow-hidden bg-[#14151B] min-h-[100dvh]"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <ShaderBackground />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#14151B] via-[#14151B]/45 to-[#14151B]/10 pointer-events-none" aria-hidden />

      {/* Static ambient glow — no willChange, no transform, no mix-blend-mode */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[300px] bg-accent/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[200px] bg-cyan/8 rounded-full blur-[100px]" />
      </div>

      <div
        ref={layer2Ref}
        className="absolute inset-0 z-0 opacity-25 pointer-events-none"
        style={{ transition: "transform 0.2s ease-out", willChange: 'transform' }}
      >
        <div className="absolute top-1/3 right-1/4 w-48 h-48 border border-accent/30 rounded-full rotate-12 blur-[2px]" />
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-pink/10 border border-pink/30 rounded-lg -rotate-12 blur-[1px]" />
      </div>

      <div
        ref={layer3Ref}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-10 md:pb-12 flex flex-col items-center"
        style={{ transition: "transform 0.1s ease-out", willChange: 'transform' }}
      >
        <div className="hero-content max-w-4xl space-y-6 flex flex-col items-center text-center">
            <h1 className="flex flex-col items-center gap-2 relative max-w-4xl mx-auto">
                <span className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none drop-shadow-sm">
                  Build Wealth
                </span>
                <span className="font-drama italic text-4xl md:text-6xl lg:text-8xl text-accent leading-[0.9] drop-shadow-[0_0_30px_rgba(159,131,241,0.3)] pb-2 flex items-center justify-center text-center">
                  From Your Pocket.
                </span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 pt-8 md:pt-16 max-w-4xl mx-auto w-full text-left">
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
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent blur-2xl group-hover:from-accent/40 transition-colors duration-500"></div>
                  
                  <div className="flex items-center gap-4 mb-1">
                    {item.icon}
                    <div className="text-lg font-heading font-bold text-white relative z-10 tracking-wide">{item.title}</div>
                  </div>
                  <div className="text-sm font-heading text-white/60 leading-relaxed relative z-10 pt-3 pb-1 border-t border-white/5 mt-3 w-full">
                    {item.desc}
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
  const [splineReady, setSplineReady] = useState(false);

  // Only mount the Spline scene once the section is near the viewport.
  // This prevents the heavy scene file from competing with the hero Spline on load.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSplineReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.walkthrough-intro', {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      gsap.from('.walkthrough-benefit-item', {
        x: -16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
        },
      });
      gsap.from('.walkthrough-cta', {
        y: 18,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
        },
      });
      gsap.from('.walkthrough-spline-wrap', {
        y: 32,
        opacity: 0,
        duration: 0.95,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="app-walkthrough"
      className="w-full px-6 pt-6 pb-12 md:pt-14 md:pb-16 bg-transparent relative z-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#14151B]/40 to-transparent opacity-80" aria-hidden />
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row md:items-stretch gap-10 md:gap-12 lg:gap-16 relative">
        <div className="md:w-[42%] lg:w-[38%] flex flex-col md:justify-center text-left">
          <div className="walkthrough-intro text-center md:text-left">
            <div className="inline-block text-[#9F83F1] text-xs uppercase tracking-widest font-bold mb-3 bg-[#9F83F1]/10 px-3 py-1 rounded-full border border-[#9F83F1]/20">
              Inside the App
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight leading-snug">
              Built With Advisors.{' '}
              <span className="text-accent">Designed For You.</span>
            </h2>
            <p className="mt-3 font-heading text-white/50 text-sm md:text-base max-w-md mx-auto md:mx-0 leading-relaxed">
              See your real retirement outlook instantly and move forward with a clearer understanding of where you stand today and what steps can help you build long term wealth.
            </p>
          </div>

          <ul className="walkthrough-benefits mt-6 space-y-3.5 font-heading text-sm md:text-base text-white/65 max-w-md mx-auto md:mx-0 leading-relaxed list-none text-left">
            {[
              'See where you stand for retirement in seconds',
              'Follow strategies built by real fiduciary advisors',
              'Track all your investments in one place',
              'Understand your finances with your AI assistant',
              'Know what to do next with a clearer plan',
            ].map((line, i) => (
              <li
                key={i}
                className="walkthrough-benefit-item group flex gap-3.5 items-start"
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-accent shadow-[0_0_20px_rgba(159,131,241,0.12)] transition-all duration-300 group-hover:border-accent/35 group-hover:bg-accent/10 group-hover:text-cyan group-hover:shadow-[0_0_24px_rgba(70,199,217,0.2)]"
                  aria-hidden
                >
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="pt-1">{line}</span>
              </li>
            ))}
          </ul>

          <div className="walkthrough-cta mt-8 flex justify-center md:justify-start">
            <LiquidButton
              colorMode="purple"
              className="w-full sm:w-auto"
              onClick={() => navigate('/features')}
            >
              Explore all features <ArrowRight size={18} />
            </LiquidButton>
          </div>
        </div>

        <div className="md:flex-1 min-h-[min(62vh,540px)] h-[min(62vh,540px)] md:h-auto md:min-h-[min(88vh,800px)] relative overflow-visible bg-transparent walkthrough-spline-wrap pointer-events-none select-none py-2 md:py-3">
          {splineReady && (
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                  <div className="h-10 w-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin" aria-hidden />
                  <span className="sr-only">Loading 3D scene</span>
                </div>
              }
            >
              <Spline
                scene={SPLINE_SCENE_URL}
                onLoad={lockSplineScene}
                className="!absolute inset-0 w-full h-full pointer-events-none"
                style={{ background: 'transparent' }}
              />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, className }) {
  const cardRef = useRef(null);
  const isTouchDevice = useRef(false);
  const rafRef = useRef(null);
  const lastMouseEvent = useRef(null);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isTouchDevice.current) return;
    lastMouseEvent.current = e;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const ev = lastMouseEvent.current;
      if (!cardRef.current || !ev) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      gsap.to(cardRef.current, {
        rotateX: ((y - centerY) / centerY) * -12,
        rotateY: ((x - centerX) / centerX) * 12,
        y: -16,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
        overwrite: 'auto',
      });
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isTouchDevice.current) return;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
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
      gsap.from('.pricing-header', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 82%' },
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
      });
      gsap.from('.pricing-card-wrapper', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
        y: 48,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="pricing" className="py-14 md:py-24 px-6 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 pricing-header">
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
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
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
    <section
      id="testimonials"
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center -mt-2 md:-mt-4 pb-10 pt-6 md:pb-14 md:pt-10 px-6 lg:px-24 bg-transparent z-10 overflow-hidden transform-gpu"
    >
      <div className="text-center mb-8 md:mb-12 relative z-20">
        <h2 className="font-heading text-white text-4xl md:text-6xl font-bold tracking-tight leading-snug">
          Real People.{' '}
          <span className="text-accent">Real Results.</span>
        </h2>
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
