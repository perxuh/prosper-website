import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FAQSection } from '../components/ui/faq-monochrome';

export default function FAQ() {
  return (
    <div className="pt-20 pb-16 md:pt-32 md:pb-24">
      <Helmet>
        <title>FAQ | PRO$PER</title>
        <meta name="description" content="Frequently asked questions about Prosper — data security, AI vs. human advisors, pricing, and account syncing. Get clear answers before you join." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FAQ | PRO$PER" />
        <meta property="og:description" content="Frequently asked questions about Prosper — data security, AI vs. human advisors, pricing, and account syncing. Get clear answers before you join." />
        <meta property="og:image" content="https://www.buildingwealthsoftware.com/prosper-logo.png" />
        <meta property="og:url" content="https://www.buildingwealthsoftware.com/faq" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ | PRO$PER" />
        <meta name="twitter:description" content="Frequently asked questions about Prosper — data security, AI vs. human advisors, pricing, and account syncing. Get clear answers before you join." />
        <meta name="twitter:image" content="https://www.buildingwealthsoftware.com/prosper-logo.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is my banking data secure?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Prosper uses secure encryption and trusted financial data providers like Plaid. Your login credentials remain protected and are never stored by Prosper."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does the AI differ from human advisors?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Prosper's AI helps you learn and understand financial topics quickly. Advisors help you apply those insights to real decisions based on your situation and goals."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are there hidden platform fees?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. Prosper uses simple monthly pricing with no hidden platform charges."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does account syncing take?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most accounts connect within minutes and continue updating automatically so your dashboard stays current."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.buildingwealthsoftware.com/"},
                  {"@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://www.buildingwealthsoftware.com/faq"}
                ]
              }
            ]
          }
        `}</script>
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
