import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function HeroSection() {
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!bgTextRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(bgTextRef.current, {
        x: x,
        y: y,
        duration: 1.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollDown = () => {
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="section hero-section"
      id="hero"
      data-section="0"
      aria-label="Hero - The Developer Awakens"
    >
      <div className="bg-grid" aria-hidden="true" />

      <div ref={bgTextRef} className="hero-bg-text" aria-hidden="true">
        CODE
      </div>

      <motion.div
        className="parallax-circle"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(232,25,30,0.08) 0%, transparent 70%)",
          top: "20%",
          right: "-100px",
        }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="parallax-circle"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(100,100,255,0.05) 0%, transparent 70%)",
          bottom: "10%",
          left: "-50px",
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />

      <div className="hero-content">
        <motion.div
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          IIT Patna · Frontend Odyssey 2026
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          The Life of a
          <span className="red">Developer.</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Started with a YouTube tutorial, ended up down a rabbit hole.
          This is what it actually feels like learning to code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <button
            className="scroll-indicator"
            onClick={scrollDown}
            aria-label="Scroll down to begin the journey"
          >
            <div className="scroll-line" aria-hidden="true" />
            <span>Begin Journey</span>
          </button>
        </motion.div>
      </div>

      <motion.button
        className="floating-badge"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => document.getElementById("triumph")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Skip to the end of the story"
        style={{ left: "20px", bottom: "80px" }}
      >
        ↗ Skip to End
      </motion.button>

      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          right: "60px",
          transform: "translateY(-50%)",
          writingMode: "vertical-rl",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}
