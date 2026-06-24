export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
  id="contact"
  className="bg-[#f5f5f3] dark:bg-[#1a1a17] rounded-[40px] pt-[80px] pb-[40px] px-[32px] md:px-[64px] shadow-sm"
>
  {/* CTA block */}
  <div className="text-center mb-[80px]">
    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-[#6b7280] mb-[24px]">
      Let's work together
    </p>

    <h2 className="text-[36px] md:text-[60px] font-bold tracking-[-0.04em] text-gray-900 dark:text-[#f0efe9] leading-[1.05] mb-[48px]">
      Tell me about your
      <br />
      next project
    </h2>

    <div className="flex flex-col sm:flex-row justify-center gap-[12px]">
      <a 
        href="mailto:shojahon.toshov@gmail.com"
        className="inline-flex items-center justify-center gap-[8px] bg-gray-900 dark:bg-[#f0efe9] text-white dark:text-[#1a1a17] px-[40px] py-[16px] rounded-full font-bold text-[14px] hover:bg-gray-700 dark:hover:bg-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
          <rect x="2" y="4" width="20" height="16" rx="2" />
        </svg>
        Email me
      </a>

      <a 
        href="https://t.me/shojahon_toshov"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-[8px] bg-black/5 dark:bg-[rgba(255,255,255,0.07)] text-gray-700 dark:text-[#9ca3af] px-[40px] py-[16px] rounded-full font-bold text-[14px] hover:bg-black/10 dark:hover:bg-[rgba(255,255,255,0.12)] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
        Telegram
      </a>

      <a 
        href="tel:+998914125808"
        className="inline-flex items-center justify-center gap-[8px] bg-black/5 dark:bg-[rgba(255,255,255,0.07)] text-gray-700 dark:text-[#9ca3af] px-[40px] py-[16px] rounded-full font-bold text-[14px] hover:bg-black/10 dark:hover:bg-[rgba(255,255,255,0.12)] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        +998 91 412 58 08
      </a>
    </div>
  </div>

  {/* Divider */}
  <div className="w-full h-[1px] bg-gray-200 dark:bg-[rgba(255,255,255,0.07)] mb-[32px]" />

  {/* Bottom bar */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-[16px] text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300 dark:text-[#3a3a36]">
    <p>© {year} Shojahon Toshov. All rights reserved.</p>

    <div className="flex gap-[24px]">
      <a href="https://t.me/shojahon_toshov" target="_blank" rel="noreferrer"
        className="hover:text-gray-900 dark:hover:text-[#f0efe9] transition-colors">
        Telegram
      </a>
      <a href="https://github.com" target="_blank" rel="noreferrer"
        className="hover:text-gray-900 dark:hover:text-[#f0efe9] transition-colors">
        GitHub
      </a>
      <a href="mailto:shojahon.toshov@gmail.com"
        className="hover:text-gray-900 dark:hover:text-[#f0efe9] transition-colors">
        Email
      </a>
    </div>
  </div>
</footer>
  )
}