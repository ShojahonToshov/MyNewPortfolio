import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Globe, ArrowDownRight } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter } from "react-icons/fi";
import CustomCursor from "../components/CustomCursor";

// Magnetic Button
function MagneticButton({ children, className }) {
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
    >
      {children}
    </motion.button>
  );
}

export default function Variant1() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const imgParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 500);
    
    return () => lenis.destroy();
  }, []);

  const projects = [
    { title: "NEURAL CORE", role: "AI Engineer", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop" },
    { title: "VOID RUNNER", role: "Game Dev", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" },
    { title: "SYSTEM_X", role: "Fullstack", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop" },
  ];

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-white min-h-[300vh] font-sans selection:bg-white selection:text-black overflow-hidden relative">
      <CustomCursor />
      
      {/* Unique Entrance Animation: Split Screen Reveal */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div className="fixed inset-0 z-[100] flex">
            <motion.div 
              initial={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="w-full h-1/2 bg-white flex items-end justify-center pb-4"
            >
              <h1 className="text-black text-6xl font-bold tracking-tighter overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} className="block">INITIALIZING</motion.span>
              </h1>
            </motion.div>
            <motion.div 
              initial={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="w-full h-1/2 bg-white absolute bottom-0 flex items-start justify-center pt-4"
            >
              <h1 className="text-black text-6xl font-bold tracking-tighter overflow-hidden">
                <motion.span initial={{ y: "-100%" }} animate={{ y: 0 }} className="block">SYSTEM</motion.span>
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <section className="h-screen flex flex-col justify-center px-8 md:px-20 relative">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="bg" />
        </motion.div>

        <div className="z-10 relative">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }} animate={isLoaded ? { y: 0 } : {}} transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-[10vw] font-bold tracking-tighter leading-[0.8] mb-4"
            >
              CREATIVE
            </motion.h1>
          </div>
          <div className="overflow-hidden flex items-center gap-8">
            <motion.div 
              initial={{ scaleX: 0 }} animate={isLoaded ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 1, ease: [0.76, 0, 0.24, 1] }}
              className="w-24 md:w-48 h-4 bg-white origin-left"
            />
            <motion.h1 
              initial={{ y: "100%" }} animate={isLoaded ? { y: 0 } : {}} transition={{ duration: 1, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="text-[10vw] font-bold tracking-tighter leading-[0.8] text-gray-500"
            >
              ENGINEER
            </motion.h1>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={isLoaded ? { opacity: 1 } : {}} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 right-10 text-right font-medium text-sm md:text-lg opacity-60 uppercase tracking-widest"
        >
          <p>Shojahon Toshov</p>
          <p>Fullstack • Game Dev • AI</p>
        </motion.div>
      </section>

      {/* Projects Grid (Applying the successful Variant 3 design + heavy parallax) */}
      <section className="py-40 px-8 md:px-20 max-w-[1800px] mx-auto z-10 relative bg-[#0a0a0a]">
        <div className="flex gap-4 items-center mb-32 text-sm font-medium uppercase tracking-widest opacity-50">
          <div className="w-2 h-2 rounded-full bg-white" /> Featured Work
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((work, idx) => (
            <motion.div 
              key={idx} 
              data-cursor="View"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row gap-12 items-center group cursor-pointer ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl relative">
                <motion.img 
                  style={{ y: imgParallax }}
                  src={work.img} 
                  alt={work.title} 
                  className="absolute inset-0 w-full h-[140%] -top-[20%] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 overflow-hidden">
                  <motion.span className="block" whileHover={{ x: 20 }} transition={{ duration: 0.3 }}>
                    {work.title}
                  </motion.span>
                </h2>
                <p className="text-xl text-gray-500 uppercase tracking-widest">{work.role}</p>
                <div className="mt-8 border-t border-white/20 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm">Technologies: React, Godot, Python</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / Contact (Applying Magnetic Buttons) */}
      <section className="min-h-screen flex flex-col justify-center items-center py-32 px-8 relative overflow-hidden bg-white text-black rounded-t-[50px] z-20">
        <div className="text-center">
          <h2 className="text-[12vw] font-bold tracking-tighter leading-none mb-12">LET'S TALK</h2>
          
          <MagneticButton className="bg-black text-white w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center text-2xl font-bold tracking-tighter" data-cursor="hover">
            info@shojahon.com
          </MagneticButton>
        </div>

        <div className="absolute bottom-10 w-full px-12 flex justify-between items-center font-medium">
          <p className="opacity-50">© 2026</p>
          <div className="flex gap-4">
            {[Github, Linkedin, Twitter, Mail].map((Icon, idx) => (
              <motion.a
                key={idx} href="#" data-cursor="hover"
                whileHover={{ y: -8, scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center transition-colors duration-300"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
