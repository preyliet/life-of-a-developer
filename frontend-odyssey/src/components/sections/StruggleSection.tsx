import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const errors = [
  { code: "TypeError", msg: "Cannot read properties of undefined", line: "app.js:47" },
  { code: "ReferenceError", msg: "useState is not defined", line: "Component.jsx:3" },
  { code: "SyntaxError", msg: "Unexpected token '}'", line: "styles.css:112" },
  { code: "NetworkError", msg: "Failed to fetch /api/users", line: "api.js:28" },
  { code: "TypeError", msg: "map is not a function", line: "List.tsx:16" },
];

const flipCards = [
  {
    icon: "🔴",
    front: "console.log everything",
    back: "Added 12 console.logs, found the bug, forgot to remove them. They're still there.",
  },
  {
    icon: "📚",
    front: "Stack Overflow copy-paste",
    back: "Copied the answer, it worked, closed the tab before reading why. Classic.",
  },
  {
    icon: "☕",
    front: "Watched a 6-hour tutorial",
    back: "Followed along perfectly. Closed laptop. Opened new project. Remembered nothing.",
  },
];

export default function StruggleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const errorsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Track which cards are currently flipped
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Glitch heading + body text animate together
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.95, ease: "power3.out",
          scrollTrigger: { trigger: leftColRef.current, start: "top 76%", toggleActions: "play none none none" },
        },
      );

      // Error cards stagger in from the left
      gsap.fromTo(
        errorsRef.current?.querySelectorAll(".error-card") ?? [],
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.55, stagger: 0.09, ease: "power2.out",
          scrollTrigger: { trigger: errorsRef.current, start: "top 78%", toggleActions: "play none none none" },
        },
      );

      // Flip cards scale up
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".flip-card") ?? [],
        { opacity: 0, y: 32, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section struggle-section"
      id="struggle"
      data-section="2"
      style={{ padding: "160px 0" }}
      aria-label="Chapter 2 - The Debugging Struggle"
    >
      <div className="container-xl">
        <div className="two-col-grid" style={{ marginBottom: "100px" }}>

          <div ref={leftColRef}>
            <div className="section-label">Chapter 02</div>
            <div
              className="glitch-text"
              data-text="DEBUG"
              role="heading"
              aria-level={2}
              aria-label="Debugging"
            >
              DEBUG
            </div>
            <div
              className="glitch-text"
              data-text="MODE"
              style={{ display: "block", color: "rgba(255,255,255,0.15)", marginTop: "-10px" }}
              aria-hidden="true"
            >
              MODE
            </div>
            <p className="body-text" style={{ marginTop: "32px" }}>
              It's 1AM. The code was working an hour ago.
              I didn't touch anything. At least I don't think I did.
              There are 23 errors in the console and I don't know
              what half of them mean.
            </p>
          </div>

          <div ref={errorsRef} className="error-cards" role="list" aria-label="Common developer errors">
            {errors.map((e, i) => (
              <div key={i} className="error-card" role="listitem">
                <div className="error-icon" aria-hidden="true">!</div>
                <div>
                  <div className="error-title">{e.code}</div>
                  <div className="error-msg">{e.msg}</div>
                  <div className="error-msg" style={{ opacity: 0.4 }}>{e.line}</div>
                </div>
              </div>
            ))}

            <div
              style={{
                padding: "16px 20px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "var(--app-font-mono)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#34d399" }}>✓</span>
              Solution: turn it off and on again
            </div>
          </div>
        </div>

        {/* Interactive flip cards */}
        <div>
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <div className="section-label">Click to reveal</div>
            <h3 className="big-heading" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Things every beginner does
            </h3>
          </div>

          <div
            ref={cardsRef}
            className="interactive-grid"
            role="list"
            aria-label="Beginner developer habits — click to reveal"
          >
            {flipCards.map((card, i) => (
              <div
                key={i}
                className={`flip-card${flipped.has(i) ? " flipped" : ""}`}
                onClick={() => toggleFlip(i)}
                onKeyDown={(e) => e.key === "Enter" && toggleFlip(i)}
                role="button"
                tabIndex={0}
                aria-pressed={flipped.has(i)}
                aria-label={flipped.has(i) ? card.back : `${card.front} — click to reveal`}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-face flip-front">
                    <div className="flip-icon" aria-hidden="true">{card.icon}</div>
                    <div className="flip-title">{card.front}</div>
                    <div style={{ marginTop: "8px", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Click to reveal
                    </div>
                  </div>
                  <div className="flip-card-face flip-back">
                    <div className="flip-back-text">{card.back}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-number" aria-hidden="true">02</div>
    </section>
  );
}
