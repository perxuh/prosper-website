import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FAQSection } from '../components/ui/faq-monochrome';

export default function FAQ() {
  return (
    <div className="pt-20 pb-16 md:pt-32 md:pb-24">
      <Helmet>
        <title>FAQ | Prosper</title>
        <meta name="description" content="Frequently asked questions about Prosper — the financial education and wealth building platform combining AI-guided learning with real fiduciary advisors." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/faq" />
      </Helmet>

      {/* Hero Header */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center mb-4 relative z-10">
        <div className="inline-block text-[#9F83F1] text-sm uppercase tracking-widest font-bold mb-4 bg-[#9F83F1]/10 px-4 py-1.5 rounded-full border border-[#9F83F1]/20 backdrop-blur-sm">
          Got Questions?
        </div>
        <h1 className="font-heading font-bold text-4xl md:text-7xl text-white tracking-tight leading-none mb-6">
          Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-pink to-cyan italic font-drama pe-4">Asked</span>
        </h1>
        <p className="font-heading text-xl text-white/50 leading-relaxed max-w-2xl mx-auto">
          Everything you need to know about Prosper, our advisors, and how the platform works.
        </p>
      </div>

      {/* Reuse the exact same FAQ component from the home page */}
      <FAQSection />
    </div>
  );
}
