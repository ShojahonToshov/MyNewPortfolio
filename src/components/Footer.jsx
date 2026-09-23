import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  // Footer moves up slowly as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-150px", "0px"]);

  return (
    <div ref={container} className="w-full relative bg-[#121415] overflow-hidden">
      {/* Downward curve transition from previous section (static at the top) */}
      <svg 
        className="absolute top-0 left-0 w-full h-[8vw] fill-white z-20" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path d="M0 0 L100 0 L100 0 Q50 200 0 0 Z" />
      </svg>

      <motion.footer
        id="contact"
        className="relative w-full text-white pt-[260px] pb-[40px] z-10"
        style={{ y }}
      >
        <div className="max-w-[1152px] mx-auto px-[24px] md:px-[40px] relative z-10">
          <div className="flex flex-col items-center text-center mb-[100px]">
            <h2 className="font-display text-[40px] md:text-[80px] font-bold tracking-tight mb-[32px] text-gray-400">
              Have an idea?
            </h2>

            <a
              data-cursor="Let's Talk"
              href="mailto:shojahon.toshov@gmail.com"
              className="group relative inline-block overflow-hidden"
            >
              <span className="font-display text-[60px] md:text-[140px] font-extrabold tracking-tightest leading-none text-transparent transition-colors duration-500 group-hover:text-white" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>
                GET IN TOUCH
              </span>
              <div className="absolute left-0 bottom-0 w-full h-0 bg-white mix-blend-difference transition-all duration-500 group-hover:h-full z-[-1]" />
            </a>
          </div>

          <div className="w-full h-[1px] bg-white/10 mb-[32px]" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-[16px] text-[12px] font-bold uppercase tracking-[0.15em] text-gray-400">
            <p>© {year} Shojahon Toshov</p>
            <div className="flex gap-[32px]">
              <a href="https://t.me/shojahon_toshov" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" data-cursor="Open">Telegram</a>
              <a href="https://github.com/ShojahonToshov" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" data-cursor="Open">GitHub</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}