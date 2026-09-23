import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { ArrowRight } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter } from "react-icons/fi";
import CustomCursor from "../components/CustomCursor";

// Magnetic Button
function MagneticButton({ children, className }) {
  const ref = React.useRef(null);
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

export default function Variant2() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    setTimeout(() => setIsLoaded(true), 800);
    
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#f1f1f1] text-[#212121] min-h-screen font-sans selection:bg-[#CDEA68] selection:text-black overflow-hidden">
      <CustomCursor />
      
      {/* Unique Entrance Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ height: "100vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#CDEA68] flex items-center justify-center overflow-hidden origin-top"
          >
            <motion.h1 
              exit={{ opacity: 0, y: -50 }}
              className="text-8xl md:text-[10vw] font-bold tracking-tighter text-black uppercase"
            >
              Loading
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-[#f1f1f1]/80 backdrop-blur-md">
        <div className="font-bold text-2xl tracking-tighter">Shojahon.</div>
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <a href="#" data-cursor="hover" className="hover:text-[#99ad4d] transition-colors">Services</a>
          <a href="#" data-cursor="hover" className="hover:text-[#99ad4d] transition-colors">Our Work</a>
          <a href="#" data-cursor="hover" className="hover:text-[#99ad4d] transition-colors">About Us</a>
          <a href="#" data-cursor="hover" className="hover:text-[#99ad4d] transition-colors">Insights</a>
        </div>
        <button data-cursor="hover" className="bg-[#212121] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#CDEA68] hover:text-black transition-colors">
          Contact Us
        </button>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-between">
        <div>
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-[9vw] font-bold tracking-tighter uppercase leading-[0.8]"
            >
              FULLSTACK
            </motion.h1>
          </div>
          <div className="overflow-hidden flex items-center gap-4">
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="hidden md:block w-32 h-20 bg-[#CDEA68] rounded-xl flex-shrink-0"
            />
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[12vw] md:text-[9vw] font-bold tracking-tighter uppercase leading-[0.8]"
            >
              GAME DEV &
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[12vw] md:text-[9vw] font-bold tracking-tighter uppercase leading-[0.8]"
            >
              AI ENGINEER
            </motion.h1>
          </div>
        </div>

        <div className="mt-20 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-lg font-medium">JavaScript • TypeScript • Python</p>
          <p className="text-lg font-medium">Godot • Figma • React</p>
          <button data-cursor="hover" className="flex items-center gap-2 uppercase font-medium border border-gray-400 px-6 py-2 rounded-full hover:bg-[#212121] hover:text-white transition-all">
            Start the project
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-[#004D43] py-24 rounded-t-3xl rounded-b-3xl overflow-hidden relative z-10 flex items-center -mt-10">
        <div className="w-full border-t border-b border-[#006053] flex whitespace-nowrap overflow-hidden py-4">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
            className="flex"
          >
            {[...Array(4)].map((_, i) => (
              <h1 key={i} className="text-[25vw] font-bold text-white uppercase leading-none tracking-tighter px-10">
                Shojahon
              </h1>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Asymmetrical Grid / About */}
      <section className="py-32 px-6 md:px-12 bg-[#CDEA68] rounded-3xl -mt-10 relative z-20 text-black">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight w-full md:w-[80%] mb-16 leading-tight">
          I am a versatile engineer building seamless digital products. Whether it's crafting scalable fullstack apps, developing interactive Godot games, or integrating AI pipelines, I bridge the gap between design and deep tech.
        </h2>
        
        <div className="border-t border-[#a1b562] pt-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-6xl font-bold tracking-tighter mb-6">Our approach:</h3>
            <button data-cursor="hover" className="bg-[#212121] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-black transition-colors flex items-center gap-4 group">
              Read More
              <div className="w-2 h-2 rounded-full bg-white group-hover:scale-[3] transition-transform" />
            </button>
          </div>
          <div className="h-[400px] bg-black/10 rounded-2xl overflow-hidden group relative">
            <motion.img 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
        </div>
      </section>

      {/* Featured Projects (Asymmetrical Grid) */}
      <section className="py-32 px-6 md:px-12 bg-[#f1f1f1] relative z-20 text-[#212121]">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 uppercase border-b border-gray-300 pb-8">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {[
            { title: "NEURAL CORE", desc: "AI / Python", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop", align: "" },
            { title: "VOID RUNNER", desc: "Godot / C#", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop", align: "md:mt-32" },
            { title: "SYSTEM_X", desc: "React / Node", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop", align: "" },
            { title: "SYNAPSE", desc: "UI / UX", img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2000&auto=format&fit=crop", align: "md:mt-32" },
          ].map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col group cursor-pointer ${project.align}`}
              data-cursor="View"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#212121]" />
                <h3 className="text-xl font-bold uppercase tracking-widest">{project.title}</h3>
              </div>
              <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative shadow-lg">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex gap-2 mt-6">
                <span className="border border-gray-400 rounded-full px-4 py-1 text-sm font-medium uppercase">{project.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact with Animated Icons */}
      <section className="min-h-screen bg-[#212121] text-white rounded-t-3xl relative z-30 pt-32 pb-20 flex flex-col items-center justify-between px-6">
        <div className="text-center flex-grow flex flex-col justify-center">
          <h2 className="text-[15vw] font-bold tracking-tighter leading-none uppercase">
            Ready
          </h2>
          <h2 className="text-[15vw] font-bold tracking-tighter leading-none uppercase -mt-4">
            To Start?
          </h2>
          <div className="mt-16 md:mt-24 mb-12">
            <MagneticButton className="bg-[#CDEA68] text-black w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center text-lg md:text-2xl font-bold hover:bg-white transition-colors mx-auto" data-cursor="Talk">
              START PROJECT
            </MagneticButton>
          </div>
        </div>
        
        <div className="w-full border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="opacity-50">© 2026 Shojahon Toshov</p>
          <div className="flex gap-6">
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
                whileHover={{ y: -8, scale: 1.1, color: "#CDEA68" }}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-colors"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
