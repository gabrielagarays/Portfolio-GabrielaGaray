import type { CSSProperties } from "react";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card" style={{ "--card": index } as CSSProperties}>
      <div className={`project-visual ${project.className}`}>
        <span>{project.title}</span>
        <i />
      </div>
      <div className="project-meta">
        <div><span>{project.number}</span><span>{project.year}</span></div>
        <h3>{project.type}</h3>
        <p>{project.description}</p>
        <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </div>
    </article>
  );
}
