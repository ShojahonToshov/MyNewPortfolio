"use client";
import { motion } from "framer-motion";
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiTwitter as Twitter } from "react-icons/fi";

export const SocialIcons = ({ className = "", hoverBg = "#E0FF4F", hoverText = "#000", border = "border-white/30" }) => {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  };
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 12 } }
  };

  const socials = [
    { Icon: Github, label: "GitHub Profile", href: "https://github.com" },
    { Icon: Linkedin, label: "LinkedIn Profile", href: "https://linkedin.com" },
    { Icon: Twitter, label: "Twitter Profile", href: "https://twitter.com" },
    { Icon: Mail, label: "Send Email", href: "mailto:hello@example.com" },
  ];

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true }} 
      className={`flex gap-4 md:gap-8 ${className}`}
    >
      {socials.map(({ Icon, label, href }, idx) => (
        <motion.a
          variants={iconVariants}
          key={idx} 
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, backgroundColor: hoverBg, color: hoverText, borderColor: hoverBg }}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full border ${border} flex items-center justify-center transition-colors duration-300 z-20`}
          style={{ color: "inherit" }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </motion.a>
      ))}
    </motion.div>
  );
};
