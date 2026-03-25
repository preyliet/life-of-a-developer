import { useCursor } from "../hooks/useScrollProgress";

export default function Cursor() {
  useCursor();
  return (
    <div className="custom-cursor" aria-hidden="true">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </div>
  );
}
