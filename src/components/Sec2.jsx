const projects = [
  {
    id: "01",
    title: "Example",
    stack: "React · Tailwind",
    url: "#",
    bg: "bg-gray-200",
  },
];
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../swiper/sec2swiper.css";

// import required modules
import { Pagination } from "swiper/modules";
export default function Sec2() {
  return (
    <section
      id="projects"
      className="bg-[#f5f5f3] rounded-[40px] py-[80px] px-[32px] md:px-[64px] shadow-sm"
    >
      <div className="max-w-[1152px] mx-auto">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-[16px]">
          Selected work
        </p>

        <h2 className="text-[30px] md:text-[36px] font-bold tracking-[-0.03em] text-gray-900 mb-[64px]">
          My projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group block"
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
              duration-300
              border
              border-transparent
              group-hover:shadow-xl
              group-hover:-translate-y-[6px]
              group-hover:border-gray-200
              relative
            `}
              >
                
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors group-hover:text-gray-600">
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
