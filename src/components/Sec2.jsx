const projects = [
  {
    id: "01",
    title: "Example",
    stack: "React · Tailwind",
    url: "#",
    bg: "bg-gray-200",
  },
];

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Sec2() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  });

  // Content moves slightly slower than the scroll, creating a parallax reveal from under the curve.
  // Using fixed pixels instead of % to prevent it from moving too far up and eating the padding.
  const y = useTransform(scrollYProgress, [0, 1], ["-150px", "0px"]);

  return (
    <div ref={container} className="w-full relative bg-white overflow-hidden">
      {/* Downward curve transition from previous section */}
      <svg 
        className="absolute top-0 left-0 w-full h-[8vw] fill-[#e8e7e3] z-20" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path d="M0 0 L100 0 L100 0 Q50 200 0 0 Z" />
      </svg>

      <motion.section
        id="projects"
        className="relative w-full pt-[240px] pb-[160px] z-10"
        style={{ y }}
      >
        <div className="max-w-[1152px] mx-auto px-[24px] md:px-[40px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-[16px]">
              Selected work
            </p>

            <h2 className="font-display text-[40px] md:text-[56px] font-bold tracking-tight text-gray-900 mb-[64px]">
              My projects
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {projects.map((p, index) => (
              <motion.a
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 0.98 }}
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group block"
                data-cursor="View"
              >
                <div
                  className={`
                    ${p.bg}
                    rounded-[24px]
                    aspect-[4/5]
                    mb-[16px]
                    overflow-hidden
                    flex
                    items-end
                    p-[20px]
                    transition-all
                    duration-500
                    border
                    border-transparent
                    group-hover:shadow-2xl
                    relative
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.15em] text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    View project ↗
                  </span>
                </div>

                <div className="px-[4px]">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">
                      {p.title}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-300 transition-colors group-hover:text-gray-500">
                      {p.id}
                    </span>
                  </div>

                  <p className="mt-[4px] text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                    {p.stack}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
