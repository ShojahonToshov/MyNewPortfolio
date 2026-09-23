import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState("default"); // default, hover, text
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Faster spring for a more responsive, physical feel
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Look up the DOM tree for a data-cursor attribute
      const cursorElement = target.closest("[data-cursor]");
      
      if (cursorElement) {
        const type = cursorElement.getAttribute("data-cursor");
        if (type === "hover") {
          setCursorState("hover");
          setCursorText("");
        } else {
          setCursorState("text");
          setCursorText(type);
        }
      } else if (target.closest("a") || target.closest("button")) {
        setCursorState("hover");
        setCursorText("");
      } else {
        setCursorState("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "#fff",
      mixBlendMode: "difference",
      opacity: 1
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: "transparent",
      border: "1px solid rgba(150, 150, 150, 0.5)",
      mixBlendMode: "difference",
      opacity: 1
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: "#e8e7e3",
      mixBlendMode: "normal",
      color: "#121415",
      opacity: 1
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wider"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={cursorState}
      initial="default"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {cursorState === "text" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="pointer-events-none"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
