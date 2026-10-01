"use client";

import { MagneticButton } from "./ui/MagneticButton";
import { SocialIcons } from "./ui/SocialIcons";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter, FiArrowUpRight as ArrowUpRight } from "react-icons/fi";

// Background Component (Dotted)
const DottedBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
);

function MinimalistSplitBase({ 
  bgBox = "bg-[#E0FF4F]", 
  bgButton = "bg-[#FF2A2A] text-white border-white", 
  bgGlow = ["#E0FF4F", "#FF2A2A"], 
  colorText = "text-black", 
  iconColorHover = "hover:text-[#FF2A2A]",
  decorColor = "border-black/20"
}) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const sectionRef = useRef(null);
  const bounds = useRef({ left: 0, top: 0 });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  useEffect(() => {
    const updateBounds = () => {
      if (sectionRef.current) {
        bounds.current = {
          left: sectionRef.current.offsetLeft,
          top: sectionRef.current.offsetTop
        };
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  function handleMouseMove({ pageX, pageY }) {
    mouseX.set(pageX - bounds.current.left - 500);
    mouseY.set(pageY - bounds.current.top - 500);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => { setIsFormOpen(false); setStatus("idle"); setEmail(""); setMessage(""); }, 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const textItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col justify-end py-10 px-4 md:px-10 bg-[#111] overflow-hidden relative z-20 group/section"
    >
      <motion.div
        className="absolute pointer-events-none opacity-30 group-hover/section:opacity-60 transition-opacity duration-1000 z-0 w-[1000px] h-[1000px] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          left: 0,
          top: 0,
          background: `radial-gradient(circle, ${bgGlow[0]} 0%, ${bgGlow[1]} 30%, transparent 80%)`,
          filter: "blur(60px)",
        }}
      />
      <DottedBackground />
      
      <div className="flex-1 flex items-center justify-center z-20 w-full h-full">
         <motion.div 
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className={`${bgBox} rounded-[40px] w-full max-w-6xl md:h-[60vh] flex flex-col md:flex-row items-center justify-between p-10 md:p-20 shadow-2xl relative overflow-hidden`}
         >
            <div style={{ animation: 'spin 60s linear infinite reverse' }} className={`absolute -right-80 -top-80 w-[1000px] h-[1000px] border-[1px] ${decorColor} rounded-full border-dashed pointer-events-none opacity-50`} />
            <div style={{ animation: 'spin 50s linear infinite' }} className={`absolute -right-60 -top-60 w-[800px] h-[800px] border-[1px] ${decorColor} rounded-full border-dotted pointer-events-none opacity-50`} />
            <div style={{ animation: 'spin 40s linear infinite' }} className={`absolute -right-40 -top-40 w-[600px] h-[600px] border-[1px] ${decorColor} rounded-full border-dashed pointer-events-none opacity-50`} />
            <div style={{ animation: 'spin 30s linear infinite reverse' }} className={`absolute -right-20 -top-20 w-[400px] h-[400px] border-[1px] ${decorColor} rounded-full border-dotted pointer-events-none opacity-50`} />
            <div style={{ animation: 'spin 20s linear infinite' }} className={`absolute right-0 top-0 w-[200px] h-[200px] border-[1px] ${decorColor} rounded-full border-dashed pointer-events-none opacity-50`} />
            
            <div className={`z-10 ${colorText} mb-10 md:mb-0 w-full md:w-1/2`}>
              {!isFormOpen ? (
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}>
                  <motion.p variants={textItem} className="text-sm font-bold uppercase tracking-widest mb-4 opacity-70">Drop me a line</motion.p>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
                    <motion.span className="block" variants={textItem}>Let's talk</motion.span>
                    <motion.span className="block" variants={textItem}>about your</motion.span>
                    <motion.span className="block" variants={textItem}>next idea.</motion.span>
                  </h2>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-4 w-full pr-0 md:pr-10"
                >
                  <h3 className="text-3xl font-black tracking-tighter mb-2">Send a Message</h3>
                  <input 
                    type="email" 
                    required 
                    placeholder="Your Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-black placeholder-black/50 outline-none focus:border-black/30 transition-colors"
                  />
                  <textarea 
                    required 
                    placeholder="How can I help you?" 
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-black placeholder-black/50 outline-none focus:border-black/30 transition-colors resize-none"
                  />
                  <div className="flex items-center gap-4 mt-2">
                    <button 
                      type="submit" 
                      disabled={status === "loading" || status === "success"}
                      className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-black/80 transition-colors disabled:opacity-50"
                    >
                      {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send"}
                    </button>
                    <button type="button" onClick={() => setIsFormOpen(false)} className="text-sm font-bold opacity-50 hover:opacity-100 transition-opacity">
                      Cancel
                    </button>
                  </div>
                  {status === "error" && <p className="text-red-500 text-sm font-bold mt-2">Failed to send. Try again.</p>}
                </motion.form>
              )}
            </div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="z-10"
            >
              {!isFormOpen && (
                <MagneticButton as="button" onClick={() => setIsFormOpen(true)} className={`${bgButton} w-40 h-40 rounded-full border flex flex-col items-center justify-center hover:bg-white ${iconColorHover} transition-colors group shadow-2xl cursor-pointer`}>
                  <ArrowUpRight size={40} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform" />
                  <span className="font-bold mt-2">Email</span>
                </MagneticButton>
              )}
            </motion.div>
         </motion.div>
      </div>

      <div className="w-full pt-10 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center z-20 gap-6 text-white">
         <motion.div 
           initial={{ opacity: 0, x: -30 }} 
           whileInView={{ opacity: 1, x: 0 }} 
           transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           viewport={{ once: true }}
           className="text-3xl font-bold tracking-tighter"
         >
           Shojahon Toshov
         </motion.div>
         <SocialIcons hoverBg={bgGlow[0]} hoverText="#000" />
      </div>
    </section>
  );
}

export const FooterMinimalistMono = () => (
  <MinimalistSplitBase 
    bgBox="bg-white" 
    bgButton="bg-black text-white border-black" 
    bgGlow={["#ffffff", "#666666"]} 
    colorText="text-black" 
    iconColorHover="hover:text-black hover:border-black"
    decorColor="border-black/20"
  />
);





