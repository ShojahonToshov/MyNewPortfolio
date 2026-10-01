"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import Lenis from "lenis";

import CustomCursor from "../components/CustomCursor";
import HeroVariantsSwitcher from "../components/HeroVariants";
import FloatingNavbar from "../components/FloatingNavbar";
import EntryExperience from "../components/EntryExperience";

const StickyStack = dynamic(() => import("../components/StickyStack"), { ssr: false });
const FooterMinimalistMono = dynamic(() => import("../components/Footers").then(m => m.FooterMinimalistMono), { ssr: false });
const About = dynamic(() => import("../components/About"), { ssr: false });

export default function Home() {
  const containerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    
    let lenis;
    let frameId;
    
    if (!isTouch) {
      lenis = new Lenis({ lerp: 0.05, smoothWheel: true });
      window.lenis = lenis;
      
      function raf(time) {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      }
      frameId = requestAnimationFrame(raf);
    }
    
    return () => { 
      if (frameId) cancelAnimationFrame(frameId); 
      if (lenis) {
        lenis.destroy(); 
        delete window.lenis;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-white min-h-[300vh] font-sans selection:bg-white selection:text-black overflow-clip relative">
      <EntryExperience>
        {!isTouchDevice && (
          <div className="hidden md:block">
             <CustomCursor />
          </div>
        )}
        <FloatingNavbar />
        <HeroVariantsSwitcher />
        <About />
        <StickyStack />
        <FooterMinimalistMono />
      </EntryExperience>
    </div>
  );
}
