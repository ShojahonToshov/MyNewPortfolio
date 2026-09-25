import { PROJECTS_DATA } from "../constants/data";

export default function StickyStack() {
  return (
    <section className="w-full bg-[#0a0a0a] min-h-screen pt-32 pb-64 px-4 md:px-20 font-sans z-10 relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Title Section */}
        <div className="mb-10 md:mb-20">
           <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white/50 mb-4">
              <div className="w-2 h-2 bg-white" />
              TANLANGAN ISHLAR
            </div>
            <h2 className="text-white text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-[0.9]">
              PORTFOLIOMIZ
            </h2>
        </div>
        
        {/* Project Cards */}
        {PROJECTS_DATA.map((proj, i) => {
          // Cards stick progressively lower
          const topOffset = 100 + i * 40;
          return (
            <div 
              key={i} 
              data-cursor="View"
              className="sticky overflow-hidden rounded-[24px] h-[60vh] md:h-[70vh] w-full border border-white/10 flex flex-col md:flex-row group shadow-2xl cursor-pointer"
              style={{ top: `${topOffset}px`, backgroundColor: '#111' }}
            >
              {/* Text Area */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between z-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
                <span className="text-sm font-bold tracking-widest uppercase text-white/50 z-10">{proj.role}</span>
                <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[0.9] z-10" style={{ color: proj.color }}>{proj.title}</h3>
              </div>
              
              {/* Image Area */}
              <div className="w-full md:w-1/2 h-full absolute md:relative inset-0 md:inset-auto bg-black">
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-40 md:opacity-100 transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:hidden to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
