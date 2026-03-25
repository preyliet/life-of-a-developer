import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
      setPct(Math.min(100, Math.floor(current)));
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div style={{
              fontSize: "clamp(11px, 1.5vw, 13px)",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#e8191e",
              fontWeight: 700,
              marginBottom: "12px",
              textAlign: "center",
            }}>
              Frontend Odyssey
            </div>
            <div style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#fff",
              textAlign: "center",
              lineHeight: 1,
            }}>
              The Dev
              <br />
              <span style={{ color: "#e8191e" }}>Journey</span>
            </div>
          </motion.div>

          <div className="loader-bar">
            <motion.div
              className="loader-bar-fill"
              animate={{ scaleX: pct / 100 }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: "16px",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Loading experience... {pct}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
