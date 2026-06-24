import { useState } from "react";
import Navbar from "./Navbar";

export default function Hero() {
  const [dark, setDark] = useState(false)
  return (
    <section className="bg-[#f5f5f3] dark:bg-[#1a1a17] rounded-[40px] px-[32px] md:px-[64px] pt-[40px] pb-[64px] shadow-sm overflow-hidden">
  <Navbar />

  <div className="flex flex-col items-center text-center">
    {/* Avatar */}
    <div className="w-[64px] h-[64px] rounded-full bg-gray-900 dark:bg-[#f0efe9] dark:text-black flex items-center justify-center text-white font-mono text-[20px] mb-[40px] select-none">
      ST
    </div>

    {/* Badge */}
    <div className="inline-flex items-center gap-[8px] bg-black/5 dark:bg-white/7 px-[16px] py-[6px] rounded-full text-[12px] font-semibold text-gray-500 dark:text-[#9ca3af] uppercase tracking-widest mb-[32px]">
      <span className="w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse"></span>
      Available for work
    </div>

    {/* Headline */}
    <h1 className="text-[48px] md:text-[72px] font-bold tracking-[-0.04em] text-gray-900 dark:text-[#f0efe9] leading-[1.05] max-w-[896px] mb-[24px]">
      Building fast, <span className="text-gray-300 dark:text-[#3a3a36]">pixel-perfect</span>{" "}
      web products.
    </h1>

    {/* Subline */}
    <p className="text-gray-400 dark:text-[#6b7280] text-[18px] max-w-[448px] leading-relaxed mb-[48px] font-medium">
      Frontend developer from Tashkent — React, Tailwind, TypeScript. I turn
      Figma into real, performant interfaces.
    </p>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row gap-[12px]">
      <a
        onClick={() => setDark(true)}
        href="#projects"
        className="bg-gray-900 dark:bg-[#f0efe9] text-white dark:text-[#1a1a17] px-[32px] py-[16px] rounded-full font-bold text-[14px] hover:bg-gray-700 dark:hover:bg-white transition-colors"
      >
        See my work →
      </a>
      <a
        href="#contact"
        className="bg-black/5 dark:bg-white/7 text-gray-700 dark:text-[#9ca3af] px-[32px] py-[16px] rounded-full font-bold text-[14px] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      >
        Get in touch
      </a>
    </div>
  </div>

  {/* Tech strip */}
  <div className="mt-[80px] flex flex-wrap justify-center items-center gap-[32px] md:gap-[56px]">
    {["HTML", "CSS", "TAILWIND", "REACT", "TYPESCRIPT", "FIGMA"].map((tech) => (
      <span
        key={tech}
        className="text-[12px] font-black tracking-[0.15em] text-gray-300 dark:text-[#3a3a36] uppercase"
      >
        {tech}
      </span>
    ))}
  </div>
</section>
  );
}
