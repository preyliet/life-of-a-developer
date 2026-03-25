import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Particle positions are fixed once on mount — not randomized on every render
const PARTICLE_COUNT = 12;

export default function TriumphSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Stable random positions — computed once, never change on re-render
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        isRed: i % 3 === 0,
      })),
    [],
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Main text + CTA timeline — triggered when section enters view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".shipped-line",
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.14, ease: "power3.out" },
      );

      tl.fromTo(
        ".triumph-cta",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.4)" },
        "-=0.25",
      );

      // Particles float continuously — only start when section is visible
      gsap.to(".triumph-particle", {
        y: "random(-70, 70)",
        x: "random(-35, 35)",
        opacity: "random(0.1, 0.45)",
        duration: "random(3, 5)",
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play pause resume pause",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    { icon: "🚀", text: "Pushed to main at 2AM" },
    { icon: "😅", text: "No errors in console (for now)" },
    { icon: "🔗", text: "Sent the link to my friend" },
    { icon: "🤙", text: "First real project on GitHub" },
  ];

  return (
    <section
      ref={sectionRef}
      className="triumph-section"
      id="triumph"
      data-section="4"
      aria-label="Chapter 4 - You Shipped It"
    >
      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="triumph-particle"
          aria-hidden="true"
          style={{
            position: "absolute",
            width: p.width + "px",
            height: p.height + "px",
            background: p.isRed ? "#e8191e" : "rgba(255,255,255,0.3)",
            borderRadius: "50%",
            left: p.left + "%",
            top: p.top + "%",
            opacity: 0.2,
          }}
        />
      ))}

      <div className="triumph-bg-glow" aria-hidden="true" />

      <div
        className="container-xl"
        style={{ textAlign: "center", position: "relative", zIndex: 10 }}
      >
        <div className="section-label" style={{ marginBottom: "32px" }}>
          Chapter 04 · The Triumph
        </div>

        <div className="shipped-text" aria-label="You shipped it">
          <div className="shipped-line line1">you</div>
          <div className="shipped-line line2">finally</div>
          <div className="shipped-line line3">
            <span>SHIPPED</span>
            <span style={{ fontSize: "0.5em" }}>🚀</span>
          </div>
        </div>

        <motion.p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "560px",
            margin: "40px auto 56px",
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Broke it like 9 times. Googled the same error 4 times.
          Asked a friend who also had no idea. But somehow, it's live.
          I'm still learning. But this is real, and that matters.
        </motion.p>

        <div
          className="triumph-cta"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "80px",
          }}
        >
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Restart the journey from the beginning"
          >
            <span>↑</span>
            Relive the Journey
          </motion.button>

          <motion.button
            className="cta-button"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)" }}
            whileHover={{ scale: 1.05, borderColor: "#e8191e" }}
            whileTap={{ scale: 0.97 }}
          >
            <span>★</span>
            View Achievements
          </motion.button>
        </div>

        {/* Achievement cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
          className="achievement-grid"
          role="list"
          aria-label="Achievements unlocked"
        >
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "24px 16px",
                textAlign: "center",
              }}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                background: "rgba(232,25,30,0.08)",
                borderColor: "rgba(232,25,30,0.3)",
                scale: 1.04,
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }} aria-hidden="true">
                {a.icon}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                {a.text}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{
            marginTop: "100px",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.15)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
        >
          Made with ☕ and too many Stack Overflow tabs
          <br />
          <span style={{ color: "rgba(232,25,30,0.4)" }}>
            Frontend Odyssey 2026 · IIT Patna
          </span>
        </motion.div>
      </div>
    </section>
  );
}
