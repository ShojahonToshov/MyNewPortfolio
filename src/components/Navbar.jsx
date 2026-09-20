import { useState } from "react";

export default function Navbar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("shojahon.toshov@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-16 text-sm font-medium text-gray-500">
      <div className="flex items-center gap-3">
        <span className="font-semibold tracking-tight text-gray-900">
          shojahon.toshov@gmail.com
        </span>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-full transition-colors font-medium bg-black/5 text-gray-600 hover:bg-black/10"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <div className="flex items-center gap-1 text-gray-400">
        <a href="https://t.me/shojahon_toshov" target="_blank" rel="noreferrer"
          className="transition-colors px-2 hover:text-gray-900">
          Telegram
        </a>
        <span>/</span>
        <a href="https://github.com/ShojahonToshov" target="_blank" rel="noreferrer"
          className="transition-colors px-2 hover:text-gray-900">
          GitHub
        </a>
        <span>/</span>
        <a href="mailto:shojahon.toshov@gmail.com"
          className="transition-colors px-2 hover:text-gray-900">
          Email
        </a>
      </div>
    </nav>
  );
}
