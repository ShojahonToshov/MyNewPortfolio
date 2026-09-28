import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FloatingNavbar() {
  const [active, setActive] = useState("home");

  const clickScrollTimer = useRef(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    let frameId;
    const updateActive = () => {
      if (clickScrollTimer.current !== null) return;
      const midpoint = window.innerHeight / 2;
      // Query on scroll: the sections below the hero are mounted lazily.
      for (const id of ["home", "about", "projects", "contact"]) {
        const section = document.getElementById(id);
        if (!section) continue;
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= midpoint && bottom > midpoint) {
          setActive(id);
          break;
        }
      }
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActive);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(clickScrollTimer.current);
      clickScrollTimer.current = null;
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      setActive(targetId);

      const scrollDuration = 1.2; // Slightly faster but very smooth
      clearTimeout(clickScrollTimer.current);
      clickScrollTimer.current = setTimeout(() => {
        clickScrollTimer.current = null;
        window.dispatchEvent(new Event("scroll"));
      }, scrollDuration * 1000 + 50);

      if (window.lenis) {
        window.lenis.scrollTo(elem, {
          duration: scrollDuration,
          easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease out
        });
      } else {
        elem.scrollIntoView({ behavior: "smooth" });
      }

    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 md:top-8 left-1/2 z-[100] flex items-center gap-1 p-1.5 rounded-full bg-black/50 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    >
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          aria-current={active === link.name.toLowerCase() ? "location" : undefined}
          onClick={(e) => handleScrollTo(e, link.href)}
          className={`relative px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
            active === link.name.toLowerCase() ? "text-black" : "text-white/70 hover:text-white"
          }`}
        >
          {active === link.name.toLowerCase() && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 rounded-full bg-white -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
            />
          )}
          <span className="relative z-10">{link.name}</span>
        </a>
      ))}
    </motion.div>
  );
}
