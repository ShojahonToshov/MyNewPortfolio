
import { useState } from "react";
import { Moon, Sun } from "lucide-react";


export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(false);
  const Theme = function () {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("shojahon.toshov@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-16 text-sm font-medium text-gray-500 dark:text-[#6b7280]">
  <div className="flex items-center gap-3">
    <span className="font-semibold tracking-tight text-gray-900 dark:text-[#f0efe9]">
      shojahon.toshov@gmail.com
    </span>
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1.5 rounded-full transition-colors font-medium bg-black/5 text-gray-600 hover:bg-black/10 dark:bg-[rgba(255,255,255,0.07)] dark:text-[#9ca3af] dark:hover:bg-[rgba(255,255,255,0.12)]"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
    <div onClick={() => Theme()} className="cursor-pointer bg-amber-100 rounded-full p-1.5 transition-colors bg-black/5 text-gray-600 hover:bg-black/10 dark:bg-[rgba(255,255,255,0.07)] dark:text-[#9ca3af] dark:hover:bg-[rgba(255,255,255,0.12)]">
      {dark ? (
        <Sun size={20} className="text-[#9ca3af] hover:text-[#f0efe9] transition-colors" />
      ) : (
        
        <Moon size={20} className="text-gray-400 hover:text-gray-900 transition-colors" />
      )}
    </div>
  </div>
  <div className="flex items-center gap-1 text-gray-400 dark:text-[#6b7280]">
    <a href="https://t.me/shojahon_toshov" target="_blank" rel="noreferrer"
      className="transition-colors px-2 hover:text-gray-900 dark:hover:text-[#f0efe9]">
      Telegram
    </a>
    <span>/</span>
    <a href="https://github.com" target="_blank" rel="noreferrer"
      className="transition-colors px-2 hover:text-gray-900 dark:hover:text-[#f0efe9]">
      GitHub
    </a>
    <span>/</span>
    <a href="mailto:shojahon.toshov@gmail.com"
      className="transition-colors px-2 hover:text-gray-900 dark:hover:text-[#f0efe9]">
      Email
    </a>
  </div>
</nav>
  );
}
