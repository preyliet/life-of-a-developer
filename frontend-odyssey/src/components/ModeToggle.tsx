import { useState } from "react";
import { motion } from "framer-motion";

export default function ModeToggle() {
  const [on, setOn] = useState(false);

  return (
    <motion.button
      className="mode-toggle"
      onClick={() => setOn((p) => !p)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-label={on ? "Disable intense mode" : "Enable intense mode"}
      aria-pressed={on}
      title="Toggle intense mode"
    >
      <div className="sound-wave" aria-hidden="true">
        {[1,2,3,4,5].map((i) => (
          <div
            key={i}
            className="wave-bar"
            style={{
              animationPlayState: on ? "running" : "paused",
              opacity: on ? 1 : 0.4,
            }}
          />
        ))}
      </div>
      <div className={`toggle-pill${on ? " on" : ""}`}>
        <div className="toggle-ball" />
      </div>
      <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
        {on ? "Intense" : "Chill"}
      </span>
    </motion.button>
  );
}
