import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter, FiArrowUpRight as ArrowUpRight } from "react-icons/fi";

// Common Magnetic Button
export function MagneticButton({ children, className, ...props }) {
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
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Background Component (Dotted)
const DottedBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
);

// Generic Social Icons Component
const SocialIcons = ({ className = "", hoverBg = "#E0FF4F", hoverText = "#000", border = "border-white/30" }) => (
  <div className={`flex gap-4 md:gap-8 ${className}`}>
    {[Github, Linkedin, Twitter, Mail].map((Icon, idx) => (
      <motion.a
        key={idx} href="#" 
        whileHover={{ scale: 1.1, backgroundColor: hoverBg, color: hoverText, borderColor: hoverBg }}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full border ${border} flex items-center justify-center transition-colors duration-300 z-20`}
        style={{ color: "inherit" }}
      >
        <Icon size={24} strokeWidth={1.5} />
      </motion.a>
    ))}
  </div>
);

// Helper for variants
function MinimalistSplitBase({ 
  bgBox = "bg-[#E0FF4F]", 
  bgButton = "bg-[#FF2A2A] text-white border-white", 
  bgGlow = ["#E0FF4F", "#FF2A2A"], 
  colorText = "text-black", 
  iconColorHover = "hover:text-[#FF2A2A]",
  decorColor = "border-black/20"
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col justify-end py-10 px-4 md:px-10 bg-[#111] overflow-hidden relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] group/section"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30 group-hover/section:opacity-60 transition-opacity duration-1000 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              1000px circle at ${mouseX}px ${mouseY}px,
              ${bgGlow[0]} 0%,
              ${bgGlow[1]} 30%,
              transparent 80%
            )
          `,
          filter: "blur(60px)",
        }}
      />
      <DottedBackground />
      <div className="flex-1 flex items-center justify-center z-20 w-full h-full">
         <div className={`${bgBox} rounded-[40px] w-full max-w-6xl md:h-[60vh] flex flex-col md:flex-row items-center justify-between p-10 md:p-20 shadow-2xl relative overflow-hidden`}>
            <motion.div 
              animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className={`absolute -right-40 -top-40 w-[600px] h-[600px] border-[1px] ${decorColor} rounded-full border-dashed pointer-events-none opacity-50`}
            />
            <motion.div 
              animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className={`absolute -right-20 -top-20 w-[400px] h-[400px] border-[1px] ${decorColor} rounded-full border-dotted pointer-events-none opacity-50`}
            />
            <div className={`z-10 ${colorText} mb-10 md:mb-0`}>
              <p className={`text-sm font-bold uppercase tracking-widest mb-4 opacity-70`}>Drop me a line</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Let's talk<br/>about your<br/>next idea.</h2>
            </div>
            <div className="z-10">
              <MagneticButton className={`${bgButton} w-40 h-40 rounded-full border flex flex-col items-center justify-center hover:bg-white ${iconColorHover} transition-colors group shadow-2xl`}>
                <ArrowUpRight size={40} className="group-hover:rotate-45 transition-transform" />
                <span className="font-bold mt-2">Email</span>
              </MagneticButton>
            </div>
         </div>
      </div>
      <div className="w-full pt-10 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center z-20 gap-6 text-white">
         <div className="text-3xl font-bold tracking-tighter">Shojahon Toshov</div>
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
