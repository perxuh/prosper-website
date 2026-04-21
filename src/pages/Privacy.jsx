import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div className="pt-28 pb-24 px-6 max-w-3xl mx-auto">
      <Helmet>
        <title>Privacy Policy | PRO$PER</title>
        <meta name="description" content="Prosper's privacy policy — how we collect, use, and protect your personal and financial data." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/privacy" />
        <meta property="og:title" content="Privacy Policy | PRO$PER" />
        <meta property="og:url" content="https://www.buildingwealthsoftware.com/privacy" />
      </Helmet>

      <div className="mb-10">
        <div className="inline-block text-white text-xs uppercase tracking-widest font-bold mb-4 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          Legal
        </div>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="font-heading text-white/40 text-sm">Last updated: April 2026</p>
      </div>

      <div className="space-y-10 font-heading text-white/70 leading-relaxed">
        <section>
          <h2 className="text-white font-bold text-xl mb-3">1. Information We Collect</h2>
          <p>Prosper collects information you provide directly when creating an account, connecting financial accounts, or communicating with advisors. This includes name, email address, financial account data (via Plaid), and messages sent within the platform.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">2. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, personalize your financial education experience, connect you with fiduciary advisors, and send account-related communications. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">3. Data Security</h2>
          <p>Prosper uses industry-standard encryption and secure infrastructure to protect your data. Financial account connections are handled through Plaid, a trusted third-party provider. Your banking credentials are never stored by Prosper.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">4. Third-Party Services</h2>
          <p>We use trusted third-party services including Plaid for account connectivity and analytics tools for platform improvement. These providers are contractually obligated to handle your data securely and in accordance with this policy.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">5. Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us. You may also close your account and request removal of your data from our systems.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">6. Contact</h2>
          <p>For privacy-related questions or requests, contact us at <a href="mailto:privacy@buildingwealthsoftware.com" className="text-accent hover:text-white transition-colors">privacy@buildingwealthsoftware.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
