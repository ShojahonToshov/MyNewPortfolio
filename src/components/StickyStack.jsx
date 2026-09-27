import { useRef, useState } from "react";
import { PROJECTS_DATA } from "../constants/data";
import { motion, useMotionValue } from "framer-motion";
import { MagneticButton } from "./Footers";
import { FiArrowUpRight } from "react-icons/fi";

const DottedBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0" style={{ 
    backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 1.5px, transparent 1.5px)', 
    backgroundSize: '40px 40px' 
  }} />
);

export default function StickyStack() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - 500);
    mouseY.set(clientY - top - 500);
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="w-full bg-[#fcfcfc] min-h-screen pt-32 pb-64 px-4 md:px-20 font-sans z-10 relative overflow-hidden group/section"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute pointer-events-none transition-opacity duration-1000 z-0 w-[1000px] h-[1000px] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          left: 0,
          top: 0,
          background: `radial-gradient(circle, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 40%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      
      <DottedBackground />

      {/* Decorative Spinning Rings in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] pointer-events-none z-0">
        <div style={{ animation: 'spin 60s linear infinite reverse' }} className="absolute inset-0 border-[1px] border-black/5 rounded-full border-dashed" />
        <div style={{ animation: 'spin 50s linear infinite' }} className="absolute inset-10 border-[1px] border-black/5 rounded-full border-dotted" />
        <div style={{ animation: 'spin 40s linear infinite reverse' }} className="absolute inset-20 border-[1px] border-black/5 rounded-full border-dashed" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Section Header */}
        <div className="mb-4 md:mb-10 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-black/50 mb-2"
          >
            Selected Works
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black"
          >
            Projects
          </motion.h2>
        </div>

        {/* Project Cards */}
        {PROJECTS_DATA.map((proj, i) => {
          const topOffset = 100 + i * 40;
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="sticky overflow-hidden rounded-[40px] h-[60vh] md:h-[70vh] w-full border border-white/10 flex flex-col md:flex-row group shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer bg-[#111]"
              style={{ top: `${topOffset}px` }}
            >
              {/* Text Area */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-between z-10 relative overflow-hidden">
                {/* Internal Glow for Card based on Project Color */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at left top, ${proj.color} 0%, transparent 60%)` }}
                />
                
                <div>
                  <span className="text-sm font-bold tracking-widest uppercase z-10" style={{ color: proj.color }}>{proj.role}</span>
                  <h3 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-[0.9] mt-4 z-10">
                    {proj.title}
                  </h3>
                </div>

                <div className="mt-8 z-10">
                  <MagneticButton href="#" className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/30 flex flex-col items-center justify-center text-white hover:bg-white hover:text-black transition-colors group/btn shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-[#111]/50 backdrop-blur-md">
                    <FiArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover/btn:rotate-45 transition-transform" />
                    <span className="font-bold mt-1 md:mt-2 uppercase tracking-widest text-[8px] md:text-[10px]">Explore</span>
                  </MagneticButton>
                </div>
              </div>
              
              {/* Image Area */}
              <div className="w-full md:w-1/2 h-full absolute md:relative inset-0 md:inset-auto bg-black overflow-hidden">
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-40 md:opacity-70 transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/30 to-transparent opacity-0 md:opacity-100 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent md:hidden pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
