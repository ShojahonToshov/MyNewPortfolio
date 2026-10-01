"use client";

import { MagneticButton } from "./ui/MagneticButton";
import { SocialIcons } from "./ui/SocialIcons";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter } from "react-icons/fi";

// =====================================================================
// SHARED UTILS & COMPONENTS
// =====================================================================
const NameCorner = ({ mixBlend = "mix-blend-normal", delay = 0.5 }) => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 1 }} className={`absolute top-6 md:top-10 left-6 md:left-20 z-20 pointer-events-none ${mixBlend}`}>
    <h2 className="text-white text-3xl font-bold tracking-tighter">Shojahon Toshov</h2>
  </motion.div>
);

// Pro-level Explore Button
const ProExploreButton = () => (
  <MagneticButton href="#projects" className="group flex items-center justify-center w-24 h-24 md:w-36 md:h-36 rounded-full border border-white/20 hover:border-transparent transition-colors duration-500 relative overflow-hidden text-white hover:text-black shadow-[0_0_30px_rgba(255,255,255,0.05)]">
    <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 group-hover:rotate-45 transition-transform duration-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 7H7M17 7v10" />
       </svg>
       <span className="font-sans font-bold uppercase tracking-[0.3em] text-[8px] md:text-[9px]">Explore</span>
    </div>
    <div className="absolute inset-0 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
  </MagneticButton>
);

const DottedBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
);

// Unified Mouse Glow matching the footer
const MouseGlow = ({ color1, color2 }) => {
  const glowRef = useRef(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  
  useEffect(() => {
    let bounds = null;
    const updateBounds = () => {
      bounds = glowRef.current?.offsetParent?.getBoundingClientRect();
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);

    const handleMouseMove = (e) => {
      if (!bounds) return;
      mouseX.set(e.clientX - bounds.left - 500);
      mouseY.set(e.clientY - bounds.top - 500);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={glowRef}
      className="absolute pointer-events-none opacity-50 z-0 w-[1000px] h-[1000px] rounded-full"
      style={{
        x: mouseX,
        y: mouseY,
        left: 0,
        top: 0,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 30%, transparent 80%)`,
      }}
    />
  );
};

// =====================================================================
// ELECTRIC TORUS BACKGROUND
// =====================================================================
const BHElectric = () => (
  <div className="absolute inset-0 flex items-center justify-center w-full h-full">
     <div className="absolute inset-0 flex items-center justify-center animate-[spin_60s_linear_infinite]">
       {[...Array(16)].map((_, i) => (
         <motion.div 
           key={i} 
           className="absolute rounded-full border border-white/10" 
           initial={{ rotateX: i * 11.25, rotateY: i * 11.25, rotateZ: 0 }}
           animate={{ rotateZ: 360 }}
           transition={{ 
             duration: 6 + (i % 4), 
             repeat: Infinity, 
             ease: "linear",
             delay: -(i * 0.5) 
           }}
           style={{ width: '97vh', height: '97vh', willChange: "transform" }}
         >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-white shadow-[0_0_20px_white] rounded-full" />
           {i % 2 === 0 && (
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-white shadow-[0_0_20px_white] rounded-full" />
           )}
         </motion.div>
       ))}
     </div>
  </div>
);

// =====================================================================
// HERO SOCIALS
// =====================================================================
const HeroSocials = () => {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
  };
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 12 } }
  };

  const hoverBg = "#ffffff";
  const hoverText = "#000";
  const border = "border-white/30";

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true }}
      className="absolute bottom-16 left-6 md:left-10 z-30 flex flex-col gap-4 md:gap-6 pointer-events-auto text-white"
    >
      {[Github, Linkedin, Twitter, Mail].map((Icon, idx) => (
        <motion.a
          variants={iconVariants}
          key={idx} href="#" 
          whileHover={{ scale: 1.1, backgroundColor: hoverBg, color: hoverText, borderColor: hoverBg }}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full border ${border} flex items-center justify-center transition-colors duration-300 z-20`}
          style={{ color: "inherit" }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </motion.a>
      ))}
    </motion.div>
  );
};



const MaskedText = ({ text, delay = 0, outlined = false }) => {
  const letters = text.split("");
  const controls = useAnimation();

  useEffect(() => {
    // Explicitly trigger the animation on mount to bypass Next.js Fast Refresh bugs
    controls.start("show");
  }, [controls]);

  const className = `text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none ${outlined ? 'text-transparent drop-shadow-2xl' : 'text-white drop-shadow-2xl'}`;
  const style = outlined ? { WebkitTextStroke: "2px white" } : {};

  return (
    <div className="flex overflow-hidden pb-4 -mb-4">
      {letters.map((char, index) => (
        <motion.span 
          key={index} 
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { y: "120%", rotate: 15, opacity: 0 },
            show: { 
              y: "0%", 
              rotate: 0, 
              opacity: 1, 
              transition: { 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
                delay: delay + (index * 0.05)
              } 
            }
          }}
          className={className}
          style={{ ...style, display: "inline-block", whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

// =====================================================================
// MAIN HERO COMPONENT
// =====================================================================
export default function HeroVariantsSwitcher() {
  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center font-sans">
      
      {/* Global Background Effects */}
      <MouseGlow color1="#ffffff" color2="#333333" />
      <DottedBackground />
      
      {/* NameCorner */}
      <div className="hidden md:block">
        <NameCorner mixBlend="mix-blend-difference text-white" />
      </div>
      
      {/* BACKGROUND VARIANT (z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <BHElectric />
      </div>

      {/* FOREGROUND CONTENT (z-20) */}
      <div className="relative z-20 text-center pointer-events-none flex flex-col items-center">
        <MaskedText text="Creative" delay={0.2} />
        <MaskedText text="Engineer" delay={0.5} outlined={true} />
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute bottom-24 right-10 md:bottom-16 md:right-24 z-30 pointer-events-auto">
        <ProExploreButton />
      </motion.div>

      <SocialIcons 
        className="absolute bottom-16 left-6 md:left-10 z-30 pointer-events-auto text-white flex-col" 
        hoverBg="#ffffff" 
      />

    </section>
  );
}



