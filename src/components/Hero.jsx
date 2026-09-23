import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Hero() {
  const techStack = ["FULLSTACK", "GODOT", "PYTHON", "REACT", "NEXT.JS", "AI ENGINEER"];

  return (
    <section className="w-full bg-[#e8e7e3] pt-[40px] pb-[100px] overflow-hidden relative">
      <div className="max-w-[1152px] mx-auto px-[24px] md:px-[40px]">
        <Navbar />

        <div className="flex flex-col items-center text-center mt-12 md:mt-24">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-[80px] h-[80px] rounded-full bg-gray-900 flex items-center justify-center text-white font-mono text-[24px] mb-[40px] select-none shadow-xl"
          >
            ST
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-[10px] border border-gray-300 bg-white/50 px-[20px] py-[8px] rounded-full text-[13px] font-bold text-gray-600 uppercase tracking-widest mb-[40px]"
          >
            <span className="w-[8px] h-[8px] rounded-full bg-green-500 animate-pulse"></span>
            Available for work
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display font-extrabold tracking-tightest text-gray-900 leading-[0.85] w-full text-center mb-[32px]"
            style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
          >
            CREATIVE <br className="hidden md:block"/> DEVELOPER
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-500 text-[18px] md:text-[24px] max-w-[600px] leading-relaxed mb-[56px] font-medium"
          >
            Shojahon Toshov — Transforming complex problems into elegant, physics-driven digital experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-[16px]"
          >
            <a
              data-cursor="Click"
              href="#projects"
              className="bg-gray-900 text-white px-[48px] py-[20px] rounded-full font-bold text-[16px] hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Explore Work
            </a>
            <a
              data-cursor="Talk"
              href="#contact"
              className="border-2 border-gray-300 text-gray-700 px-[48px] py-[20px] rounded-full font-bold text-[16px] hover:bg-gray-200 transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-[120px] flex flex-wrap justify-center items-center gap-[24px] md:gap-[64px]"
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-[14px] font-bold tracking-[0.2em] text-gray-400 uppercase"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
