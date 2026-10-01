import { useRef, useEffect } from "react";
import { PROJECTS_DATA } from "../constants/data";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { MagneticButton } from "./Footers";
import { FiArrowUpRight } from "react-icons/fi";

const angle = 360 / PROJECTS_DATA.length;

const Card = ({ proj, i, wheelRotateX }) => {
  const itemAngle = -i * angle;
  
  // Calculate the linear rotation of this card in the viewport
  // We avoid modulo 360 here so that cards don't visually "wrap around" 
  // the cylinder (e.g., the last card appearing faintly above the first card).
  const absAngle = useTransform(wheelRotateX, (w) => w + itemAngle);

  // Fade out cards as they rotate away from 0 degrees (front center)
  const opacity = useTransform(absAngle, [-90, -45, 0, 45, 90], [0, 0.4, 1, 0.4, 0]);
  
  // Add a dark overlay that increases as the card moves away to simulate depth/shadow
  const overlayOpacity = useTransform(absAngle, [-90, -45, 0, 45, 90], [0.8, 0.5, 0, 0.5, 0.8]);
  
  // Slightly scale down cards that are not in the direct front focus
  const scale = useTransform(absAngle, [-90, 0, 90], [0.8, 1, 0.8]);

  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 flex flex-col md:flex-row w-[90vw] md:w-[70vw] max-w-6xl h-[60vh] md:h-[70vh] rounded-[40px] bg-[#111] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10 group origin-center cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        x: "-50%",
        y: "-50%",
        rotateX: `${itemAngle}deg`, 
        // Adjusted radius for taller cards.
        z: "clamp(500px, 75vh, 1000px)",
        opacity,
        scale
      }}
      // Critically, we MUST define the transformTemplate to ensure translate is applied BEFORE rotation and Z translation.
      // Otherwise, the wheel math breaks entirely in Framer Motion.
      transformTemplate={({ x, y, rotateX, z, scale }) => 
        `translate(${x}, ${y}) rotateX(${rotateX}) translateZ(${z}) scale(${scale})`
      }
    >
      {/* 3D Depth Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black z-20 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Text Area */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between z-10 relative overflow-hidden">
        {/* Dynamic Inner Glow */}
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
          <MagneticButton href="#" className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/30 flex flex-col items-center justify-center text-white hover:bg-white hover:text-black transition-colors group/btn shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-[#111]/50 backdrop-blur-md">
            <FiArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover/btn:rotate-45 transition-transform" />
            <span className="font-bold mt-1 md:mt-2 uppercase tracking-widest text-[8px] md:text-[10px]">Explore</span>
          </MagneticButton>
        </div>
      </div>
      
      {/* Image Area */}
      <div className="w-full md:w-1/2 h-full absolute md:relative inset-0 md:inset-auto bg-black overflow-hidden">
        <img 
          src={`${proj.img}&fm=webp`} 
          alt={proj.title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-50 md:opacity-80 transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/30 to-transparent opacity-0 md:opacity-100 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent md:hidden pointer-events-none" />
      </div>
    </motion.div>
  );
};

const DottedBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0" style={{ 
    backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 1.5px, transparent 1.5px)', 
    backgroundSize: '40px 40px' 
  }} />
);

export default function StickyStack() {
  const container = useRef(null);
  const numItems = PROJECTS_DATA.length;
  
  // Total scroll height needed to spin through all items
  // 100vh per item gives a nice slow, controlled spin speed
  const scrollHeight = `${numItems * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 -> 1) to wheel rotation (0 -> maxAngle)
  const wheelRotateX = useTransform(scrollYProgress, [0, 1], [0, (numItems - 1) * angle]);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const sectionRef = useRef(null);
  const bounds = useRef({ left: 0, top: 0 });

  useEffect(() => {
    const updateBounds = () => {
      if (sectionRef.current) {
        bounds.current = {
          left: sectionRef.current.offsetLeft,
          top: sectionRef.current.offsetTop
        };
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  function handleMouseMove({ pageX, pageY }) {
    mouseX.set(pageX - bounds.current.left - 500);
    mouseY.set(pageY - bounds.current.top - 500);
  }

  return (
    <section 
      id="projects"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="w-full bg-[#fcfcfc] font-sans z-10 relative overflow-clip"
    >
      {/* Interactive ambient glow tracking mouse */}
      <motion.div
        className="absolute pointer-events-none transition-opacity duration-1000 z-0 w-[1000px] h-[1000px] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          left: 0,
          top: 0,
          background: `radial-gradient(circle, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 40%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      
      <DottedBackground />

      {/* Header - Normal flow so it scrolls out of view naturally, but with reduced spacing */}
      <div className="pt-8 md:pt-12 px-4 md:px-20 pb-0 w-full z-30 relative pointer-events-none">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold uppercase tracking-widest text-black/50 mb-1"
        >
          Selected Works
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-[7vw] font-black uppercase tracking-tighter text-black leading-none"
        >
          Projects
        </motion.h2>
      </div>

      <div ref={container} style={{ height: scrollHeight }} className="relative w-full">
        {/* Sticky viewport container */}
        <div 
          className="sticky top-0 w-full h-screen flex flex-col items-center justify-center"
          style={{ perspective: "2500px" }}
        >
          {/* 3D Wheel Container - Centered naturally to reduce the gap with the scrolling header */}
          <motion.div 
            className="relative w-full h-full flex items-center justify-center pointer-events-auto"
            style={{
              transformStyle: "preserve-3d",
              rotateX: wheelRotateX,
            }}
          >
            {PROJECTS_DATA.map((proj, i) => (
              <Card key={`p_${i}`} proj={proj} i={i} wheelRotateX={wheelRotateX} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Spacer for bottom gap to prevent the next section from rushing in immediately */}
      <div className="h-[5vh] md:h-[10vh] w-full pointer-events-none" />
    </section>
  );
}
