import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Loader2 } from "lucide-react";
import { LiquidButton } from "./liquid-glass-button";

export function WaitlistModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setIsSubmitting(false);
        setIsSuccess(false);
      }, 300); // Wait for exit animation
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    // Mock an API network latency for dramatic cinematic effect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-2xl px-4 animate-in fade-in duration-300">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-md bg-[#0D0E12]/90 border border-white/10 shadow-[0_0_80px_rgba(70,199,217,0.1)] rounded-[2.5rem] p-8 md:p-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Glow underlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan/10 blur-[80px] pointer-events-none rounded-full" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
            <div className="text-center space-y-2">
              <h2 className="font-heading font-bold text-3xl text-white">Priority Access</h2>
              <p className="font-heading text-white/50 text-sm">Join the waitlist. Secure your financial future.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="font-data text-[10px] uppercase tracking-widest text-[#46C7D9]">Full Name</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-heading text-lg focus:outline-none focus:border-[#46C7D9] transition-colors placeholder:text-white/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-data text-[10px] uppercase tracking-widest text-[#46C7D9]">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-heading text-lg focus:outline-none focus:border-[#46C7D9] transition-colors placeholder:text-white/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-data text-[10px] uppercase tracking-widest text-[#46C7D9]">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-heading text-lg focus:outline-none focus:border-[#46C7D9] transition-colors placeholder:text-white/20 font-data"
                />
              </div>
            </div>

            <div className="pt-4">
              <LiquidButton 
                type="submit" 
                colorMode="cyan" 
                className="w-full"
                disabled={isSubmitting || !name || !email}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin text-white" size={24} />
                ) : (
                  "Secure Access"
                )}
              </LiquidButton>
            </div>
          </form>
        ) : (
          <div className="relative z-10 flex flex-col items-center text-center gap-6 py-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-[#46C7D9] blur-[30px] opacity-20 rounded-full" />
              <ShieldCheck size={80} className="text-[#46C7D9] relative z-10 drop-shadow-[0_0_15px_rgba(70,199,217,0.5)]" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-3xl text-white">System Secured.</h2>
              <p className="font-heading text-white/50 text-base max-w-[250px] mx-auto leading-relaxed">
                Your credentials have been logged. We will contact you shortly with your exclusive entry token.
              </p>
            </div>

            <div className="pt-4 w-full">
              <LiquidButton onClick={onClose} colorMode="dark" className="w-full">
                Close Module
              </LiquidButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
