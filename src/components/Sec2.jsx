const projects = [
  {
    id: "01",
    title: "Flora",
    stack: "JavaScript",
    url: "#",
    bg: "bg-stone-200",
  },
  {
    id: "02",
    title: "Maksan Group",
    stack: "JavaScript",
    url: "#",
    bg: "bg-zinc-200",
  },
  {
    id: "03",
    title: "School Website",
    stack: "HTML",
    url: "https://school123-two.vercel.app",
    bg: "bg-neutral-200",
  },
  {
    id: "04",
    title: "Education",
    stack: "HTML",
    url: "#",
    bg: "bg-gray-200",
  },
  {
    id: "05",
    title: "Uzbekistan Journeys",
    stack: "HTML",
    url: "#",
    bg: "bg-slate-200",
  },
  {
    id: "06",
    title: "Weather App",
    stack: "JavaScript",
    url: "#",
    bg: "bg-stone-300",
  },
  {
    id: "07",
    title: "Shifton",
    stack: "HTML",
    url: "https://figmaproject-shift.vercel.app/",
    bg: "bg-zinc-300",
  },
  {
    id: "08",
    title: "Cinema",
    stack: "JavaScript",
    url: "#",
    bg: "bg-neutral-300",
  },
  {
    id: "09",
    title: "MaxWay",
    stack: "HTML",
    url: "https://maxway-one.vercel.app",
    bg: "bg-gray-300",
  },
  {
    id: "10",
    title: "AirPods Landing",
    stack: "HTML",
    url: "#",
    bg: "bg-slate-300",
  },
  {
    id: "11",
    title: "Tingla",
    stack: "HTML",
    url: "#",
    bg: "bg-stone-400",
  },
  {
    id: "12",
    title: "SQ-R3",
    stack: "JavaScript",
    url: "#",
    bg: "bg-zinc-400",
  },
  {
    id: "13",
    title: "Krovlya52",
    stack: "JavaScript",
    url: "#",
    bg: "bg-neutral-400",
  },
  {
    id: "14",
    title: "Genius Store",
    stack: "JavaScript",
    url: "#",
    bg: "bg-gray-400",
  },
  {
    id: "15",
    title: "My New Portfolio",
    stack: "React · JavaScript",
    url: "#",
    bg: "bg-slate-400",
  },
  {
    id: "16",
    title: "My Shop",
    stack: "React · JavaScript",
    url: "#",
    bg: "bg-stone-500",
  },
  {
    id: "17",
    title: "Fake Shop",
    stack: "React · JavaScript",
    url: "#",
    bg: "bg-zinc-500",
  },
  {
    id: "18",
    title: "UY",
    stack: "HTML",
    url: "#",
    bg: "bg-neutral-500",
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
      className="bg-[#f5f5f3] dark:bg-[#1a1a17] rounded-[40px] py-[80px] px-[32px] md:px-[64px] shadow-sm"
    >
      <div className="max-w-[1152px] mx-auto">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-[#6b7280] mb-[16px]">
          Selected work
        </p>

        <h2 className="text-[30px] md:text-[36px] font-bold tracking-[-0.03em] text-gray-900 dark:text-[#f0efe9] mb-[64px]">
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
              dark:brightness-[0.15]
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
              dark:group-hover:border-white/10 relative
            `}
              >
                
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-[#6b7280] transition-colors group-hover:text-gray-600 dark:group-hover:text-[#9ca3af]">
                  View project ↗
                </span>
              </div>

              <div className="px-[4px]">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 dark:text-[#f0efe9]">
                    {p.title}
                  </h4>
                  <span className="text-[10px] font-bold text-gray-300 dark:text-[#3a3a36] transition-colors group-hover:text-gray-500 dark:group-hover:text-[#6b7280]">
                    {p.id}
                  </span>
                </div>

                <p className="mt-[4px] text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-400 dark:text-[#6b7280]">
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
