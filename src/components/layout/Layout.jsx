import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiquidButton } from '../ui/liquid-glass-button';
import { WaitlistModal } from '../ui/waitlist-modal';

gsap.registerPlugin(ScrollTrigger);

function Navbar({ onOpenWaitlist }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <>
      <svg className="absolute w-0 h-0 hidden" aria-hidden="true" style={{ pointerEvents: 'none', position: 'absolute' }}>
        <defs>
          <filter id="nav-glass" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" seed="3" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
            <feComposite in="finalBlur" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="flex items-center justify-between w-full max-w-5xl px-6 py-4 rounded-full text-white relative isolate">
          {/* Liquid Glass Background Layers */}
          <div 
            className={`absolute inset-0 -z-20 rounded-[inherit] transition-all duration-500 origin-center border transition-colors border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05),inset_3px_3px_2px_-2px_rgba(255,255,255,0.1),inset_0_0_15px_10px_rgba(255,255,255,0.02)] bg-[#1A1C25]/80 ${isScrolled ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`} 
          />
          <div
            className={`absolute inset-0 -z-10 overflow-hidden rounded-[inherit] transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ backdropFilter: 'url("#nav-glass")', WebkitBackdropFilter: 'url("#nav-glass")' }}
          />

          <Link to="/" className="relative z-10 font-heading font-bold text-xl tracking-tight">Prosper</Link>
          <div className="relative z-10 hidden md:flex gap-8 font-heading text-sm font-medium">
            <Link to="/" className={`hover:-translate-y-[1px] transition-transform ${location.pathname==='/' ? 'text-white' : 'text-white/80 hover:text-white'}`}>Home</Link>
            <Link to="/features" className={`hover:-translate-y-[1px] transition-transform ${location.pathname==='/features' ? 'text-white' : 'text-white/80 hover:text-white'}`}>Features</Link>
            <Link to="/about" className={`hover:-translate-y-[1px] transition-transform ${location.pathname==='/about' ? 'text-white' : 'text-white/80 hover:text-white'}`}>About Us</Link>
            <Link to="/why-us" className={`hover:-translate-y-[1px] transition-transform ${location.pathname==='/why-us' ? 'text-white' : 'text-white/80 hover:text-white'}`}>Why Us?</Link>
            <Link to="/faq" className={`hover:-translate-y-[1px] transition-transform ${location.pathname==='/faq' ? 'text-white' : 'text-white/80 hover:text-white'}`}>FAQ</Link>
          </div>
          <div className="relative z-10">
            <LiquidButton colorMode="purple" size="sm" onClick={onOpenWaitlist}>
              Get Early Access
            </LiquidButton>
          </div>
        </nav>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D0E12] pt-24 pb-12 px-6 rounded-t-[4rem] relative z-40 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-6 max-w-sm text-center md:text-left mx-auto md:mx-0">
          <Link to="/" className="font-heading font-bold text-2xl text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
             <div className="w-8 h-8 bg-gradient-to-tr from-accent to-cyan rounded-full"></div>
             Prosper
          </Link>
          <p className="font-heading text-white/40 text-sm leading-relaxed">
            Bridge the gap between intelligent financial education and real advisor guidance. Learn faster. Track everything clearly. Build wealth with structure and confidence. 📊💬📈
          </p>
        </div>
        <div className="flex gap-16 justify-center md:justify-end">
          <div className="space-y-4">
            <h4 className="font-data text-accent text-xs tracking-widest uppercase font-bold">Platform</h4>
            <div className="flex flex-col gap-3 font-heading text-sm text-white/60">
              <Link to="/features" className="hover:text-cyan transition-colors">Features</Link>
              <a href="#protocol" className="hover:text-cyan transition-colors">Protocol</a>
              <Link to="/about" className="hover:text-cyan transition-colors">Advisors</Link>
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
    <svg className="noise-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.05,
      mixBlendMode: 'overlay'
    }}>
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}

export default function Layout() {
  const [isWaitlistOpen, setWaitlistOpen] = useState(false);
  const handleOpenWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-pink selection:text-white bg-[#14151B]">
      <Noise />
      <Navbar onOpenWaitlist={handleOpenWaitlist} />
      
      {/* We use an id so that GSAP color triggers can target main */}
      <main id="main-layout" className="flex-grow w-full">
        <Outlet context={{ onOpenWaitlist: handleOpenWaitlist }} />
      </main>

      <Footer />
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setWaitlistOpen(false)} 
      />
    </div>
  );
}
