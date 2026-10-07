import { sections } from "../../data/sections";
import "./MenuOverlay.css";

interface MenuOverlayProps {
  open: boolean;
  onNavigate: (id: string) => void;
}

export default function MenuOverlay({ open, onNavigate }: MenuOverlayProps) {
  return (
    <nav className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <p>Navegación / 2026</p>
      <div>
        {sections.map((section, index) => (
          <button key={section.id} onClick={() => onNavigate(section.id)}>
            <span>0{index + 1}</span>
            {section.label}
          </button>
        ))}
      </div>
      <a href="mailto:gabrielagaraysan@gmail.com">gabrielagaraysan@gmail.com</a>
    </nav>
  );
}
