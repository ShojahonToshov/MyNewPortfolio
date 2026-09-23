import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { Globe, ArrowDownRight } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter } from "react-icons/fi";
import CustomCursor from "../components/CustomCursor";
import Preloader from "../components/Preloader";

// Helper component for Magnetic Button effect
function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

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

export default function Variant3() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }
    
    return () => lenis.destroy();
  }, [isLoading]);

  return (
    <div ref={containerRef} className="bg-white text-[#1c1d20] min-h-[250vh] font-sans selection:bg-[#1c1d20] selection:text-white relative">
      <CustomCursor />
      <Preloader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-40 mix-blend-difference text-white">
        <div className="font-medium tracking-tight">© Code by Shojahon</div>
        <div className="flex gap-8 font-medium">
          <a data-cursor="hover" href="#" className="hover:opacity-70 transition-opacity group relative">
            Work
            <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></div>
          </a>
          <a data-cursor="hover" href="#" className="hover:opacity-70 transition-opacity group relative">
            About
            <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></div>
          </a>
          <a data-cursor="hover" href="#" className="hover:opacity-70 transition-opacity group relative">
            Contact
            <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></div>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="h-screen relative flex items-end justify-center pb-20 px-8 overflow-hidden bg-[#999d9e] rounded-b-3xl">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Hero abstract" 
            className="w-full h-[120%] object-cover object-center grayscale opacity-80"
          />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-[1400px] flex justify-between items-end text-white mix-blend-difference">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <ArrowDownRight size={32} />
            <h1 className="text-4xl md:text-8xl font-bold tracking-tighter leading-none">
              FULLSTACK <br/> AI ENGINEER
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden md:flex flex-col items-end gap-2 text-xl font-medium max-w-sm text-right"
          >
            <Globe size={24} />
            <p>TypeScript • Python • Godot</p>
          </motion.div>
        </div>
      </section>

      {/* Recent Work - Redesigned to Visual Grid */}
      <section className="py-40 px-8 md:px-16 max-w-[1600px] mx-auto">
        <div className="flex gap-4 items-center mb-20 text-sm font-medium uppercase tracking-widest text-gray-500">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          Featured Projects
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-16">
          {[
            { title: "NEURAL CORE", role: "AI Engineer / Python", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop" },
            { title: "VOID RUNNER", role: "Game Dev / Godot", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop", mt: "md:mt-32" },
            { title: "SYSTEM_X", role: "Fullstack / React", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop" },
            { title: "SYNAPSE", role: "UI/UX / Figma", img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2000&auto=format&fit=crop", mt: "md:mt-32" },
          ].map((work, idx) => (
            <motion.div 
              key={idx} 
              data-cursor="View"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`group cursor-pointer ${work.mt || ""}`}
            >
              <div className="overflow-hidden rounded-2xl mb-6 bg-gray-100 relative aspect-[4/3]">
                <img 
                  src={work.img} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter mb-2 group-hover:translate-x-4 transition-transform duration-500">
                {work.title}
              </h2>
              <p className="text-sm font-medium uppercase tracking-widest text-gray-500 group-hover:translate-x-4 transition-transform duration-500 delay-75">
                {work.role}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <MagneticButton className="border border-gray-300 w-40 h-40 rounded-full flex items-center justify-center text-lg font-medium hover:bg-[#1c1d20] hover:text-white transition-colors duration-300" data-cursor="hover">
            More work
          </MagneticButton>
        </div>
      </section>

      {/* Footer / Contact */}
      <section className="bg-[#1c1d20] text-white py-32 px-8 rounded-t-[50px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="max-w-[1400px] w-full flex flex-col md:flex-row justify-between items-center relative z-10 gap-20 md:gap-0">
          
          <div className="flex flex-col items-start gap-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              Let's work <br/> together
            </h2>
            <div className="flex flex-col gap-4">
              <a data-cursor="hover" href="mailto:info@shojahon.com" className="text-2xl font-medium border-b border-white/30 pb-2 hover:border-white transition-colors">info@shojahon.com</a>
              <a data-cursor="hover" href="tel:+31612345678" className="text-2xl font-medium border-b border-white/30 pb-2 hover:border-white transition-colors">+31 6 12 34 56 78</a>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <MagneticButton className="bg-[#455CE9] text-white w-48 h-48 rounded-full flex items-center justify-center text-xl font-medium" data-cursor="hover">
              Get in touch
            </MagneticButton>
            
            {/* Animated Icons */}
            <div className="flex gap-4 mt-8">
              {[
                { icon: Github, link: "#" },
                { icon: Linkedin, link: "#" },
                { icon: Twitter, link: "#" },
                { icon: Mail, link: "#" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  data-cursor="hover"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: "white", color: "#1c1d20" }}
                  className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
