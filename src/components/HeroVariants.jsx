import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter } from "react-icons/fi";

// =====================================================================
// SHARED UTILS & COMPONENTS
// =====================================================================
const NameCorner = ({ mixBlend = "mix-blend-normal", delay = 0.5 }) => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 1 }} className={`absolute top-6 md:top-10 left-6 md:left-20 z-20 pointer-events-none ${mixBlend}`}>
    <h2 className="text-white text-3xl font-bold tracking-tighter">Shojahon Toshov</h2>
  </motion.div>
);

export function MagneticButton({ children, className, href, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      href={href || "#"}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

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
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 500);
      mouseY.set(e.clientY - 500);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none opacity-50 z-0 w-[1000px] h-[1000px] rounded-full"
      style={{
        x: mouseX,
        y: mouseY,
        left: 0,
        top: 0,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 30%, transparent 80%)`,
        filter: "blur(60px)",
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
           style={{ width: '97vh', height: '97vh' }}
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
      animate="show" 
      className="absolute bottom-16 left-6 md:left-10 z-30 flex flex-col gap-4 md:gap-6 pointer-events-auto text-white"
    >
      {[Github, Linkedin, Twitter, Mail].map((Icon, idx) => (
        <motion.a
          variants={iconVariants}
          key={idx} href="#" 
          whileHover={{ scale: 1.1, backgroundColor: hoverBg, color: hoverText, borderColor: hoverBg }}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full border ${border} flex items-center justify-center transition-colors duration-300 z-20`}
          style={{ color: "inherit" }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </motion.a>
      ))}
    </motion.div>
  );
};

// =====================================================================
// MAIN HERO COMPONENT
// =====================================================================
export default function HeroVariantsSwitcher() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center font-sans">
      
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
        <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none text-white drop-shadow-2xl">Creative</motion.h1>
        <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.1, ease: "easeOut" }} className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none text-transparent drop-shadow-2xl" style={{ WebkitTextStroke: "2px white" }}>Engineer</motion.h1>
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute bottom-24 right-6 md:bottom-16 md:right-16 z-30 pointer-events-auto">
        <ProExploreButton />
      </motion.div>

      <HeroSocials />

    </section>
  );
}
