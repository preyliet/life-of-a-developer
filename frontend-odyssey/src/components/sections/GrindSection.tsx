import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML & CSS", percentage: 72 },
  { name: "JavaScript", percentage: 58 },
  { name: "React", percentage: 44 },
  { name: "Debugging by vibes", percentage: 99 },
  { name: "Stack Overflow copy-paste", percentage: 97 },
];

const stats = [
  { num: "∞", label: "Coffee Consumed" },
  { num: "3AM", label: "Usual Shipping Time" },
  { num: "4k+", label: "Stack Overflow Visits" },
  { num: "1", label: "Original Solution Found" },
];

export default function GrindSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progressActive, setProgressActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: "play none none none" },
        },
      );

      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-card") ?? [],
        { opacity: 0, y: 36, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 78%", toggleActions: "play none none none" },
        },
      );

      // Trigger CSS progress bar animations when section enters view
      ScrollTrigger.create({
        trigger: progressRef.current,
        start: "top 75%",
        onEnter: () => setProgressActive(true),
        once: true,
      });

      // Parallax on the large background word (scrub = smooth tie to scroll)
      gsap.to(".grind-bg-text", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section grind-section"
      id="grind"
      data-section="3"
      style={{ padding: "160px 0", position: "relative" }}
      aria-label="Chapter 3 - The Grind"
    >
      {/* Parallax background word */}
      <div
        className="grind-bg-text"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-40px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(120px, 18vw, 220px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
        }}
      >
        GRIND
      </div>

      <div className="container-xl">
        <div ref={headingRef} style={{ marginBottom: "80px" }}>
          <div className="section-label">Chapter 03</div>
          <h2 className="big-heading">
            Coffee.
            <br />
            <span style={{ color: "#e8191e" }}>Code.</span>
            <br />
            Repeat.
          </h2>
        </div>

        <div className="two-col-grid">
          {/* Stats grid */}
          <div
            ref={statsRef}
            className="stat-grid"
            role="list"
            aria-label="Developer statistics"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="stat-card"
                role="listitem"
                whileHover={{ scale: 1.03, borderColor: "rgba(232,25,30,0.35)" }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Right column: body text + skill bars + quote */}
          <div>
            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 17px)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                marginBottom: "40px",
              }}
            >
              I'm 18, still figuring things out, and most days
              I open VS Code and just stare at old code wondering
              what I was thinking. Then something clicks and I lose
              track of time. That's probably the best part of learning.
            </p>

            <div
              ref={progressRef}
              className="progress-items"
              role="list"
              aria-label="Skill progress"
            >
              {skills.map((skill, i) => (
                <div key={i} className="progress-item" role="listitem">
                  <div className="progress-label">
                    <span>{skill.name}</span>
                    <span style={{ color: "#e8191e" }}>{skill.percentage}%</span>
                  </div>
                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-valuenow={skill.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name}: ${skill.percentage}%`}
                  >
                    <div
                      className={`progress-fill${progressActive ? " animate" : ""}`}
                      style={{
                        transform: progressActive ? `scaleX(${skill.percentage / 100})` : "scaleX(0)",
                        transitionDelay: `${i * 0.15}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "40px",
                padding: "24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
              }}
            >
              <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "12px" }}>
                still true, year two
              </div>
              <div style={{ fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>
                "It's not a bug.
                <br />
                <span style={{ color: "#e8191e" }}>It's an undocumented feature."</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-number" aria-hidden="true">03</div>
    </section>
  );
}
