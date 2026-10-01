import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, 
  SiPython, SiFastapi, SiNodedotjs, SiPostgresql, SiRedis, 
  SiDocker, SiGraphql, SiJavascript 
} from "react-icons/si";

const frontendSkills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
];

const backendSkills = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339939" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

const RepeatedItems = ({ items }) => (
  <div className="flex gap-8 md:gap-16 items-center px-4 md:px-8 w-max">
    {items.map((skill, idx) => (
      <div key={idx} className="flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300 group cursor-default">
        <skill.icon className="text-3xl md:text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" style={{ color: skill.color }} />
        <span className="text-xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-white drop-shadow-md">{skill.name}</span>
      </div>
    ))}
  </div>
);

const MarqueeRow = ({ items, direction = "left", speed = 20 }) => {
  const repeatedItems = [...items, ...items, ...items];
  return (
    <div className="flex w-full overflow-hidden whitespace-nowrap relative py-2 md:py-4">
      <div className="absolute left-0 top-0 w-20 md:w-40 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 md:w-40 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      <div 
        className="flex w-max"
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
      >
        <RepeatedItems items={repeatedItems} />
        <RepeatedItems items={repeatedItems} />
      </div>
    </div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-white text-black flex flex-col justify-center overflow-hidden pt-32 pb-16 z-10 border-t border-black/10" id="about">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 w-full relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* BIO SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-black/50 mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-black/50"></span>
            Expertise
          </motion.p>
          
          <motion.div style={{ y: yText }}>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Fullstack <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px black" }}>Developer.</span>
            </h2>
            <div className="text-lg md:text-xl text-black/70 space-y-6 font-medium leading-relaxed">
              <p>
                I build scalable web applications designed to drive real business results. My focus is on creating seamless digital products that engage users, optimize workflows, and deliver measurable value from day one.
              </p>
              <p>
                From high-conversion React and Next.js interfaces to rock-solid Python backends, I take ownership of the entire development lifecycle. I help forward-thinking companies turn complex ideas into fast, reliable, and market-ready solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* BENTO GRID STACK */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Frontend Bento */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 hover:bg-[#151515] hover:border-white/20 transition-all group shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <SiJavascript className="w-24 h-24" />
              </div>
              <h3 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-8 relative z-10">Frontend</h3>
              <div className="flex flex-wrap gap-3 relative z-10">
                {frontendSkills.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                    <s.icon style={{ color: s.color }} className="text-lg" />
                    <span className="text-xs font-bold uppercase tracking-wider">{s.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Backend Bento */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 hover:bg-[#151515] hover:border-white/20 transition-all group shadow-2xl relative overflow-hidden md:translate-y-8"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <SiPython className="w-24 h-24" />
              </div>
              <h3 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-8 relative z-10">Backend</h3>
              <div className="flex flex-wrap gap-3 relative z-10">
                {backendSkills.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                    <s.icon style={{ color: s.color }} className="text-lg" />
                    <span className="text-xs font-bold uppercase tracking-wider">{s.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
          </div>
        </div>
        
      </div>

      {/* Infinite Marquee - Runs across the full width below the grids */}
      <div className="mt-32 w-full flex flex-col gap-4 border-y border-black/10 py-12 bg-[#0a0a0a] relative z-10">
        <MarqueeRow items={frontendSkills} direction="left" speed={60} />
        <MarqueeRow items={backendSkills} direction="right" speed={60} />
      </div>

    </section>
  );
}
