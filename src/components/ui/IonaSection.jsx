import React, { useState, useEffect } from 'react';

const GREEN  = '#22C55E';
const PURPLE = '#2B2BAA';
const LIGHT  = 'white';
const BG     = '#0a0d14';

function IonaStar({ size = 18, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l2.5 7.7H22l-6.5 4.7 2.5 7.7L12 17.4 5.9 22.1l2.5-7.7L2 9.7h7.5z" />
    </svg>
  );
}

// ── Response cards ─────────────────────────────────────────────

function RetirementCard() {
  return (
    <div>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 20 }}>
        Based on your <strong style={{ color: 'white' }}>$1,800/mo savings rate</strong> and a projected 7% annual return, you could retire at:
      </p>
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Target retirement age</p>
        <p style={{ fontSize: 64, fontWeight: 900, letterSpacing: '-3px', color: 'white', lineHeight: 1 }}>57</p>
        <p style={{ fontSize: 13, color: LIGHT, marginTop: 6, fontWeight: 600 }}>29 years from now</p>
      </div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: '57%', height: '100%', background: PURPLE, borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>Age 28 (now)</span>
          <span style={{ fontSize: 11, color: LIGHT, fontWeight: 700 }}>Age 57 ✦</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>Age 65</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[['Projected Portfolio', '$1.84M', 'white'], ['Monthly Income', '~$7,200', GREEN], ['Avg Return', '7.0%', LIGHT]].map(([l, v, c]) => (
          <div key={l} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 12px' }}>
            <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.38)', marginBottom: 5, lineHeight: 1.3 }}>{l}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: c }}>{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectorsCard() {
  const sectors = [
    { name: 'AI & Infrastructure',  pct: 31.2, color: '#2B2BAA' },
    { name: 'Healthcare & Biotech', pct: 12.4, color: GREEN      },
    { name: 'Energy & Utilities',   pct: 9.1,  color: '#F59E0B'  },
    { name: 'Defense & Aerospace',  pct: 8.7,  color: '#EF4444'  },
  ];
  const max = 31.2;
  return (
    <div>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 22 }}>
        Based on current momentum and fundamentals, here are the <strong style={{ color: 'white' }}>top performing sectors YTD:</strong>
      </p>
      {sectors.map(s => (
        <div key={s.name} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{s.name}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>+{s.pct}%</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${(s.pct / max) * 100}%`, height: '100%', background: s.color, borderRadius: 3 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TaxCard() {
  const items = [
    { text: 'Max out 401(k) contributions — $9K remaining this year', save: '$2,100' },
    { text: 'Tax-loss harvest your AMZN position (−4% from cost basis)', save: '$1,400' },
    { text: 'Max your HSA contribution before year-end', save: '$700' },
  ];
  return (
    <div>
      <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.16)', borderRadius: 14, padding: '16px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(34,197,94,0.65)', marginBottom: 4 }}>Estimated annual savings</p>
          <p style={{ fontSize: 40, fontWeight: 900, color: GREEN, lineHeight: 1, letterSpacing: '-1.5px' }}>$4,200</p>
        </div>
        <div style={{ width: 1, height: 48, background: 'rgba(34,197,94,0.18)' }} />
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>3 opportunities<br />identified</p>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, marginBottom: 12 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2,6 5,9 10,3" />
            </svg>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>{item.text}</p>
            <span style={{ fontSize: 13, fontWeight: 700, color: GREEN, flexShrink: 0 }}>+{item.save}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function HomeCard() {
  const saved = 47200, goal = 80000, pct = Math.round((saved / goal) * 100);
  return (
    <div>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 18 }}>
        Down payment goal: <strong style={{ color: 'white' }}>$80,000</strong>
      </p>
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)' }}>Saved: $47,200</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: LIGHT }}>{pct}%</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: PURPLE, borderRadius: 4 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>$0</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>$80,000</span>
        </div>
      </div>
      <div style={{ background: 'rgba(43,43,170,0.08)', border: '1px solid rgba(43,43,170,0.14)', borderRadius: 16, padding: '18px 22px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>At your current $1,800/mo savings rate, you'll reach your goal in</p>
        <p style={{ fontSize: 44, fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1 }}>
          2 yrs <span style={{ color: LIGHT }}>3 mo</span>
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 8 }}>Estimated by July 2028</p>
      </div>
    </div>
  );
}

// ── Prompt data ────────────────────────────────────────────────
const PROMPTS = [
  { question: 'At what age could I retire?',             Card: RetirementCard },
  { question: 'What are some hot sectors to invest in?', Card: SectorsCard    },
  { question: 'How can I lower my tax bill this year?',  Card: TaxCard        },
  { question: 'Am I on track to buy a home?',            Card: HomeCard       },
];

// Phases: idle → typing → thinking → answering → fading → idle
export default function IonaSection() {
  const [phase,     setPhase]     = useState('idle');
  const [idx,       setIdx]       = useState(0);
  const [typedText, setTypedText] = useState('');

  // idle → typing
  useEffect(() => {
    if (phase !== 'idle') return;
    const t = setTimeout(() => setPhase('typing'), 400);
    return () => clearTimeout(t);
  }, [phase]);

  // typing — 32 ms/char, then straight to thinking
  useEffect(() => {
    if (phase !== 'typing') return;
    const q = PROMPTS[idx].question;
    if (typedText.length < q.length) {
      const t = setTimeout(() => setTypedText(q.slice(0, typedText.length + 1)), 32);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('thinking'), 200);
    return () => clearTimeout(t);
  }, [phase, typedText, idx]);

  // thinking → answering
  useEffect(() => {
    if (phase !== 'thinking') return;
    const t = setTimeout(() => setPhase('answering'), 800);
    return () => clearTimeout(t);
  }, [phase]);

  // answering → fading (hold answer for 2.2 s)
  useEffect(() => {
    if (phase !== 'answering') return;
    const t = setTimeout(() => setPhase('fading'), 2200);
    return () => clearTimeout(t);
  }, [phase]);

  // fading → advance to next prompt (400 ms matches fade-out duration)
  useEffect(() => {
    if (phase !== 'fading') return;
    const t = setTimeout(() => {
      setTypedText('');
      setIdx(i => (i + 1) % PROMPTS.length);
      setPhase('idle');
    }, 420);
    return () => clearTimeout(t);
  }, [phase]);

  const { Card } = PROMPTS[idx];
  const showThinking = phase === 'thinking';
  const showCard     = phase === 'answering' || phase === 'fading';
  const cardAnim     = phase === 'fading'
    ? 'ionaFadeOut 0.42s ease forwards'
    : 'ionaFadeIn  0.38s cubic-bezier(.22,.8,.36,1) forwards';

  return (
    <section
      style={{
        background: BG,
        padding: 'clamp(56px, 10vw, 110px) 20px clamp(48px, 8vw, 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient — blends seamlessly with the section above */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120, pointerEvents: 'none', zIndex: 2,
        background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
      }} />

      {/* Bottom gradient — blends seamlessly with the section below */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, pointerEvents: 'none', zIndex: 2,
        background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
      }} />

      {/* Ambient purple glow */}
      <div style={{
        position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 600, pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(43,43,170,0.08) 0%, transparent 68%)',
      }} />

      {/* Star */}
      <div style={{ marginBottom: 28, position: 'relative', zIndex: 3 }}>
        <IonaStar size={30} color={LIGHT} />
      </div>

      {/* Headline */}
      <h2
        className="font-heading iona-headline"
        style={{
          fontSize: 'clamp(46px, 7.5vw, 86px)',
          fontWeight: 900,
          textAlign: 'center',
          color: 'white',
          letterSpacing: '-1px',
          lineHeight: 1.02,
          marginBottom: 18,
          position: 'relative', zIndex: 3,
        }}
      >
        Meet <em style={{ fontStyle: 'italic', color: LIGHT }}>Iona.</em>
      </h2>

      {/* Subheadline */}
      <p
        className="font-heading"
        style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: 'rgba(255,255,255,0.42)',
          textAlign: 'center',
          maxWidth: 460,
          lineHeight: 1.7,
          marginBottom: 56,
          position: 'relative', zIndex: 3,
        }}
      >
        Your personal AI financial specialist — turning your questions into answers grounded in your data, delivered instantly.
      </p>

      {/* Input bar */}
      <div
        className="iona-input-bar"
        style={{
          width: '100%',
          maxWidth: 600,
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${showCard ? 'rgba(43,43,170,0.45)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 100,
          padding: '14px 14px 14px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: showCard
            ? '0 0 0 4px rgba(43,43,170,0.1), 0 24px 70px rgba(43,43,170,0.14)'
            : '0 8px 40px rgba(0,0,0,0.3)',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
          marginBottom: 18,
          position: 'relative',
          zIndex: 3,
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: 16,
            lineHeight: 1.2,
            letterSpacing: '-0.2px',
            color: typedText ? 'white' : 'rgba(255,255,255,0.25)',
            userSelect: 'none',
            minHeight: 24,
            display: 'block',
            fontFamily: 'Geist, sans-serif',
          }}
        >
          {typedText || 'Ask Iona anything...'}
          {phase === 'typing' && typedText && (
            <span style={{ animation: 'ionaBlink 0.85s step-end infinite', marginLeft: 1 }}>|</span>
          )}
        </span>

        {/* Send button */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            flexShrink: 0,
            background: typedText
              ? PURPLE
              : 'rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
            boxShadow: typedText ? '0 4px 18px rgba(43,43,170,0.45)' : 'none',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </div>
      </div>

      {/* Fixed-height response zone — section never grows or shrinks */}
      <div className="iona-response-zone" style={{ width: '100%', maxWidth: 600, height: 400, position: 'relative', zIndex: 3 }}>

        {/* Thinking indicator */}
        {showThinking && (
          <div
            style={{
              position: 'absolute', top: 10, left: 6,
              display: 'flex', alignItems: 'center', gap: 9,
              animation: 'ionaFadeIn 0.2s ease forwards',
            }}
          >
            <IonaStar size={15} color={LIGHT} />
            <span className="font-heading" style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Thinking</span>
            <div style={{ display: 'flex', gap: 4, marginLeft: 1 }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: 5, height: 5, borderRadius: '50%', background: LIGHT,
                    animation: `ionaDotPulse 1.1s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Answer card — fades in, then fades out before next cycle */}
        {showCard && (
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 22,
              padding: '26px 28px',
              animation: cardAnim,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <IonaStar size={13} color={LIGHT} />
              <span className="font-heading" style={{ fontSize: 11.5, color: LIGHT, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Iona</span>
            </div>
            <Card />
          </div>
        )}
      </div>

      <style>{`
        @keyframes ionaBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes ionaDotPulse {
          0%, 80%, 100% { transform: scale(0.55); opacity: 0.35; }
          40%           { transform: scale(1);    opacity: 1;    }
        }
        @keyframes ionaFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes ionaFadeOut {
          from { opacity: 1; transform: translateY(0);    }
          to   { opacity: 0; transform: translateY(-8px); }
        }
        @media (max-width: 640px) {
          .iona-headline { letter-spacing: -1.5px !important; }
          .iona-input-bar { padding: 11px 11px 11px 18px !important; }
          .iona-response-zone { height: 360px !important; }
        }
        @media (max-width: 380px) {
          .iona-response-zone { height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
