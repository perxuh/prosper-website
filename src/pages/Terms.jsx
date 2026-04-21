import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <div className="pt-28 pb-24 px-6 max-w-3xl mx-auto">
      <Helmet>
        <title>Terms of Service | Prosper</title>
        <meta name="description" content="Prosper's terms of service — the rules and guidelines governing your use of the Prosper platform." />
        <link rel="canonical" href="https://www.buildingwealthsoftware.com/terms" />
        <meta property="og:title" content="Terms of Service | Prosper" />
        <meta property="og:url" content="https://www.buildingwealthsoftware.com/terms" />
      </Helmet>

      <div className="mb-10">
        <div className="inline-block text-white text-xs uppercase tracking-widest font-bold mb-4 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          Legal
        </div>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight leading-tight mb-4">
          Terms of Service
        </h1>
        <p className="font-heading text-white/40 text-sm">Last updated: April 2026</p>
      </div>

      <div className="space-y-10 font-heading text-white/70 leading-relaxed">
        <section>
          <h2 className="text-white font-bold text-xl mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using the Prosper platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">2. Platform Use</h2>
          <p>Prosper provides financial education content, portfolio tracking tools, and access to fiduciary advisors. The platform is intended for informational and educational purposes. Nothing on Prosper constitutes personalized investment advice unless provided directly by a licensed advisor in a 1:1 session.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">3. Financial Disclaimer</h2>
          <p>Prosper is not a registered investment advisor, broker-dealer, or financial planner. Content provided through the AI education engine is for general educational purposes only. Past performance referenced in educational materials does not guarantee future results. Always consult a licensed financial professional for personalized advice.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">4. Subscriptions and Billing</h2>
          <p>Prosper offers monthly and annual subscription plans. Subscriptions renew automatically unless cancelled before the renewal date. You may cancel at any time through your account settings. Refund eligibility is determined on a case-by-case basis.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">5. User Responsibilities</h2>
          <p>You are responsible for maintaining the security of your account credentials. You agree not to use the platform for any unlawful purpose or to interfere with the platform's functionality or other users' experience.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">6. Limitation of Liability</h2>
          <p>Prosper and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability in any matter is limited to the amount paid by you in the prior three months.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">7. Changes to Terms</h2>
          <p>We may update these terms periodically. Continued use of the platform after updates constitutes acceptance of the revised terms. We will notify active users of material changes via email.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">8. Contact</h2>
          <p>For questions about these terms, contact us at <a href="mailto:legal@buildingwealthsoftware.com" className="text-accent hover:text-white transition-colors">legal@buildingwealthsoftware.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
