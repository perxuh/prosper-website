import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import AboutUsSection from '../components/ui/about-us-section';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import IonaSection from '../components/ui/IonaSection';

gsap.registerPlugin(ScrollTrigger);

const LEARN_LEFT = [
  {
    id: 'videos',
    title: 'Video Lessons',
    desc: 'Expert-led breakdowns on investing, budgeting, and building long-term wealth.',
    svgPath: 'M5 3l14 9-14 9V3z',
  },
  {
    id: 'articles',
    title: 'Articles',
    desc: 'Advisor-reviewed reads on everything from ETFs to estate planning strategies.',
    svgPath: 'M9 12h6m-6 4h6M7 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-6-6z',
  },
  {
    id: 'quiz',
    title: 'Quizzes',
    desc: 'Adaptive quizzes that reinforce key financial concepts as you level up.',
    svgPath: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01',
  },
];

const LEARN_RIGHT = [
  {
    id: 'audios',
    title: 'Audio Guides',
    desc: 'Financial podcasts and audio series — learn on the go, hands-free.',
    svgPath: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z',
  },
  {
    id: 'blog',
    title: 'Blog',
    desc: 'Fresh market insights and strategy commentary, updated every day.',
    svgPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  },
  {
    id: 'news',
    title: 'Live News',
    desc: 'Real-time financial headlines curated and filtered just for you.',
    svgPath: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  },
];

function LearnPhoneMockup() {
  const APP_BG = '#F2F3F7';
  const BLUE = '#2B2BAA';
  const TEXT = '#111122';

  const gridModules = [
    { label: 'Videos',   path: 'M5 3l14 9-14 9V3z' },
    { label: 'Audios',   path: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
    { label: 'Articles', path: 'M9 12h6m-6 4h6M5 8h14M5 4h14' },
    { label: 'Blog',     path: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5' },
    { label: 'Quiz',     path: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01' },
    { label: 'News',     path: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  ];

  const tabs = [
    { label: 'Home',      path: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { label: 'Portfolio', path: 'M22 12H18L15 21 9 3 6 12H2' },
    { label: 'Chat',      path: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
    { label: 'Learn',     path: 'M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z' },
    { label: 'Profile',   path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z' },
  ];

  return (
    <div style={{
      width: 260, height: 540,
      borderRadius: 44,
      border: '10px solid #1a1a2e',
      background: APP_BG,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
      flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 80, height: 24, background: '#1a1a2e', borderRadius: 12, zIndex: 10 }} />
      <div style={{ position: 'absolute', inset: 0, background: APP_BG, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, system-ui, sans-serif' }}>
        <div style={{ paddingTop: 46, paddingLeft: 14, paddingRight: 14, paddingBottom: 8, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill={BLUE} />
              <rect x="5" y="16" width="4" height="7" rx="1" fill="white" />
              <rect x="11" y="11" width="4" height="12" rx="1" fill="white" />
              <rect x="17" y="6" width="4" height="17" rx="1" fill="white" />
            </svg>
            <span style={{ fontWeight: 800, fontSize: 12, color: BLUE, letterSpacing: -0.2 }}>PROSPER</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4-4"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          </div>
        </div>
        <div style={{ padding: '10px 14px 6px', background: 'white' }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: TEXT, lineHeight: 1.25 }}>How can we<br/>help you?</div>
        </div>
        <div style={{ flex: 1, padding: '8px 10px', background: APP_BG, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, overflow: 'hidden' }}>
          {gridModules.map((mod) => (
            <div key={mod.label} style={{ background: 'white', borderRadius: 14, padding: '10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={mod.path} />
                </svg>
              </div>
              <div style={{ fontWeight: 700, fontSize: 9, color: TEXT }}>{mod.label}</div>
              <div style={{ fontWeight: 400, fontSize: 8, color: '#999' }}>{mod.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderTop: '1px solid #EFEFEF', display: 'flex', paddingBottom: 14, paddingTop: 8 }}>
          {tabs.map((tab) => {
            const active = tab.label === 'Learn';
            return (
              <div key={tab.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill={active ? BLUE : 'none'} stroke={active ? BLUE : '#bbb'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.path} />
                </svg>
                <span style={{ fontSize: 7, fontWeight: active ? 700 : 400, color: active ? BLUE : '#bbb' }}>{tab.label}</span>
                {active && <div style={{ width: 16, height: 2, background: BLUE, borderRadius: 1 }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Phone App Components ──────────────────────────────────────
const PHONE_BLUE = '#2B2BAA';
const PHONE_GRAY_TEXT = '#888899';
const PHONE_TEXT = '#111122';

function PhoneSparkline({ data, color, width = 80, height = 32 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * (height - 4) - 2,
  ]);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={area} fill={color} fillOpacity="0.12" />
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneTopBar() {
  return (
    <div style={{ paddingTop: 62, paddingLeft: 18, paddingRight: 18, paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="7" fill={PHONE_BLUE} />
          <rect x="5" y="16" width="4" height="7" rx="1" fill="white" />
          <rect x="11" y="11" width="4" height="12" rx="1" fill="white" />
          <rect x="17" y="6" width="4" height="17" rx="1" fill="white" />
          <path d="M5 8l4-3 5 4 7-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontWeight: 800, fontSize: 17, color: PHONE_BLUE, letterSpacing: -0.3 }}>PROSPER</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PHONE_TEXT} strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <div style={{ position: 'relative' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PHONE_TEXT} strokeWidth="2" strokeLinecap="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, borderRadius: '50%', background: '#E53935', border: '1.5px solid white' }} />
        </div>
      </div>
    </div>
  );
}

function PhoneBottomNav() {
  const tabs = [
    { id: 'home', label: 'Home', path: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { id: 'portfolio', label: 'Portfolio', path: 'M22 12 18 12 15 21 9 3 6 12 2 12' },
    { id: 'chat', label: 'Chat', path: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
    { id: 'learn', label: 'Learn', path: 'M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z' },
    { id: 'profile', label: 'Profile', path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 3a4 4 0 100 8 4 4 0 000-8z' },
  ];
  return (
    <div style={{ background: 'white', borderTop: '1px solid #EFEFEF', display: 'flex', paddingBottom: 20, paddingTop: 10 }}>
      {tabs.map((tab, i) => {
        const isActive = i === 0;
        return (
          <div key={tab.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? PHONE_BLUE : 'none'} stroke={isActive ? PHONE_BLUE : '#888'} strokeWidth="1.8">
              <path d={tab.path} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, color: isActive ? PHONE_BLUE : '#888' }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function PhoneHomeScreen() {
  const marketData = [
    { symbol: 'S&P 500', value: '5,842.16', change: '+0.87%', pos: true, spark: [58, 60, 57, 62, 64, 61, 65, 67, 65, 69, 71, 70] },
    { symbol: 'NASDAQ', value: '18,290.4', change: '+1.12%', pos: true, spark: [50, 53, 51, 56, 59, 55, 61, 63, 60, 66, 70, 69] },
    { symbol: 'DOW', value: '43,228.5', change: '-0.23%', pos: false, spark: [70, 68, 71, 67, 65, 69, 66, 63, 65, 61, 60, 59] },
  ];
  const PCard = ({ children, style = {} }) => (
    <div style={{ background: 'white', borderRadius: 16, border: '1px solid #EEEEF2', padding: 18, ...style }}>{children}</div>
  );
  return (
    <div style={{ background: '#F7F7FB', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, system-ui, sans-serif' }}>
      <PhoneTopBar />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <p style={{ color: PHONE_GRAY_TEXT, fontSize: 14, marginBottom: 2 }}>Good morning 👋</p>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: PHONE_TEXT }}>Hi, Albert</h1>
        </div>

        <PCard style={{ background: PHONE_BLUE, border: 'none', marginBottom: 14 }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 }}>Total Portfolio Value</p>
          <h2 style={{ color: 'white', fontSize: 32, fontWeight: 800, letterSpacing: -1 }}>$48,291.50</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <span style={{ background: 'rgba(255,255,255,0.18)', color: 'white', fontSize: 13, fontWeight: 600, borderRadius: 20, padding: '2px 10px' }}>▲ +$342.18 (0.71%)</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Today</span>
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 14 }}>
            {[{ label: 'Invested', val: '$41,200' }, { label: 'Returns', val: '+$7,091' }, { label: 'Yield', val: '17.2%' }].map(item => (
              <div key={item.label}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginBottom: 2 }}>{item.label}</p>
                <p style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{item.val}</p>
              </div>
            ))}
          </div>
        </PCard>

        <p style={{ fontWeight: 700, fontSize: 15, color: PHONE_TEXT, marginBottom: 10 }}>Market Overview</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {marketData.map(m => (
            <PCard key={m.symbol} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: PHONE_TEXT }}>{m.symbol}</p>
                <p style={{ fontSize: 13, color: PHONE_GRAY_TEXT }}>{m.value}</p>
              </div>
              <PhoneSparkline data={m.spark} color={m.pos ? '#4444cc' : '#EF4444'} />
              <span style={{ fontSize: 13, fontWeight: 700, color: m.pos ? '#4444cc' : '#EF4444', minWidth: 56, textAlign: 'right' }}>{m.change}</span>
            </PCard>
          ))}
        </div>

        <p style={{ fontWeight: 700, fontSize: 15, color: PHONE_TEXT, marginBottom: 10 }}>Quick Actions</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[{ icon: '📊', label: 'Calculator' }, { icon: '📈', label: 'Analyze' }, { icon: '🎯', label: 'Goals' }, { icon: '📋', label: 'Reports' }].map(a => (
            <div key={a.label} style={{ flex: 1, background: 'white', border: '1px solid #EEEEF2', borderRadius: 14, padding: '14px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
              <p style={{ fontSize: 11, color: PHONE_GRAY_TEXT, fontWeight: 500 }}>{a.label}</p>
            </div>
          ))}
        </div>

        <PCard style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: PHONE_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 15 }}>RR</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: PHONE_TEXT }}>Robby Robby</p>
              <p style={{ fontSize: 12, color: PHONE_GRAY_TEXT }}>Financial Advisor</p>
            </div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid #DDDDF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PHONE_BLUE} strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
        </PCard>
      </div>
      <PhoneBottomNav />
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero({ onOpenWaitlist }) {
  const containerRef = useRef(null);
  const BG = '#0a0d14';
  const ACCENT = '#2B2BAA';
  const ACCENT_BRIGHT = 'white';
  const ACCENT_DIM = 'rgba(43,43,170,0.15)';
  const ACCENT_BORDER = 'rgba(43,43,170,0.3)';
  const TEXT = '#eef0f8';
  const MUTED = '#6b738f';
  const CARD_BG = '#13161f';
  const BORDER = 'rgba(255,255,255,0.07)';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nh-left', { opacity: 0, y: 20, duration: 0.7, delay: 0.3, ease: 'power2.out' });
      gsap.from('.nh-right', { opacity: 0, y: 20, duration: 0.7, delay: 0.5, ease: 'power2.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const InfoCard = ({ children }) => (
    <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 14, boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}>
      {children}
    </div>
  );

  const IbIcon = ({ children }) => (
    <div style={{ width: 30, height: 30, borderRadius: 8, background: ACCENT_DIM, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
      {children}
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="nh-section"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '68px 52px 52px', position: 'relative', overflow: 'hidden', background: BG }}
    >
      <div style={{ position: 'absolute', top: '-5%', right: '5%', width: 800, height: 800, background: 'radial-gradient(ellipse at center, rgba(43,43,170,0.14) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '15%', width: 500, height: 400, background: 'radial-gradient(ellipse at center, rgba(64,64,200,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="nh-grid" style={{ maxWidth: 1280, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* LEFT */}
        <div className="nh-left" style={{ padding: '60px 0' }}>
          <div style={{ fontFamily: "Geist, sans-serif", display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 100, fontSize: 12, fontWeight: 600, color: ACCENT_BRIGHT, letterSpacing: '0.4px', marginBottom: 28 }}>
            <div className="hero-badge-dot" />
            Now available on iOS & Android
          </div>

          <h1 style={{ fontFamily: "Geist, sans-serif", fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-1.8px', marginBottom: 28, color: TEXT }}>
            Your Finances.{' '}
            <span style={{ color: ACCENT, display: 'block' }}>Real Guidance.</span>
          </h1>

          <p className="nh-sub" style={{ fontFamily: "Geist, sans-serif", fontSize: 16, lineHeight: 1.75, color: MUTED, maxWidth: 420, marginBottom: 40, fontWeight: 400 }}>
            Message a real advisor, track every account, and build a plan that actually fits your life.
          </p>

          <div className="hero-store-btns" style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
            {[
              { label: 'App Store', sub: 'Available on the', icon: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.3-2.18 3.87.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.35 2.61M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' },
              { label: 'Google Play', sub: 'GET IT ON', icon: 'M3.18 23.76c.3.17.64.22.98.14l12.09-6.98-2.55-2.55-10.52 9.39zM.48 1.9A1.74 1.74 0 000 3.13v17.74c0 .49.18.93.48 1.23l.07.06 9.94-9.94v-.23L.55 1.84l-.07.06zm20.28 8.35-2.54-1.47-2.85 2.85 2.85 2.85 2.56-1.48c.73-.42.73-1.11-.02-1.75zm-9.5 9.75L2.17 11.41l2.56-2.56 10.52 9.39-2.99 1.76.01-.01z' },
            ].map(btn => (
              <a key={btn.label} href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, cursor: 'pointer', textDecoration: 'none' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d={btn.icon} /></svg>
                <div>
                  <small style={{ display: 'block', fontSize: 10, color: MUTED, fontWeight: 500 }}>{btn.sub}</small>
                  <strong style={{ display: 'block', fontSize: 15, color: TEXT, fontWeight: 700 }}>{btn.label}</strong>
                </div>
              </a>
            ))}
          </div>

          <div className="hero-users-row" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex' }}>
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <div key={l} style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid ${BG}`, marginLeft: i === 0 ? 0 : -10, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ['#1e1e6e', '#191966', '#16155a', '#1a1970'][i], color: ACCENT_BRIGHT }}>{l}</div>
              ))}
            </div>
            <div>
              <span style={{ color: '#f5c842', fontSize: 13, letterSpacing: 1, display: 'block', marginBottom: 2 }}>★★★★★</span>
              <strong style={{ display: 'block', fontSize: 15, fontWeight: 700, color: TEXT }}>500K+ Users</strong>
              <span style={{ fontSize: 12, color: MUTED }}>5-Star Customer Reviews</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="nh-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, height: 680 }}>
          {/* Left info column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 155, flexShrink: 0 }}>
            <InfoCard>
              <IbIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT_BRIGHT} strokeWidth="2" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </IbIcon>
              <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3, marginBottom: 4 }}>Talk with a real financial advisor</div>
              <div style={{ fontSize: 9.5, color: MUTED, lineHeight: 1.4 }}>Not automated responses. Real guidance from professionals.</div>
              <div style={{ display: 'flex', marginTop: 8 }}>
                {[{ bg: '#2B2BAA', l: 'R' }, { bg: '#3d3db5', l: 'S' }, { bg: '#5050c8', l: 'M' }, { bg: '#6363d0', l: '+4' }].map((a, i) => (
                  <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${BG}`, marginLeft: i === 0 ? 0 : -6, fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', background: a.bg }}>{a.l}</div>
                ))}
              </div>
              <div style={{ fontSize: 9, color: MUTED, marginTop: 6 }}>7 advisors online now</div>
            </InfoCard>

            <InfoCard>
              <IbIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT_BRIGHT} strokeWidth="2" strokeLinecap="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </IbIcon>
              <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3, marginBottom: 4 }}>See your entire financial picture</div>
              <div style={{ fontSize: 9.5, color: MUTED, lineHeight: 1.4 }}>Track accounts, investments, and retirement progress in one place.</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: ACCENT_BRIGHT, letterSpacing: '-0.5px', margin: '6px 0 2px' }}>$48,291</div>
              <div style={{ fontSize: 9, color: '#6b8c6b' }}>▲ +17.2% all time</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28, marginTop: 8 }}>
                {[40, 55, 45, 75, 60, 50, 85].map((h, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: '2px 2px 0 0', height: `${h}%`, background: [3, 6].includes(i) ? ACCENT : 'rgba(255,255,255,0.08)' }} />
                ))}
              </div>
            </InfoCard>
          </div>

          {/* Phone */}
          <div style={{ position: 'relative', zIndex: 5, flexShrink: 0 }}>
            <div style={{ width: 290, height: 620, background: 'linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)', borderRadius: 50, position: 'relative', overflow: 'visible', boxShadow: '0 0 0 2.5px #8a8a9a, 0 0 0 3.5px #6a6a7a, 0 0 0 5px #4a4a58, 4px 8px 0 3px #3a3a48, 6px 14px 0 2px #2a2a36, 0 40px 80px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 50, background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 30%, transparent 60%, rgba(0,0,0,0.15) 100%)', pointerEvents: 'none', zIndex: 30 }} />
              <div style={{ position: 'absolute', inset: 5, borderRadius: 44, background: '#000', zIndex: 0 }} />
              <div style={{ position: 'absolute', top: 19, left: '50%', transform: 'translateX(-50%)', width: 96, height: 30, background: '#000', borderRadius: 20, zIndex: 20, boxShadow: '0 0 0 2px #111' }} />
              <div style={{ position: 'absolute', inset: 5, overflow: 'hidden', borderRadius: 44, zIndex: 10 }}>
                <div style={{ width: 375, height: 812, transform: 'scale(0.747)', transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
                  <PhoneHomeScreen />
                </div>
              </div>
            </div>
          </div>

          {/* Right info column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 155, flexShrink: 0 }}>
            <InfoCard>
              <IbIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT_BRIGHT} strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
              </IbIcon>
              <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3, marginBottom: 4 }}>Get a personalized strategy</div>
              <div style={{ fontSize: 9.5, color: MUTED, lineHeight: 1.4 }}>Actions that move you forward based on your situation.</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[{ label: 'Retirement', pct: 72 }, { label: 'Emergency Fund', pct: 90 }, { label: 'Investment Goal', pct: 48 }].map(bar => (
                  <div key={bar.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: MUTED }}>{bar.label}</span>
                      <span style={{ fontSize: 9, color: ACCENT_BRIGHT, fontWeight: 600 }}>{bar.pct}%</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }}>
                      <div style={{ height: '100%', borderRadius: 2, background: ACCENT, width: `${bar.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard>
              <IbIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT_BRIGHT} strokeWidth="2" strokeLinecap="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                </svg>
              </IbIcon>
              <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3, marginBottom: 4 }}>Built to grow with you</div>
              <div style={{ fontSize: 9.5, color: MUTED, lineHeight: 1.4 }}>Start free. Upgrade when you're ready for deeper planning.</div>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[{ color: '#555577', label: 'Free — Track & visualize' }, { color: ACCENT, label: 'Pro — Advisor access' }, { color: ACCENT_BRIGHT, label: 'Premium — Full planning' }].map(tier => (
                  <div key={tier.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, color: MUTED }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: tier.color, flexShrink: 0 }} />
                    <span>{tier.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 9, color: MUTED }}>Starting at <span style={{ color: ACCENT_BRIGHT, fontWeight: 700 }}>$0/mo</span></div>
            </InfoCard>
          </div>
        </div>
      </div>

      {/* Mobile-only phone mockup */}
      <div className="nh-phone-mobile" style={{ display: 'none', justifyContent: 'center', width: '100%', paddingBottom: 40, position: 'relative', zIndex: 1 }}>
        <div className="nh-phone-mobile-inner" style={{ position: 'relative' }}>
          <div style={{
            width: 260, height: 556,
            background: 'linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)',
            borderRadius: 44, position: 'relative', overflow: 'visible',
            boxShadow: '0 0 0 2px #8a8a9a, 0 0 0 3.5px #6a6a7a, 0 0 0 5px #4a4a58, 4px 8px 0 3px #3a3a48, 0 30px 70px rgba(0,0,0,0.8)',
          }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 44, background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 30%, transparent 60%, rgba(0,0,0,0.15) 100%)', pointerEvents: 'none', zIndex: 30 }} />
            <div style={{ position: 'absolute', inset: 5, borderRadius: 38, background: '#000', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 86, height: 26, background: '#000', borderRadius: 18, zIndex: 20 }} />
            <div style={{ position: 'absolute', inset: 5, overflow: 'hidden', borderRadius: 38, zIndex: 10 }}>
              <div style={{ width: 375, height: 812, transform: 'scale(0.667)', transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
                <PhoneHomeScreen />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-badge-dot {
          width: 6px; height: 6px;
          background: #2B2BAA;
          border-radius: 50%;
          animation: heroPulse 2s infinite;
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 900px) {
          .nh-section {
            padding: 80px 24px 0 !important;
            min-height: auto !important;
            align-items: flex-start !important;
            flex-direction: column !important;
          }
          .nh-grid { grid-template-columns: 1fr !important; }
          .nh-right { display: none !important; }
          .nh-left {
            padding: 16px 0 24px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .nh-sub { max-width: 100% !important; }
          .hero-store-btns { justify-content: center !important; }
          .hero-users-row { justify-content: center !important; }
          .nh-phone-mobile { display: flex !important; }
        }
        @media (max-width: 640px) {
          .nh-section { padding: 76px 20px 0 !important; }
          .nh-left { padding: 10px 0 20px !important; }
        }
        @media (max-width: 380px) {
          .nh-phone-mobile-inner {
            transform: scale(0.85);
            transform-origin: top center;
            margin-bottom: -48px;
          }
        }
      `}</style>
    </section>
  );
}

function AppWalkthrough() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [rowVisible, setRowVisible] = useState([false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timers = [300, 600, 900].map((delay, i) =>
      setTimeout(() => setRowVisible((prev) => { const n = [...prev]; n[i] = true; return n; }), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const ACCENT = '#2B2BAA';

  return (
    <section
      ref={sectionRef}
      id="app-walkthrough"
      className="w-full px-6 pt-14 pb-16 bg-transparent relative z-20"
    >
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="inline-block text-white text-xs uppercase tracking-widest font-bold mb-4 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          Learn
        </div>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight leading-snug mb-4">
          Built To Educate.{' '}
          <span className="text-accent">Designed For Every Learner.</span>
        </h2>
        <p className="font-heading text-white/50 text-sm md:text-base leading-relaxed">
          Six content formats. One platform. Infinite ways to grow your financial knowledge.
        </p>
      </div>

      {/* Desktop: phone + lines + cards */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 130px 260px 130px 1fr',
          gridTemplateRows: '164px 164px 164px',
          rowGap: 24,
          alignItems: 'center',
        }}>
          {/* Phone: center column, spans all 3 rows */}
          <div style={{ gridColumn: '3', gridRow: '1 / 4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}>
              <LearnPhoneMockup />
            </div>
          </div>

          {LEARN_LEFT.map((mod, i) => (
            <React.Fragment key={mod.id}>
              {/* Left card */}
              <div style={{
                gridColumn: '1', gridRow: i + 1,
                display: 'flex', justifyContent: 'flex-end', paddingRight: 16,
                opacity: rowVisible[i] ? 1 : 0,
                transform: rowVisible[i] ? 'translateX(0)' : 'translateX(-28px)',
                transition: 'opacity 0.55s ease 0.3s, transform 0.55s ease 0.3s',
              }}>
                <div style={{ maxWidth: 230, textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: 'white', fontFamily: 'inherit' }}>{mod.title}</span>
                    <div style={{ width: 38, height: 38, borderRadius: 12, background: `${ACCENT}18`, border: `1px solid ${ACCENT}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={mod.svgPath} />
                      </svg>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55, margin: 0, fontFamily: 'inherit' }}>{mod.desc}</p>
                </div>
              </div>

              {/* Left line */}
              <div style={{ gridColumn: '2', gridRow: i + 1, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', height: 1 }}>
                  <div style={{
                    width: '100%', height: '100%',
                    background: `linear-gradient(to left, ${ACCENT}80, ${ACCENT}15)`,
                    transformOrigin: 'right',
                    transform: rowVisible[i] ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.5s ease',
                  }} />
                  <div style={{
                    position: 'absolute', right: -3, top: '50%', transform: 'translateY(-50%)',
                    width: 6, height: 6, borderRadius: '50%', background: ACCENT,
                    boxShadow: `0 0 8px ${ACCENT}`,
                    opacity: rowVisible[i] ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.45s',
                  }} />
                </div>
              </div>
            </React.Fragment>
          ))}

          {LEARN_RIGHT.map((mod, i) => (
            <React.Fragment key={mod.id}>
              {/* Right line */}
              <div style={{ gridColumn: '4', gridRow: i + 1, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', height: 1 }}>
                  <div style={{
                    width: '100%', height: '100%',
                    background: `linear-gradient(to right, ${ACCENT}80, ${ACCENT}15)`,
                    transformOrigin: 'left',
                    transform: rowVisible[i] ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.5s ease',
                  }} />
                  <div style={{
                    position: 'absolute', left: -3, top: '50%', transform: 'translateY(-50%)',
                    width: 6, height: 6, borderRadius: '50%', background: ACCENT,
                    boxShadow: `0 0 8px ${ACCENT}`,
                    opacity: rowVisible[i] ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.45s',
                  }} />
                </div>
              </div>

              {/* Right card */}
              <div style={{
                gridColumn: '5', gridRow: i + 1,
                display: 'flex', justifyContent: 'flex-start', paddingLeft: 16,
                opacity: rowVisible[i] ? 1 : 0,
                transform: rowVisible[i] ? 'translateX(0)' : 'translateX(28px)',
                transition: 'opacity 0.55s ease 0.3s, transform 0.55s ease 0.3s',
              }}>
                <div style={{ maxWidth: 230, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 12, background: `${ACCENT}18`, border: `1px solid ${ACCENT}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={mod.svgPath} />
                      </svg>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 15, color: 'white', fontFamily: 'inherit' }}>{mod.title}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55, margin: 0, fontFamily: 'inherit' }}>{mod.desc}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile: phone + cards grid */}
      <div className="md:hidden flex flex-col items-center gap-8">
        <div className="learn-phone-mobile-wrap">
          <LearnPhoneMockup />
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {[...LEARN_LEFT, ...LEARN_RIGHT].map((mod) => (
            <div key={mod.id} className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `${ACCENT}18`, border: `1px solid ${ACCENT}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={mod.svgPath} />
                </svg>
              </div>
              <span className="text-white font-bold text-sm font-heading">{mod.title}</span>
              <p className="text-white/40 text-xs font-heading leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12">
        <LiquidButton colorMode="purple" onClick={() => navigate('/features')}>
          Explore all features <ArrowRight size={18} />
        </LiquidButton>
      </div>

      <style>{`
        .learn-phone-mobile-wrap { overflow: visible; }
        @media (max-width: 640px) {
          .learn-phone-mobile-wrap {
            transform: scale(0.86);
            transform-origin: top center;
            margin-bottom: -42px;
          }
        }
        @media (max-width: 380px) {
          .learn-phone-mobile-wrap {
            transform: scale(0.73);
            margin-bottom: -80px;
          }
        }
      `}</style>
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
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white">Subscription Tiers</h2>
          <p className="font-heading text-white/50 mt-4 text-lg">Choose the right level of support for your financial journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 items-center perspective-[2000px]">
          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-6 md:p-10 bg-surface border border-white/5 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(43,43,170,0.1)] hover:border-accent/30">
            <h3 className="font-heading font-bold text-2xl text-white mb-2">Basic Plan</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-auto md:h-10">Start organizing your finances</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-heading font-bold text-white">$0</span>
              <span className="text-lg text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 font-heading text-sm text-white/70">
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Connect up to 3 accounts</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Track portfolio performance</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-white/20" /> Access core financial dashboards</li>
            </ul>
            <LiquidButton colorMode="dark" className="w-full" onClick={onOpenWaitlist}>
              Start Free
            </LiquidButton>
          </TiltCard>

          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-6 md:p-12 bg-[#0f1219] border border-accent/40 text-white transition-shadow duration-500 relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 hover:shadow-[0_0_80px_rgba(43,43,170,0.2)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_5px_15px_rgba(43,43,170,0.5)] whitespace-nowrap">Most Popular</div>
            <h3 className="font-heading font-bold text-2xl mb-2">Pro Plan</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-auto md:h-10">Smarter education and deeper insights</p>
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

          <TiltCard className="pricing-card-wrapper pricing-card group rounded-[2.5rem] p-6 md:p-10 bg-surface border border-white/5 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(43,43,170,0.1)] hover:border-accent/30">
            <h3 className="font-heading font-bold text-2xl text-white mb-2">Elite Plan</h3>
            <p className="font-heading text-white/50 mb-8 text-sm h-auto md:h-10">Advisor supported financial planning</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-heading font-bold text-white">$99</span>
              <span className="text-lg text-white/40 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 font-heading text-sm text-white/70">
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Everything in Pro</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Monthly advisor strategy session</li>
              <li className="flex items-center gap-3"><ArrowRight size={18} className="text-accent" /> Direct support from financial professionals</li>
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


// ── Encryption flow visual ─────────────────────────────────
function EncryptionFlowVisual({ inView }) {
  const steps = [
    { label: 'Your File', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' },
    { label: 'AES-256',  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B2BAA" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/><circle cx="12" cy="16" r="1.2" fill="#2B2BAA"/></svg>, bg: 'rgba(43,43,170,0.14)', border: 'rgba(43,43,170,0.35)' },
    { label: 'Secured',  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B2BAA" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l7 4v6c0 4.4-3 8.5-7 9.5C8 20.5 5 16.4 5 12V6l7-4z"/><polyline points="9 12 11 14 15 10"/></svg>, bg: 'rgba(43,43,170,0.2)', border: 'rgba(43,43,170,0.45)' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '18px 12px', background: 'rgba(255,255,255,0.025)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)', marginTop: 8 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s.label}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 44, height: 44, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: i > 0 ? '0 0 16px rgba(43,43,170,0.15)' : 'none' }}>{s.icon}</div>
            <span style={{ fontSize: 10, color: i === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(43,43,170,0.9)', fontWeight: 600, letterSpacing: 0.3 }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1.2, height: 2, background: 'rgba(43,43,170,0.15)', borderRadius: 1, position: 'relative', overflow: 'hidden', margin: '0 4px', marginBottom: 20 }}>
              {inView && [0, 1, 2].map(j => (
                <div key={j} style={{ position: 'absolute', top: -2, width: 7, height: 7, borderRadius: '50%', background: '#2B2BAA', animation: `secEncDot 1.8s ease-in-out ${i * 0.4 + j * 0.55}s infinite` }} />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Advisor access visual ──────────────────────────────────
function AdvisorAccessVisual({ inView }) {
  return (
    <div style={{ padding: '16px 12px', background: 'rgba(255,255,255,0.025)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)', marginTop: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {/* You */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%', margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>You</span>
        </div>
        {/* Encrypted channel */}
        <div style={{ flex: 2.5, position: 'relative' }}>
          <div style={{ height: 30, background: 'rgba(43,43,170,0.1)', border: '1px solid rgba(43,43,170,0.25)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, overflow: 'hidden', position: 'relative' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#2B2BAA" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
            <span style={{ fontSize: 9, color: 'rgba(43,43,170,0.9)', fontWeight: 800, letterSpacing: 0.8 }}>ENCRYPTED</span>
            {inView && [0, 1].map(j => (
              <div key={j} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: 'rgba(43,43,170,0.6)', animation: `secEncDot 1.6s ease-in-out ${j * 0.75}s infinite` }} />
            ))}
          </div>
        </div>
        {/* Advisor */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, background: 'rgba(43,43,170,0.15)', border: '1px solid rgba(43,43,170,0.35)', borderRadius: '50%', margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(43,43,170,0.2)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2B2BAA" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <span style={{ fontSize: 10, color: '#2B2BAA', fontWeight: 700 }}>Advisor</span>
        </div>
      </div>
      {/* Access badge row */}
      <div style={{ display: 'flex', gap: 6, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {['Advisor verified', 'No third-party access', 'Session logged'].map(t => (
          <div key={t} style={{ fontSize: 9, fontWeight: 700, color: 'rgba(43,43,170,0.8)', background: 'rgba(43,43,170,0.1)', border: '1px solid rgba(43,43,170,0.2)', borderRadius: 20, padding: '3px 8px' }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ── Secure Upload Section ──────────────────────────────────
function SecureUploadSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const BG = '#0a0d14';
  const BLUE = '#2B2BAA';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const smallCards = [
    {
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2B2BAA" strokeWidth="2" strokeLinecap="round"><path d="M12 2l7 4v6c0 4.4-3 8.5-7 9.5C8 20.5 5 16.4 5 12V6l7-4z"/><polyline points="9 12 11 14 15 10"/></svg>,
      title: '256-Bit SSL',
      desc: 'Every byte transmitted between you and Prosper is protected by industry-standard TLS encryption.',
    },
    {
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2B2BAA" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
      title: 'FINRA Compliant',
      desc: 'Document handling meets FINRA and SEC compliance standards for financial data storage and sharing.',
    },
    {
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2B2BAA" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
      title: 'Full Audit Logs',
      desc: 'Every file access is timestamped and logged — you always know exactly when your documents were viewed.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{ background: BG, padding: 'clamp(60px, 10vw, 110px) 20px clamp(60px, 10vw, 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: 'radial-gradient(ellipse, rgba(43,43,170,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* ── Animated lock hero ── */}
      <div style={{ position: 'relative', marginBottom: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Pulsing rings */}
        {inView && [0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            width: 96 + i * 56,
            height: 96 + i * 56,
            borderRadius: '50%',
            border: `1px solid rgba(43,43,170,${0.45 - i * 0.12})`,
            animation: `secRingPulse 2.6s ease-out ${i * 0.4}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}
        {/* Lock box */}
        <div style={{
          width: 76, height: 76,
          background: 'rgba(43,43,170,0.12)',
          border: '1px solid rgba(43,43,170,0.4)',
          borderRadius: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: inView ? '0 0 50px rgba(43,43,170,0.28), 0 0 0 6px rgba(43,43,170,0.07)' : 'none',
          transition: 'box-shadow 0.9s ease',
          animation: inView ? 'secLockAppear 0.55s cubic-bezier(.22,.8,.36,1) both' : 'none',
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2.5" fill="rgba(43,43,170,0.25)" stroke="#2B2BAA" strokeWidth="1.5"/>
            <path
              d="M8 11V7a4 4 0 018 0v4"
              stroke="#2B2BAA"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
              style={{
                transform: inView ? 'translateY(0)' : 'translateY(-7px)',
                transformOrigin: '50% 100%',
                transition: 'transform 0.45s cubic-bezier(.22,.8,.36,1) 0.15s',
              }}
            />
            <circle cx="12" cy="16.5" r="1.4" fill="#2B2BAA"/>
          </svg>
        </div>
      </div>

      {/* ── Headline ── */}
      <div style={{ textAlign: 'center', maxWidth: 620, marginBottom: 64, animation: inView ? 'secFadeUp 0.65s ease 0.2s both' : 'none' }}>
        <p className="font-heading" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: BLUE, marginBottom: 16 }}>Secure File Uploads</p>
        <h2 className="font-heading" style={{ fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 900, color: 'white', letterSpacing: '-2.5px', lineHeight: 1.06, marginBottom: 20 }}>
          Your Documents.{' '}
          <em style={{ fontStyle: 'italic', color: BLUE }}>Fort Knox Secure.</em>
        </h2>
        <p className="font-heading" style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', lineHeight: 1.75 }}>
          Share sensitive financial files with your advisor through chat or profile settings — every upload is protected by bank-grade encryption, strict access controls, and a complete audit trail.
        </p>
      </div>

      {/* ── Large cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 14, width: '100%', maxWidth: 920, marginBottom: 14, animation: inView ? 'secFadeUp 0.65s ease 0.38s both' : 'none' }}>
        {/* Card 1 */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 22, padding: '28px 26px 22px' }}>
          <div style={{ width: 38, height: 38, background: 'rgba(43,43,170,0.14)', border: '1px solid rgba(43,43,170,0.25)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
          </div>
          <p className="font-heading" style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 8 }}>End-to-End Encryption</p>
          <p className="font-heading" style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, marginBottom: 20 }}>
            Every file is encrypted the moment you upload using AES-256 — the same standard trusted by global banks and governments. Your data is unreadable in transit and at rest.
          </p>
          <EncryptionFlowVisual inView={inView} />
        </div>

        {/* Card 2 */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 22, padding: '28px 26px 22px' }}>
          <div style={{ width: 38, height: 38, background: 'rgba(43,43,170,0.14)', border: '1px solid rgba(43,43,170,0.25)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <p className="font-heading" style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 8 }}>Advisor-Only Access</p>
          <p className="font-heading" style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, marginBottom: 20 }}>
            Documents shared through your advisor chat or profile settings are visible exclusively to your assigned fiduciary advisor. No third parties, no Prosper staff, no exceptions.
          </p>
          <AdvisorAccessVisual inView={inView} />
        </div>
      </div>

      {/* ── Small cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, width: '100%', maxWidth: 920, animation: inView ? 'secFadeUp 0.65s ease 0.54s both' : 'none' }}>
        {smallCards.map(card => (
          <div key={card.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '22px 22px' }}>
            <div style={{ width: 36, height: 36, background: 'rgba(43,43,170,0.14)', border: '1px solid rgba(43,43,170,0.22)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              {card.icon}
            </div>
            <p className="font-heading" style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 7 }}>{card.title}</p>
            <p className="font-heading" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.6 }}>{card.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes secRingPulse {
          0%   { transform: scale(0.9); opacity: 0.65; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes secLockAppear {
          from { opacity: 0; transform: scale(0.65); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes secFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes secEncDot {
          0%   { left: -4%; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: 104%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

// ── Advisor Chat Section ───────────────────────────────────
const ADVISOR_CHATS = [
  {
    question: 'Should I invest my $5k bonus?',
    answer: "Great question! I'd put 50% into index funds, 30% toward your emergency fund, and 20% on the student loans. Want me to build out a full plan for you?",
    qTime: '2:14 PM', aTime: '2:16 PM',
  },
  {
    question: 'Am I on track for retirement?',
    answer: "Based on your $1,800/mo savings rate, you're tracking for retirement at 57. Bump contributions just 5% and we could realistically hit 55. Want to run the numbers? 🎯",
    qTime: '3:22 PM', aTime: '3:25 PM',
  },
  {
    question: 'Pay off debt or invest first?',
    answer: "With your loans sitting at 7.8%, paying those down wins mathematically. Once they're gone, every dollar you invest compounds free and clear. Let's map out a timeline.",
    qTime: '10:41 AM', aTime: '10:44 AM',
  },
];

function AdvisorChatSection() {
  const sectionRef = useRef(null);
  const [started, setStarted]     = useState(false);
  const [phase, setPhase]         = useState('idle');
  const [idx, setIdx]             = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || phase !== 'idle') return;
    const t = setTimeout(() => setPhase('typing'), 900);
    return () => clearTimeout(t);
  }, [started, phase]);

  useEffect(() => {
    if (phase !== 'typing') return;
    const q = ADVISOR_CHATS[idx].question;
    if (typedText.length < q.length) {
      const t = setTimeout(() => setTypedText(q.slice(0, typedText.length + 1)), 46);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('sent'), 320);
    return () => clearTimeout(t);
  }, [phase, typedText, idx]);

  useEffect(() => {
    if (phase !== 'sent') return;
    const t = setTimeout(() => setPhase('advisorTyping'), 480);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'advisorTyping') return;
    const t = setTimeout(() => setPhase('response'), 1900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'response') return;
    const t = setTimeout(() => setPhase('fading'), 4000);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'fading') return;
    const t = setTimeout(() => {
      setTypedText('');
      setIdx(i => (i + 1) % ADVISOR_CHATS.length);
      setPhase('idle');
    }, 520);
    return () => clearTimeout(t);
  }, [phase]);

  const chat         = ADVISOR_CHATS[idx];
  const showUserMsg  = ['sent','advisorTyping','response','fading'].includes(phase);
  const showDots     = phase === 'advisorTyping';
  const showReply    = ['response','fading'].includes(phase);
  const dynAnim      = phase === 'fading'
    ? 'chatFadeOut 0.52s ease forwards'
    : 'chatSlideIn 0.32s cubic-bezier(.22,.8,.36,1) forwards';

  const ROBBY_PHOTO  = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=96&auto=format&fit=crop';
  const APP_BG       = '#F2F3F7';
  const APP_WHITE    = '#FFFFFF';
  const BUBBLE_ME    = '#2B2BAA';
  const BUBBLE_THEM  = '#E4E5EC';
  const APP_TEXT     = '#111122';
  const APP_GRAY     = '#888899';

  const features = [
    { icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z', text: 'Ask anything — tax strategy, investing, budgeting, and more' },
    { icon: 'M22 12h-4l-3 9L9 3l-3 9H2',                                  text: 'Your advisor sees your full financial picture in real time' },
    { icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4M12 16h.01',      text: 'Messages answered by a certified fiduciary advisor' },
    { icon: 'M12 2l7 4v6c0 4.4-3 8.5-7 9.5C8 20.5 5 16.4 5 12V6l7-4z',   text: 'Fully encrypted and completely private, always' },
  ];

  return (
    <section
      ref={sectionRef}
      style={{ background: '#0a0d14', padding: 'clamp(60px, 10vw, 110px) 20px clamp(60px, 12vw, 130px)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '5%', right: '10%', width: 700, height: 600, background: 'radial-gradient(ellipse, rgba(43,43,170,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="advisor-chat-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

        {/* ── Left: copy ── */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', background: 'rgba(43,43,170,0.12)', border: '1px solid rgba(43,43,170,0.28)', borderRadius: 100, fontSize: 11, fontWeight: 800, color: '#2B2BAA', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 22 }}>
            1:1 Advisor Chat
          </div>
          <h2 className="font-heading" style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 18 }}>
            Your Advisor,{' '}
            <em style={{ fontStyle: 'italic', color: '#2B2BAA' }}>Always a Message Away.</em>
          </h2>
          <p className="font-heading" style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 40, maxWidth: 420 }}>
            Get personalized guidance from a real fiduciary advisor. Whether you have a quick question or a major financial decision, your advisor has your back.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(43,43,170,0.12)', border: '1px solid rgba(43,43,170,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2B2BAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon}/>
                  </svg>
                </div>
                <p className="font-heading" style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, paddingTop: 9 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: iPhone mockup ── */}
        <div className="advisor-phone-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Phone outer frame */}
          <div style={{
            width: 300,
            height: 640,
            background: 'linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)',
            borderRadius: 50,
            position: 'relative',
            boxShadow: '0 0 0 2px #8a8a9a, 0 0 0 3px #6a6a7a, 0 0 0 5px #4a4a58, 4px 8px 0 3px #3a3a48, 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(43,43,170,0.12)',
          }}>
            {/* Glass sheen */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: 50, background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 30%, transparent 60%)', pointerEvents: 'none', zIndex: 30 }} />
            {/* Side buttons */}
            <div style={{ position: 'absolute', left: -3, top: 110, width: 3, height: 28, background: '#444', borderRadius: '2px 0 0 2px' }}/>
            <div style={{ position: 'absolute', left: -3, top: 150, width: 3, height: 44, background: '#444', borderRadius: '2px 0 0 2px' }}/>
            <div style={{ position: 'absolute', right: -3, top: 165, width: 3, height: 64, background: '#444', borderRadius: '0 2px 2px 0' }}/>
            {/* Inner black bezel */}
            <div style={{ position: 'absolute', inset: 5, borderRadius: 44, background: '#000', zIndex: 0 }} />
            {/* Dynamic island */}
            <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 100, height: 30, background: '#000', borderRadius: 20, zIndex: 20 }} />
            {/* Screen */}
            <div style={{ position: 'absolute', inset: 5, overflow: 'hidden', borderRadius: 44, zIndex: 10, background: APP_BG, display: 'flex', flexDirection: 'column' }}>

              {/* Status bar */}
              <div style={{ background: APP_WHITE, paddingTop: 52, paddingBottom: 8, paddingLeft: 20, paddingRight: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: APP_TEXT }}>12:07</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill={APP_TEXT}><rect x="0" y="5" width="2.5" height="5" rx="0.5"/><rect x="3.5" y="3" width="2.5" height="7" rx="0.5"/><rect x="7" y="1" width="2.5" height="9" rx="0.5"/><rect x="10.5" y="0" width="2.5" height="10" rx="0.5" opacity="0.35"/></svg>
                  <svg width="14" height="10" viewBox="0 0 20 15" fill={APP_TEXT}><path d="M10 3.5C12.8 3.5 15.3 4.7 17 6.6L18.5 5.1C16.4 2.8 13.4 1.3 10 1.3S3.6 2.8 1.5 5.1L3 6.6C4.7 4.7 7.2 3.5 10 3.5Z"/><path d="M10 7C11.9 7 13.6 7.8 14.8 9L16.3 7.5C14.7 5.9 12.5 5 10 5S5.3 5.9 3.7 7.5L5.2 9C6.4 7.8 8.1 7 10 7Z"/><circle cx="10" cy="13" r="2"/></svg>
                  <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${APP_TEXT}`, display: 'flex', alignItems: 'center', padding: 1.5 }}>
                    <div style={{ width: '85%', height: '100%', background: APP_TEXT, borderRadius: 1.5 }}/>
                  </div>
                </div>
              </div>

              {/* Chat header */}
              <div style={{ background: APP_WHITE, borderBottom: '1px solid #EEEEF5', padding: '10px 16px 14px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={APP_GRAY} strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                <img
                  src={ROBBY_PHOTO}
                  alt="Robby T. Bryant CFP"
                  loading="lazy"
                  style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', border: '2px solid #EEEEF5', flexShrink: 0 }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#2B2BAA', display: 'none', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>RR</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: APP_TEXT, lineHeight: 1.2 }}>Robby T. Bryant (CFP)</p>
                  <p style={{ fontSize: 11, color: '#2B2BAA', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }}/> Online
                  </p>
                </div>
              </div>

              {/* Messages area */}
              <div style={{ flex: 1, overflowY: 'hidden', padding: '12px 14px 6px', display: 'flex', flexDirection: 'column', gap: 0, background: APP_BG }}>

                {/* Date separator */}
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: APP_GRAY, background: '#E0E0E8', borderRadius: 10, padding: '2px 10px' }}>Thursday, March 12, 2026</span>
                </div>

                {/* Static advisor greeting */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ maxWidth: '82%', background: BUBBLE_THEM, borderRadius: '16px 16px 16px 4px', padding: '10px 13px', fontSize: 12, color: APP_TEXT, lineHeight: 1.55 }}>
                    Hi Albert, welcome to the PRO$PER family! I've been assigned as your advisor and look forward to helping you reach your goals.
                  </div>
                  <span style={{ fontSize: 9.5, color: APP_GRAY, marginTop: 3, marginLeft: 4 }}>11:47 AM</span>
                </div>

                {/* Dynamic Q&A — fades in/out as animation cycles */}
                {showUserMsg && (
                  <div style={{ animation: dynAnim }}>
                    {/* Date separator */}
                    <div style={{ textAlign: 'center', margin: '8px 0' }}>
                      <span style={{ fontSize: 10, color: APP_GRAY, background: '#E0E0E8', borderRadius: 10, padding: '2px 10px' }}>Today</span>
                    </div>
                    {/* User message */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: 4 }}>
                      <div style={{ maxWidth: '82%', background: BUBBLE_ME, borderRadius: '16px 16px 4px 16px', padding: '10px 13px', fontSize: 12, color: 'white', lineHeight: 1.55 }}>
                        {chat.question}
                      </div>
                      <span style={{ fontSize: 9.5, color: APP_GRAY, marginTop: 3, marginRight: 4 }}>{chat.qTime}</span>
                    </div>
                  </div>
                )}

                {/* Typing dots */}
                {showDots && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 4, animation: 'chatSlideIn 0.25s ease forwards' }}>
                    <div style={{ background: BUBBLE_THEM, borderRadius: '16px 16px 16px 4px', padding: '12px 16px', display: 'flex', gap: 5, alignItems: 'center' }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: APP_GRAY, animation: `chatDotPulse 1.1s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Advisor reply */}
                {showReply && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 4, animation: 'chatSlideIn 0.3s cubic-bezier(.22,.8,.36,1) forwards' }}>
                    <div style={{ maxWidth: '85%', background: BUBBLE_THEM, borderRadius: '16px 16px 16px 4px', padding: '10px 13px', fontSize: 12, color: APP_TEXT, lineHeight: 1.55 }}>
                      {chat.answer}
                    </div>
                    <span style={{ fontSize: 9.5, color: APP_GRAY, marginTop: 3, marginLeft: 4 }}>{chat.aTime}</span>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div style={{ background: APP_WHITE, borderTop: '1px solid #EEEEF5', padding: '10px 14px 28px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <div style={{ flex: 1, background: APP_BG, borderRadius: 22, padding: '9px 14px', fontSize: 12, color: phase === 'typing' && typedText ? APP_TEXT : APP_GRAY, minHeight: 36, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {phase === 'typing' && typedText ? (
                    <span>{typedText}<span style={{ animation: 'chatBlink 0.8s step-end infinite', opacity: 1 }}>|</span></span>
                  ) : (
                    'Write your message...'
                  )}
                </div>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: phase === 'typing' && typedText ? '#2B2BAA' : '#DDDDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s ease' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatFadeOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes chatDotPulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%           { transform: scale(1);   opacity: 1; }
        }
        @keyframes chatBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @media (max-width: 860px) {
          .advisor-chat-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 640px) {
          .advisor-chat-grid { gap: 32px !important; }
          .advisor-phone-wrap {
            transform: scale(0.88);
            transform-origin: top center;
            margin-bottom: -48px;
          }
        }
        @media (max-width: 380px) {
          .advisor-phone-wrap {
            transform: scale(0.75);
            margin-bottom: -90px;
          }
        }
      `}</style>
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
      }, 500);
    }
  }, [location]);

  useEffect(() => {
    // Removed GSAP background color animation to maintain a consistent dark background
  }, []);

  return (
    <div ref={mainRef} className="relative bg-transparent">
      <Helmet>
        <title>Prosper | Build Wealth With Structure</title>
        <meta name="description" content="Prosper combines AI-guided financial education with real fiduciary advisors. Learn investing, track your portfolio, and build wealth with structure and confidence." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Prosper | Build Wealth With Structure" />
        <meta property="og:description" content="Prosper combines AI-guided financial education with real fiduciary advisors. Learn investing, track your portfolio, and build wealth with structure and confidence." />
        <meta property="og:image" content="https://www.buildingwealthsoftware.com/prosper-logo.png" />
        <meta property="og:url" content="https://www.buildingwealthsoftware.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prosper | Build Wealth With Structure" />
        <meta name="twitter:description" content="Prosper combines AI-guided financial education with real fiduciary advisors. Learn investing, track your portfolio, and build wealth with structure and confidence." />
        <meta name="twitter:image" content="https://www.buildingwealthsoftware.com/prosper-logo.png" />
      </Helmet>
      <Hero onOpenWaitlist={onOpenWaitlist} />
      <AboutUsSection />
      <IonaSection />
      <AppWalkthrough />
      <AdvisorChatSection />
      <SecureUploadSection />
      <PricingTiers onOpenWaitlist={onOpenWaitlist} />
    </div>
  );
}
