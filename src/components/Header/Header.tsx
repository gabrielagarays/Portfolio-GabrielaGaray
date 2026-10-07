import { sections } from "../../data/sections";
import "./Header.css";

interface HeaderProps {
  menuOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleMenu: () => void;
}

export default function Header({ menuOpen, onNavigate, onToggleMenu }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="monogram" onClick={() => onNavigate("inicio")} aria-label="Ir al inicio">
        GG<span>®</span>
      </button>
      <nav className="header-nav" aria-label="Navegación principal">
        {sections.slice(1).map((section) => (
          <button key={section.id} onClick={() => onNavigate(section.id)}>
            {section.label}
          </button>
        ))}
      </nav>
      <button
        className={`menu-button ${menuOpen ? "is-open" : ""}`}
        onClick={onToggleMenu}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
      >
        <i />
        <i />
      </button>
    </header>
  );
}
