import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiquidButton } from '../ui/liquid-glass-button';
import { WaitlistModal } from '../ui/waitlist-modal';
import { X, Menu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Navbar({ onOpenWaitlist }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/features', label: 'Features' },
    { to: '/about', label: 'About Us' },
    { to: '/why-us', label: 'Why Us?' },
    { to: '/faq', label: 'FAQ' },
  ];

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
            className={`absolute inset-0 -z-20 rounded-[inherit] transition-all duration-500 origin-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05),inset_3px_3px_2px_-2px_rgba(255,255,255,0.1),inset_0_0_15px_10px_rgba(255,255,255,0.02)] bg-[#0f1219]/80 ${isScrolled ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
          />
          <div
            className={`absolute inset-0 -z-10 overflow-hidden rounded-[inherit] transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ 
              backdropFilter: isMobile ? 'blur(16px)' : 'url("#nav-glass")', 
              WebkitBackdropFilter: isMobile ? 'blur(16px)' : 'url("#nav-glass")',
              backgroundColor: isMobile ? 'rgba(10, 13, 20, 0.4)' : 'transparent',
              willChange: 'backdrop-filter'
            }}
          />

          <Link to="/" className="relative z-10 font-heading font-bold text-xl tracking-tight">PRO$PER</Link>

          {/* Desktop nav links */}
          <div className="relative z-10 hidden md:flex gap-8 font-heading text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:-translate-y-[1px] transition-transform ${location.pathname === link.to ? 'text-white' : 'text-white/80 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="relative z-10 hidden md:block">
            <LiquidButton colorMode="purple" size="sm" onClick={onOpenWaitlist}>
              Get Early Access
            </LiquidButton>
          </div>

          {/* Mobile: hamburger button */}
          <button
            className="relative z-10 md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`fixed inset-x-0 top-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="mx-4 mt-24 rounded-3xl bg-[#0f1219]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-heading text-lg font-medium py-3 px-4 rounded-2xl transition-colors ${
                  location.pathname === link.to
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10">
              <button
                onClick={() => { setMenuOpen(false); onOpenWaitlist(); }}
                className="w-full py-3 px-6 rounded-2xl font-heading font-semibold text-white bg-accent shadow-[0_0_20px_rgba(43,43,170,0.3)] hover:shadow-[0_0_30px_rgba(43,43,170,0.5)] transition-all"
              >
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D0E12] pt-24 pb-12 px-6 rounded-t-[4rem] relative z-40 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-6 max-w-sm text-center md:text-left mx-auto md:mx-0">
          <Link to="/" className="font-heading font-bold text-2xl text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
             <div className="w-8 h-8 bg-accent rounded-full"></div>
             PRO$PER
          </Link>
          <p className="font-heading text-white/40 text-sm leading-relaxed">
            Bridge the gap between intelligent financial education and real advisor guidance. Learn faster. Track everything clearly. Build wealth with structure and confidence. 📊💬📈
          </p>
        </div>
        <div className="flex gap-8 md:gap-16 justify-center md:justify-end">
          <div className="space-y-4">
            <h4 className="font-data text-accent text-xs tracking-widest uppercase font-bold">Platform</h4>
            <div className="flex flex-col gap-3 font-heading text-sm text-white/60">
              <Link to="/features" className="hover:text-white transition-colors">Features</Link>
              <Link to="/about" className="hover:text-white transition-colors">Advisors</Link>
              <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-data text-accent text-xs tracking-widest uppercase font-bold">Legal</h4>
            <div className="flex flex-col gap-3 font-heading text-sm text-white/60">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-heading text-white/30 text-sm">© {new Date().getFullYear()} PRO$PER Financial.</p>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]"></div>
          <span className="font-data text-white/60 text-xs tracking-wide">System Operational</span>
        </div>
      </div>
    </footer>
  );
}

function Noise() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

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
      mixBlendMode: 'overlay',
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
    <div className="min-h-screen relative flex flex-col selection:bg-accent selection:text-white bg-[#0a0d14] overflow-x-hidden">
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
