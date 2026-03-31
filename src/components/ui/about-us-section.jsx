"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Cpu,
  ShieldCheck,
  Activity,
  TrendingUp,
  User,
  Globe,
  Award,
  Users,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const services = [
    {
      icon: <Cpu className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#9F83F1]" />,
      title: "Algorithmic Trading",
      description: "Advanced low-latency routing and predictive modeling working 24/7 to optimize your entry and exit points seamlessly.",
      position: "left",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#9F83F1]" />,
      title: "Bank-Level Security",
      description: "Military-grade 256-bit encryption, SOC-2 compliance, and direct Plaid integration keeps your personal data completely isolated.",
      position: "left",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#9F83F1]" />,
      title: "Real-Time Tracking",
      description: "Zero-latency data visualization provides instantaneous, cinematic feedback on your entire aggregate net worth.",
      position: "left",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#9F83F1]" />,
      title: "Tax-Loss Harvesting",
      description: "Automated daily scanning across your portfolio to mathematically offset capital gains and save thousands at year-end.",
      position: "right",
    },
    {
      icon: <User className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#9F83F1]" />,
      title: "Human Fiduciaries",
      description: "Direct access to certified human experts who intimately understand startup equity, liquidity events, and tax architecture.",
      position: "right",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#9F83F1]" />,
      title: "Global Markets",
      description: "Frictionless access to domestic, international, and emerging markets, fully compiled into one single intelligent dashboard.",
      position: "right",
    },
  ]

  const stats = [
    { icon: <TrendingUp />, value: 2, label: "Assets Managed", suffix: "B+" },
    { icon: <Users />, value: 15, label: "Premium Members", suffix: "k+" },
    { icon: <Activity />, value: 99, label: "System Uptime", suffix: ".9%" },
    { icon: <Cpu />, value: 0, label: "Trading Fees", suffix: "$" },
  ]

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-transparent text-white overflow-hidden relative z-10"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#46C7D9]/10 blur-3xl pointer-events-none"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#9F83F1]/10 blur-[100px] pointer-events-none"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-[#46C7D9]/40 shadow-[0_0_10px_#46C7D9] pointer-events-none"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-[#9F83F1]/40 shadow-[0_0_15px_#9F83F1] pointer-events-none"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-[#46C7D9] font-data text-sm tracking-[0.2em] mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            THE PROSPER METHODOLOGY
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-center tracking-tight drop-shadow-md">Platform Philosophy</h2>
          <motion.div
            className="w-24 h-1 bg-[#46C7D9] rounded-full shadow-[0_0_10px_#46C7D9]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p className="text-center font-heading text-lg max-w-2xl mx-auto mb-20 text-white/70 leading-relaxed" variants={itemVariants}>
          We are a team of quantitative engineers, fiduciaries, and product designers dedicated to democratizing institutional-grade wealth management. By blending algorithmic precision with human insight, we fundamentally transform how you grow your capital.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
          {/* Left Column */}
          <div className="space-y-16 mt-8">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-12 md:mb-0">
            <motion.div className="relative w-full max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-md perspective-[1000px]" variants={itemVariants}>
              <motion.div
                className="rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                initial={{ scale: 0.9, opacity: 0, rotateY: 10 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                whileHover={{ scale: 1.02, rotateY: -5, transition: { duration: 0.4 } }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                  alt="Financial Dashboard Analytics"
                  className="w-full h-full object-cover aspect-[4/5] opacity-90 mix-blend-screen grayscale-[20%]"
                />
                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <motion.button
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View System Specs <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
              
              {/* Central Glowing Ring behind the image */}
              <motion.div
                className="absolute inset-0 rounded-[2rem] border border-[#46C7D9]/30 -m-4 z-[-1] shadow-[0_0_30px_rgba(70,199,217,0.1)]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              ></motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#46C7D9]/20 blur-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#9F83F1]/20 blur-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16 mt-8">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }) {
  return (
    <motion.div
      className="flex flex-col group font-heading"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-4 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-[#46C7D9] bg-[#46C7D9]/10 border border-[#46C7D9]/20 p-3 rounded-xl transition-all duration-300 group-hover:bg-[#46C7D9]/20 group-hover:shadow-[0_0_15px_rgba(70,199,217,0.3)] relative"
          whileHover={{ rotate: [0, -5, 5, -2, 0], transition: { duration: 0.4 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-bold text-white group-hover:text-[#46C7D9] transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-[0.95rem] text-white/50 leading-relaxed pl-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

function StatCounter({ icon, value, label, suffix, delay }) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 15,
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      springValue.set(0)
      setHasAnimated(false)
    }
  }, [isInView, value, springValue, hasAnimated])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white/10 hover:border-[#46C7D9]/30 transition-all duration-300 overflow-hidden relative"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#46C7D9]/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-[#46C7D9]/10 transition-colors"></div>
      
      <motion.div
        className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-5 text-[#46C7D9] group-hover:border-[#46C7D9]/50 group-hover:text-white transition-all duration-300 relative z-10"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-4xl font-heading font-bold text-white flex items-center mb-1 relative z-10">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-white/50 text-sm font-heading font-medium tracking-wide relative z-10 uppercase">{label}</p>
    </motion.div>
  )
}
