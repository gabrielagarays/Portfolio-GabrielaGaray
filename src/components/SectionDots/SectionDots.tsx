import { sections } from "../../data/sections";
import "./SectionDots.css";

interface SectionDotsProps {
  activeSection: number;
  onNavigate: (id: string) => void;
}

export default function SectionDots({ activeSection, onNavigate }: SectionDotsProps) {
  return (
    <div className="section-dots" aria-label="Secciones">
      {sections.map((section, index) => (
        <button
          key={section.id}
          className={index === activeSection ? "active" : ""}
          onClick={() => onNavigate(section.id)}
          aria-label={`Ir a ${section.label}`}
        />
      ))}
    </div>
  );
}
