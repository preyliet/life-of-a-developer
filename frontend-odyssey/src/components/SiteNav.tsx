import { motion } from "framer-motion";

export default function SiteNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="site-nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      aria-label="Main navigation"
    >
      <div className="nav-logo">Dev∙Journey</div>
      <ul className="nav-links">
        <li><a href="#intro" onClick={(e) => { e.preventDefault(); scrollTo("intro"); }}>Begin</a></li>
        <li><a href="#struggle" onClick={(e) => { e.preventDefault(); scrollTo("struggle"); }}>Debug</a></li>
        <li><a href="#grind" onClick={(e) => { e.preventDefault(); scrollTo("grind"); }}>Grind</a></li>
        <li><a href="#triumph" onClick={(e) => { e.preventDefault(); scrollTo("triumph"); }}>Ship</a></li>
      </ul>
    </motion.nav>
  );
}
