import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Sec1 from "../components/Sec1";
import Sec2 from "../components/Sec2";
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
      window.scrollTo(0, 0);
    }

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#e8e7e3] text-gray-900 transition-colors duration-300 relative">
      <CustomCursor />
      
      <Preloader isLoading={isLoading} onComplete={() => setIsLoading(false)} />

      <main className="flex flex-col w-full">
        <Hero />
        <Sec1 />
        <Sec2 />
        <Footer />
      </main>
    </div>
  );
}
