"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

export const liquidbuttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-[1.5rem] font-heading font-bold transition-[color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none group hover:scale-[1.02] active:scale-[0.98] duration-300 relative",
  {
    variants: {
      colorMode: {
        cyan: "text-white",
        purple: "text-white",
        pink: "text-white",
        primary: "text-white",
        dark: "text-white/80 hover:text-white",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 text-xs gap-1.5 px-4",
        lg: "h-14 px-8 text-base",
        xl: "h-16 rounded-[2rem] px-10 text-lg",
        icon: "size-12",
      },
    },
    defaultVariants: {
      colorMode: "cyan",
      size: "lg",
    },
  }
)

export function LiquidButton({
  className,
  colorMode = "cyan",
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button"
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  const shadowConfig = {
    cyan: "shadow-[0_0_15px_rgba(70,199,217,0.3),inset_3px_3px_2px_-2px_rgba(255,255,255,0.4),inset_0_0_15px_10px_rgba(70,199,217,0.1)] group-hover:shadow-[0_0_30px_rgba(70,199,217,0.6),inset_3px_3px_2px_-2px_rgba(255,255,255,0.6),inset_0_0_20px_10px_rgba(70,199,217,0.2)] bg-[#46C7D9]/10 group-hover:bg-[#46C7D9]/30",
    purple: "shadow-[0_0_15px_rgba(159,131,241,0.3),inset_3px_3px_2px_-2px_rgba(255,255,255,0.4),inset_0_0_15px_10px_rgba(159,131,241,0.1)] group-hover:shadow-[0_0_30px_rgba(159,131,241,0.6),inset_3px_3px_2px_-2px_rgba(255,255,255,0.6),inset_0_0_20px_10px_rgba(159,131,241,0.2)] bg-[#9F83F1]/10 group-hover:bg-[#9F83F1]/30",
    primary: "shadow-[0_0_15px_rgba(159,131,241,0.5),inset_3px_3px_2px_-2px_rgba(255,255,255,0.4),inset_0_0_15px_10px_rgba(159,131,241,0.3)] group-hover:shadow-[0_0_30px_rgba(159,131,241,0.8),inset_3px_3px_2px_-2px_rgba(255,255,255,0.8),inset_0_0_20px_10px_rgba(159,131,241,0.5)] bg-gradient-to-r from-[#9F83F1]/50 to-[#DF74B8]/50 group-hover:from-[#9F83F1]/70 group-hover:to-[#DF74B8]/70",
    pink: "shadow-[0_0_15px_rgba(223,116,184,0.3),inset_3px_3px_2px_-2px_rgba(255,255,255,0.4),inset_0_0_15px_10px_rgba(223,116,184,0.1)] group-hover:shadow-[0_0_30px_rgba(223,116,184,0.6),inset_3px_3px_2px_-2px_rgba(255,255,255,0.6),inset_0_0_20px_10px_rgba(223,116,184,0.2)] bg-[#DF74B8]/10 group-hover:bg-[#DF74B8]/30",
    dark: "shadow-[0_0_15px_rgba(255,255,255,0.05),inset_3px_3px_2px_-2px_rgba(255,255,255,0.1),inset_0_0_15px_10px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15),inset_3px_3px_2px_-2px_rgba(255,255,255,0.3),inset_0_0_20px_10px_rgba(255,255,255,0.05)] bg-[#1A1C25]/60 group-hover:bg-[#1A1C25]/90",
  }

  const borderConfig = {
    cyan: "border border-[#46C7D9]/30 group-hover:border-[#46C7D9]/80",
    purple: "border border-[#9F83F1]/30 group-hover:border-[#9F83F1]/80",
    primary: "border border-[#9F83F1]/50 group-hover:border-[#9F83F1]",
    pink: "border border-[#DF74B8]/30 group-hover:border-[#DF74B8]/80",
    dark: "border border-white/10 group-hover:border-white/30",
  }

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(
          liquidbuttonVariants({ colorMode, size, className }),
          borderConfig[colorMode]
        )}
        {...props}
      >
        <div className={cn(
          "absolute inset-0 z-0 rounded-[inherit] transition-all duration-500",
          shadowConfig[colorMode]
        )} />
        <div
          className="absolute inset-0 isolate -z-10 overflow-hidden rounded-[inherit]"
          style={{ 
            backdropFilter: isMobile ? 'blur(8px)' : 'url("#container-glass")', 
            WebkitBackdropFilter: isMobile ? 'blur(8px)' : 'url("#container-glass")',
            willChange: 'backdrop-filter'
          }}
        />

        <div className="pointer-events-none z-10 flex items-center justify-center gap-2 w-full mix-blend-plus-lighter">
          {children}
        </div>
        <GlassFilter />
      </Comp>
    </>
  )
}

function GlassFilter() {
  return (
    <svg className="absolute w-0 h-0 hidden" aria-hidden="true" style={{ pointerEvents: 'none', position: 'absolute' }}>
      <defs>
        <filter
          id="container-glass"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="1"
            seed="3"
            result="turbulence"
          />
          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
