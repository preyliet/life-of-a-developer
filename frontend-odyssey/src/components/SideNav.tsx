import { useScrollProgress } from "../hooks/useScrollProgress";

const sections = [
  { label: "Hero" },
  { label: "Begin" },
  { label: "Debug" },
  { label: "Grind" },
  { label: "Ship" },
];

export default function SideNav() {
  const { activeSection } = useScrollProgress();

  const scrollTo = (idx: number) => {
    const els = document.querySelectorAll("[data-section]");
    els[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="side-nav" aria-label="Section navigation">
      {sections.map((s, i) => (
        <button
          key={i}
          className={`side-nav-dot${activeSection === i ? " active" : ""}`}
          data-label={s.label}
          onClick={() => scrollTo(i)}
          aria-label={`Go to ${s.label} section`}
          title={s.label}
        />
      ))}
    </nav>
  );
}
