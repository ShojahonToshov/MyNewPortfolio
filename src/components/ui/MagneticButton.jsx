"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useCursorStore from "../../store/useCursorStore";

export function MagneticButton({ children, className, href, as, onClick, ...props }) {
  const ref = useRef(null);
  const bounds = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const { setCursorType, resetCursor } = useCursorStore();

  const handleMouseEnter = () => {
    bounds.current = ref.current.getBoundingClientRect();
    setCursorType('hover');
  };

  const handleMouse = (e) => {
    if (!bounds.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = bounds.current;
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    bounds.current = null;
    resetCursor();
  };

  const Component = as || (href ? motion.a : motion.button);

  return (
    <Component
      href={href}
      onClick={onClick}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
