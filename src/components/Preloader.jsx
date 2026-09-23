import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
  "Привет",
];

export default function Preloader({ isLoading, onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return; // Stop if already loaded
    if (index === words.length - 1) {
      setTimeout(() => {
        onComplete();
      }, 800); // Wait a bit after the last word
      return;
    }

    const timeout = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 1000 : 150 // First word stays longer
    );

    return () => clearTimeout(timeout);
  }, [index, onComplete, isLoading]);

  const slideUp = {
    initial: { y: 0 },
    exit: {
      y: "-150vh",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#121415] text-[#f0efe9]"
        >
          <div className="flex items-center text-[42px] md:text-[56px] font-medium font-sans">
            <span className="w-3 h-3 bg-white rounded-full mr-5 inline-block" />
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {words[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <svg 
            className="absolute top-full left-0 w-full h-[30vh]" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0 0 L100 0 L100 0 Q50 150 0 0 Z" 
              fill="#121415" 
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
