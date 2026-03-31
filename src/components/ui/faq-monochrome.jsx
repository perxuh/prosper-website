import React, { useEffect, useState } from "react";

const INTRO_STYLE_ID = "faq1-animations-prosper";

const faqs = [
  {
    question: "Is my banking data actually secure?",
    answer:
      "Yes. We utilize military-grade 256-bit AES encryption across our entire infrastructure. By partnering with enterprise-tier aggregators like Plaid, we never directly store, touch, or process your raw banking credentials.",
    meta: "SECURITY & COMPLIANCE",
  },
  {
    question: "How does the AI differ from your human advisors?",
    answer:
      "Our deterministic AI models provide instantaneous, micro-second optimizations for portfolio weighting and continuous daily tax-loss harvesting. Human fiduciaries step in exclusively for complex edge cases like illiquid startup equity, estate planning, and emotional guidance.",
    meta: "ADVISORY DUALITY",
  },
  {
    question: "Are there any hidden algorithmic trading or routing fees?",
    answer:
      "Absolutely not. Prosper operates on a strictly transparent SaaS subscription base. Your premium tiers inherently cover all execution, routing, and slippage fees—ensuring our financial incentives map perfectly to your net-worth growth.",
    meta: "TRANSPARENT PRICING",
  },
  {
    question: "How long does the real-time portfolio sync take?",
    answer:
      "Less than 90 seconds. Our zero-latency data infrastructure maps directly to over 11,000 global financial institutions, aggregating historical data and generating your initial optimized portfolio projection almost entirely instantaneously.",
    meta: "LATENCY & SYSTEMS",
  },
];

export function FAQSection() {
  const [introReady, setIntroReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  // Inject the custom animations for the "Signal FAQ" glowing header bar natively into the document head
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(INTRO_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = INTRO_STYLE_ID;
    style.innerHTML = `
      @keyframes faq1-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      @keyframes faq1-beam-spin {
        0% { transform: rotate(0deg) scale(1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      @keyframes faq1-pulse {
        0% { transform: scale(0.7); opacity: 0.55; }
        60% { opacity: 0.1; }
        100% { transform: scale(1.25); opacity: 0; }
      }
      @keyframes faq1-meter {
        0%, 20% { transform: scaleX(0); transform-origin: left; }
        45%, 60% { transform: scaleX(1); transform-origin: left; }
        80%, 100% { transform: scaleX(0); transform-origin: right; }
      }
      @keyframes faq1-tick {
        0%, 30% { transform: translateX(-6px); opacity: 0.4; }
        50% { transform: translateX(2px); opacity: 1; }
        100% { transform: translateX(20px); opacity: 0; }
      }
      
      /* The animated top badge */
      .faq1-intro {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.85rem 1.4rem;
        border-radius: 9999px;
        overflow: hidden;
        border: 1px solid rgba(70, 199, 217, 0.2);
        background: rgba(12, 12, 12, 0.6);
        color: #46C7D9; /* Neon Cyan */
        text-transform: uppercase;
        letter-spacing: 0.35em;
        font-size: 0.65rem;
        width: 100%;
        max-width: 28rem;
        margin: 0 auto;
        opacity: 0;
        transform: translate3d(0, 12px, 0);
        filter: blur(8px);
        transition: opacity 720ms ease, transform 720ms ease, filter 720ms ease;
        isolation: isolate;
        box-shadow: 0 0 20px rgba(70, 199, 217, 0.05);
      }
      
      .faq1-intro--active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        filter: blur(0);
      }
      
      .faq1-intro__beam,
      .faq1-intro__pulse {
        position: absolute;
        inset: -110%;
        pointer-events: none;
        border-radius: 50%;
      }
      
      .faq1-intro__beam {
        background: conic-gradient(from 160deg, rgba(70, 199, 217, 0.5), transparent 32%, rgba(159, 131, 241, 0.5) 58%, transparent 78%, rgba(70, 199, 217, 0.3));
        animation: faq1-beam-spin 10s linear infinite;
        opacity: 0.75;
      }
      
      .faq1-intro__pulse {
        border: 1px solid #9F83F1;
        opacity: 0.35;
        animation: faq1-pulse 3.4s ease-out infinite;
      }
      
      .faq1-intro__label {
        position: relative;
        z-index: 1;
        font-weight: 700;
        letter-spacing: 0.4em;
        text-shadow: 0 0 10px rgba(70, 199, 217, 0.5);
      }
      
      .faq1-intro__meter {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        height: 1px;
        background: linear-gradient(90deg, transparent, currentColor 35%, transparent 85%);
        transform: scaleX(0);
        transform-origin: left;
        animation: faq1-meter 5.8s ease-in-out infinite;
        opacity: 0.7;
      }
      
      .faq1-intro__tick {
        position: relative;
        z-index: 1;
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 9999px;
        background: currentColor;
        box-shadow: 0 0 0 4px rgba(70, 199, 217, 0.2);
        animation: faq1-tick 3.2s ease-in-out infinite;
      }
      
      .faq1-fade {
        opacity: 0;
        transform: translate3d(0, 24px, 0);
        filter: blur(12px);
        transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease;
      }
      
      .faq1-fade--ready {
        animation: faq1-fade-up 860ms cubic-bezier(0.22, 0.68, 0, 1) forwards;
      }
    `;

    document.head.appendChild(style);

    return () => {
      if (style.parentNode) style.remove();
    };
  }, []);

  // Frame mounting timings
  useEffect(() => {
    if (typeof window === "undefined") {
      setIntroReady(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setHasEntered(true);
      return;
    }

    let timeout;
    const onLoad = () => {
      timeout = window.setTimeout(() => setHasEntered(true), 120);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timeout);
    };
  }, []);

  const toggleQuestion = (index) => setActiveIndex((prev) => (prev === index ? -1 : index));

  const setCardGlow = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event) => {
    const target = event.currentTarget;
    target.style.removeProperty("--faq-x");
    target.style.removeProperty("--faq-y");
  };

  return (
    <section id="faq" className="relative w-full overflow-hidden bg-transparent z-10 py-24">
      <section
        className={`relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-6 lg:max-w-5xl lg:px-12 ${
          hasEntered ? "faq1-fade--ready" : "faq1-fade"
        }`}
      >
        <div className={`faq1-intro ${introReady ? "faq1-intro--active" : ""}`}>
          <span className="faq1-intro__beam" aria-hidden="true" />
          <span className="faq1-intro__pulse" aria-hidden="true" />
          <span className="faq1-intro__label">PROSPER FAQ</span>
          <span className="faq1-intro__meter" aria-hidden="true" />
          <span className="faq1-intro__tick" aria-hidden="true" />
        </div>

        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-8">
          <div className="space-y-4 font-heading">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl text-white">
              System clarity, total transparency.
            </h1>
            <p className="max-w-xl text-lg text-white/50 leading-relaxed font-light">
              Everything you need to know about our security architecture, algorithmic routing, and fiduciary framework.
            </p>
          </div>
        </header>

        <ul className="space-y-4">
          {faqs.map((item, index) => {
            const open = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-trigger-${index}`;

            return (
              <li
                key={item.question}
                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#14151B]/60 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 focus-within:-translate-y-1"
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
              >
                {/* Magnetic Hover Glow specific to the mouse cursor position tracking */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: `radial-gradient(400px circle at var(--faq-x, 50%) var(--faq-y, 50%), rgba(70,199,217,0.1), transparent 70%)`,
                  }}
                />

                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggleQuestion(index)}
                  className="relative flex w-full items-start gap-6 px-6 py-8 md:px-10 text-left transition-colors duration-300 focus-visible:outline-none"
                >
                  <span
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] border border-white/10 bg-white/5 transition-all duration-500 group-hover:scale-105 group-hover:bg-[#46C7D9]/10 group-hover:border-[#46C7D9]/30"
                  >
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-[1rem] border border-[#46C7D9]/50 opacity-0 transition-opacity duration-300 ${
                        open ? "opacity-100 animate-pulse" : ""
                      }`}
                    />
                    <svg
                      className={`relative h-6 w-6 text-white transition-all duration-500 ${open ? "rotate-45 text-[#46C7D9]" : "group-hover:text-[#46C7D9]"}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>

                  <div className="flex flex-1 flex-col gap-4 pt-1 font-heading">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 justify-between w-full">
                      <h2 className={`text-xl leading-tight font-medium transition-colors ${open ? 'text-white' : 'text-white/90 group-hover:text-[#46C7D9]'}`}>
                        {item.question}
                      </h2>
                      {item.meta && (
                        <span
                          className="inline-flex w-fit shrink-0 items-center rounded-full border border-white/10 px-3 py-1 font-data text-[10px] uppercase tracking-[0.35em] transition-opacity duration-300 sm:ml-auto text-white/40 group-hover:border-[#9F83F1]/30 group-hover:text-[#9F83F1]"
                        >
                          {item.meta}
                        </span>
                      )}
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden text-[1.05rem] leading-relaxed transition-[max-height] duration-500 ease-out ${
                        open ? "max-h-64" : "max-h-0"
                      } text-white/50`}
                    >
                      <p className="pr-4 md:pr-12 pt-2">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default FAQSection;
