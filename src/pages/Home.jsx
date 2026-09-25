import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import CustomCursor from "../components/CustomCursor";
import StickyStack from "../components/StickyStack";
import { FooterMinimalistMono } from "../components/Footers";

export default function Home() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Check if it's a touch device to possibly disable custom cursor or smooth scroll
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    let lenis;
    let frameId;
    
    // Only initialize Lenis smooth scroll on non-touch devices for better mobile UX
    if (!isTouchDevice) {
      lenis = new Lenis({ lerp: 0.05, smoothWheel: true });
      function raf(time) {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      }
      frameId = requestAnimationFrame(raf);
    }
    
    // Trigger entrance animation
    const entranceTimeout = setTimeout(() => setIsLoaded(true), 500);
    
    return () => { 
      clearTimeout(entranceTimeout); 
      if (frameId) cancelAnimationFrame(frameId); 
      if (lenis) lenis.destroy(); 
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-white min-h-[300vh] font-sans selection:bg-white selection:text-black overflow-clip relative">
      {/* Conditionally render custom cursor via CSS media queries in its component, or hide on mobile */}
      <div className="hidden md:block">
         <CustomCursor />
      </div>
      
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

        <div className="z-10 relative pointer-events-none">
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
          className="absolute bottom-10 right-10 text-right font-medium text-sm md:text-lg opacity-60 uppercase tracking-widest pointer-events-none"
        >
          <p>Shojahon Toshov</p>
          <p>Fullstack � Game Dev � AI</p>
        </motion.div>
      </section>

      {/* NEW STICKY STACK SHOWCASE REPLACING TUNNEL */}
      <StickyStack />

      <FooterMinimalistMono />

    </div>
  );
}
