import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter, FiArrowUpRight as ArrowUpRight } from "react-icons/fi";

// Common Magnetic Button (Refactored to anchor tag for semantic linking)
export function MagneticButton({ children, className, href, ...props }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href || "#"}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

// Background Component (Dotted)
const DottedBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
);

// Generic Social Icons Component with Entrance Animation
const SocialIcons = ({ className = "", hoverBg = "#E0FF4F", hoverText = "#000", border = "border-white/30" }) => {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  };
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 12 } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true }} 
      className={`flex gap-4 md:gap-8 ${className}`}
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

// Helper for variants
function MinimalistSplitBase({ 
  bgBox = "bg-[#E0FF4F]", 
  bgButton = "bg-[#FF2A2A] text-white border-white", 
  bgGlow = ["#E0FF4F", "#FF2A2A"], 
  colorText = "text-black", 
  iconColorHover = "hover:text-[#FF2A2A]",
  decorColor = "border-black/20"
}) {
  // GPU-Accelerated coordinates for the glow effect
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    // Offset by 500 to center the 1000x1000px glow circle directly on the cursor
    mouseX.set(clientX - left - 500);
    mouseY.set(clientY - top - 500);
  }

  const textContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const textItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      id="contact"
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col justify-end py-10 px-4 md:px-10 bg-[#111] overflow-hidden relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] group/section"
    >
      {/* Optimized Glow Layer: Uses static background and GPU transforms instead of string recalculation */}
      <motion.div
        className="absolute pointer-events-none opacity-30 group-hover/section:opacity-60 transition-opacity duration-1000 z-0 w-[1000px] h-[1000px] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          left: 0,
          top: 0,
          background: `radial-gradient(circle, ${bgGlow[0]} 0%, ${bgGlow[1]} 30%, transparent 80%)`,
          filter: "blur(60px)",
        }}
      />
      <DottedBackground />
      
      <div className="flex-1 flex items-center justify-center z-20 w-full h-full">
         <motion.div 
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className={`${bgBox} rounded-[40px] w-full max-w-6xl md:h-[60vh] flex flex-col md:flex-row items-center justify-between p-10 md:p-20 shadow-2xl relative overflow-hidden`}
         >
            {/* CSS-based infinite rotation is better for the Main Thread than JS-based Framer Motion for simple infinite loops */}
            <div 
              style={{ animation: 'spin 60s linear infinite reverse' }}
              className={`absolute -right-80 -top-80 w-[1000px] h-[1000px] border-[1px] ${decorColor} rounded-full border-dashed pointer-events-none opacity-50`}
            />
            <div 
              style={{ animation: 'spin 50s linear infinite' }}
              className={`absolute -right-60 -top-60 w-[800px] h-[800px] border-[1px] ${decorColor} rounded-full border-dotted pointer-events-none opacity-50`}
            />
            <div 
              style={{ animation: 'spin 40s linear infinite' }}
              className={`absolute -right-40 -top-40 w-[600px] h-[600px] border-[1px] ${decorColor} rounded-full border-dashed pointer-events-none opacity-50`}
            />
            <div 
              style={{ animation: 'spin 30s linear infinite reverse' }}
              className={`absolute -right-20 -top-20 w-[400px] h-[400px] border-[1px] ${decorColor} rounded-full border-dotted pointer-events-none opacity-50`}
            />
            <div 
              style={{ animation: 'spin 20s linear infinite' }}
              className={`absolute right-0 top-0 w-[200px] h-[200px] border-[1px] ${decorColor} rounded-full border-dashed pointer-events-none opacity-50`}
            />
            
            <motion.div variants={textContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className={`z-10 ${colorText} mb-10 md:mb-0`}>
              <motion.p variants={textItem} className={`text-sm font-bold uppercase tracking-widest mb-4 opacity-70`}>Drop me a line</motion.p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
                <motion.span className="block" variants={textItem}>Let's talk</motion.span>
                <motion.span className="block" variants={textItem}>about your</motion.span>
                <motion.span className="block" variants={textItem}>next idea.</motion.span>
              </h2>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="z-10"
            >
              <MagneticButton href="#" className={`${bgButton} w-40 h-40 rounded-full border flex flex-col items-center justify-center hover:bg-white ${iconColorHover} transition-colors group shadow-2xl`}>
                <ArrowUpRight size={40} className="group-hover:rotate-45 transition-transform" />
                <span className="font-bold mt-2">Email</span>
              </MagneticButton>
            </motion.div>
         </motion.div>
      </div>

      <div className="w-full pt-10 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center z-20 gap-6 text-white">
         <motion.div 
           initial={{ opacity: 0, x: -30 }} 
           whileInView={{ opacity: 1, x: 0 }} 
           transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           viewport={{ once: true }}
           className="text-3xl font-bold tracking-tighter"
         >
           Shojahon Toshov
         </motion.div>
         <SocialIcons hoverBg={bgGlow[0]} hoverText="#000" />
      </div>
    </section>
  );
}

export const FooterMinimalistMono = () => (
  <MinimalistSplitBase 
    bgBox="bg-white" 
    bgButton="bg-black text-white border-black" 
    bgGlow={["#ffffff", "#666666"]} 
    colorText="text-black" 
    iconColorHover="hover:text-black hover:border-black"
    decorColor="border-black/20"
  />
);

