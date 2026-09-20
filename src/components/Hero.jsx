import { useState } from "react";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="bg-[#f5f5f3] rounded-[40px] px-[32px] md:px-[64px] pt-[40px] pb-[64px] shadow-sm overflow-hidden">
  <Navbar />

  <div className="flex flex-col items-center text-center">
    {/* Avatar */}
    <div className="w-[64px] h-[64px] rounded-full bg-gray-900 flex items-center justify-center text-white font-mono text-[20px] mb-[40px] select-none">
      ST
    </div>

    {/* Badge */}
    <div className="inline-flex items-center gap-[8px] bg-black/5 px-[16px] py-[6px] rounded-full text-[12px] font-semibold text-gray-500 uppercase tracking-widest mb-[32px]">
      <span className="w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse"></span>
      Available for work
    </div>

    {/* Headline */}
    <h1 className="text-[48px] md:text-[72px] font-bold tracking-[-0.04em] text-gray-900 leading-[1.05] max-w-[896px] mb-[24px]">
      Building fast, <span className="text-gray-300">pixel-perfect</span>{" "}
      web products.
    </h1>

    {/* Subline */}
    <p className="text-gray-400 text-[18px] max-w-[448px] leading-relaxed mb-[48px] font-medium">
      Frontend developer from Tashkent — React, Tailwind, TypeScript. I turn
      Figma into real, performant interfaces.
    </p>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row gap-[12px]">
      <a
        href="#projects"
        className="bg-gray-900 text-white px-[32px] py-[16px] rounded-full font-bold text-[14px] hover:bg-gray-700 transition-colors"
      >
        See my work →
      </a>
      <a
        href="#contact"
        className="bg-black/5 text-gray-700 px-[32px] py-[16px] rounded-full font-bold text-[14px] hover:bg-black/10 transition-colors"
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
        className="text-[12px] font-black tracking-[0.15em] text-gray-300 uppercase"
      >
        {tech}
      </span>
    ))}
  </div>
</section>
  );
}
