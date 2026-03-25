const items = [
  "Hello World", "•", "First Bug", "•", "Stack Overflow", "•", "npm install", "•",
  "undefined is not a function", "•", "git push --force", "•", "It works on my machine",
  "•", "Hello World", "•", "First Bug", "•", "Stack Overflow", "•", "npm install", "•",
  "undefined is not a function", "•", "git push --force", "•", "It works on my machine", "•",
];

export default function Marquee() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={item === "•" ? "marquee-sep" : "marquee-item"}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
