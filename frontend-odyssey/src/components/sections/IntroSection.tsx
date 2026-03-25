import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Single timeline so all scroll-triggered reveals are coordinated
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        leftColRef.current?.querySelectorAll(".animate-in") ?? [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" },
      );

      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top 76%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const chapters = [
    { num: "01", title: "Watched a 4-hour tutorial at 11PM" },
    { num: "02", title: 'Typed: <h1>Hello World</h1>' },
    { num: "03", title: "Nothing showed up. Refreshed 14 times." },
    { num: "04", title: "Realized I never saved the file" },
    { num: "05", title: "It worked. I was unstoppable." },
  ];

  return (
    <section
      ref={sectionRef}
      className="section intro-section"
      id="intro"
      data-section="1"
      style={{ padding: "160px 0" }}
      aria-label="Chapter 1 - Learning HTML"
    >
      <div className="bg-grid" aria-hidden="true" />
      <div className="container-xl">
        <div className="two-col-grid">

          <div ref={leftColRef}>
            <div className="section-label animate-in">Chapter 01</div>
            <h2 className="big-heading animate-in" style={{ marginBottom: "24px" }}>
              Learning
              <br />
              <span style={{ color: "#e8191e" }}>HTML</span>
            </h2>
            <p className="body-text animate-in" style={{ marginBottom: "40px" }}>
              I was 17, had no idea what I was doing, and
              started with a random YouTube video at midnight.
              Didn't even know what a text editor was — opened Notepad.
              That was chapter one.
            </p>

            <div className="chapter-cards animate-in" role="list" aria-label="The beginner's journey">
              {chapters.map((c, i) => (
                <div key={i} className="chapter-card" role="listitem">
                  <span className="chapter-num">{c.num}</span>
                  <span className="chapter-title">{c.title}</span>
                  <span className="chapter-arrow" aria-hidden="true">→</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={terminalRef}>
            <div className="terminal" role="figure" aria-label="First HTML code snippet">
              <div className="terminal-bar">
                <div className="terminal-dot" style={{ background: "#ff5f57" }} />
                <div className="terminal-dot" style={{ background: "#febc2e" }} />
                <div className="terminal-dot" style={{ background: "#28c840" }} />
                <span style={{ marginLeft: "8px", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>index.html</span>
              </div>
              <div className="terminal-body" aria-label="HTML code example">
                <div><span className="t-comment">&lt;!-- my first website. rohan, age 17 --&gt;</span></div>
                <div>&nbsp;</div>
                <div><span className="t-tag">&lt;html&gt;</span></div>
                <div>&nbsp;&nbsp;<span className="t-tag">&lt;head&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-tag">&lt;title&gt;</span><span className="t-text">My Awesome Website</span><span className="t-tag">&lt;/title&gt;</span></div>
                <div>&nbsp;&nbsp;<span className="t-tag">&lt;/head&gt;</span></div>
                <div>&nbsp;&nbsp;<span className="t-tag">&lt;body&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-tag">&lt;h1 </span><span className="t-attr">style</span><span className="t-tag">=</span><span className="t-val">"color: red"</span><span className="t-tag">&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-text">Hello World!!!</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-tag">&lt;/h1&gt;</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-tag">&lt;p&gt;</span><span className="t-text">I am a developer now.</span><span className="t-tag">&lt;/p&gt;</span></div>
                <div>&nbsp;&nbsp;<span className="t-tag">&lt;/body&gt;</span></div>
                <div><span className="t-tag">&lt;/html&gt;</span></div>
                <div>&nbsp;</div>
                <div style={{ color: "#e8191e" }}>
                  <span style={{ opacity: 0.6 }}>▶</span> Opened in browser...
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "16px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              role="status"
            >
              <span style={{ fontSize: "20px" }}>💡</span>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                That inline <code style={{ color: "#a78bfa" }}>style="color: red"</code> was technically correct.
                Still is. Not ashamed.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-number" aria-hidden="true">01</div>
    </section>
  );
}
