import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const skills = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
    title: 'Pixel Perfection',
    desc: 'Your Figma designs look identical in the browser. Clean, maintainable code — no shortcuts.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'Reliability',
    desc: 'No ghosting, no excuses. Daily updates, tracked progress, and delivery on time — every time.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
      </svg>
    ),
    title: 'Modern Stack',
    desc: 'React, Tailwind, TypeScript — fast, interactive, scalable apps built with industry-standard tools.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 14.83 4.24 4.24"/>
        <path d="m14.83 9.17 4.24-4.24"/><path d="m4.93 19.07 4.24-4.24"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
    title: 'Full Support',
    desc: 'From the first commit to final deployment. Optimized for performance and ready to scale.',
  },
]

function SpotlightCard({ s }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col gap-[16px] p-6 rounded-3xl overflow-hidden border border-transparent hover:border-gray-200 transition-colors bg-white/50"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(250px circle at ${x}px ${y}px, rgba(200, 200, 200, 0.4), transparent 80%)`
          ),
        }}
      />
      <div className="relative z-10 text-gray-400 group-hover:text-gray-900 transition-colors">{s.icon}</div>
      <h3 className="relative z-10 font-bold text-gray-900">{s.title}</h3>
      <p className="relative z-10 text-[14px] text-gray-500 leading-relaxed">{s.desc}</p>
    </div>
  );
}

export default function Sec1() {
  return (
    <section id="about" className="w-full bg-[#e8e7e3] py-[100px]">
      <div className="max-w-[1152px] mx-auto px-[24px] md:px-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-[16px]">What I bring</p>
          <h2 className="font-display text-[40px] md:text-[56px] font-bold tracking-tight text-gray-900 mb-[64px]">
            The value I deliver
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]"
        >
          {skills.map((s) => (
            <motion.div 
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
            >
              <SpotlightCard s={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
