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

export default function Sec1() {
  return (
    <section id="about" className="bg-[#f5f5f3] dark:bg-[#1a1a17] rounded-[40px] py-[80px] px-[32px] md:px-[64px] shadow-sm">
  <div className="max-w-[1024px] mx-auto">
    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-[#6b7280] mb-[16px]">What I bring</p>
    <h2 className="text-[30px] md:text-[36px] font-bold tracking-[-0.03em] text-gray-900 dark:text-[#f0efe9] mb-[64px]">
      The value I deliver
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px]">
      {skills.map((s) => (
        <div key={s.title} className="flex flex-col gap-[16px]">
          <div className="text-gray-400 dark:text-[#6b7280]">{s.icon}</div>
          <h3 className="font-bold text-gray-900 dark:text-[#f0efe9]">{s.title}</h3>
          <p className="text-[14px] text-gray-400 dark:text-[#6b7280] leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}