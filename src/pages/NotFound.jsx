import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { LiquidButton } from '../components/ui/liquid-glass-button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <Helmet>
        <title>Page Not Found | PRO$PER</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="mb-6 text-[7rem] font-heading font-bold leading-none text-white/5 select-none">
        404
      </div>
      <h1 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight mb-4">
        Page not found
      </h1>
      <p className="font-heading text-white/50 text-base max-w-md mb-10 leading-relaxed">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <Link to="/">
        <LiquidButton colorMode="purple">
          Back to Home
        </LiquidButton>
      </Link>
    </div>
  );
}
