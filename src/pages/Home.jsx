import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";

import CustomCursor from "../components/CustomCursor";
import StickyStack from "../components/StickyStack";
import { FooterMinimalistMono } from "../components/Footers";
import HeroVariantsSwitcher from "../components/HeroVariants";

export default function Home() {
  const containerRef = useRef(null);
  
  // We no longer need isLoaded here because HeroVariantsSwitcher handles the preloader

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
    
    return () => { 
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
      
      {/* Pro Hero Section with 5 Variants and built-in transition */}
      <HeroVariantsSwitcher />

      {/* NEW STICKY STACK SHOWCASE REPLACING TUNNEL */}
      <StickyStack />

      <FooterMinimalistMono />

    </div>
  );
}
