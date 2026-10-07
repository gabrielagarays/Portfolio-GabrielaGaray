import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="panel projects-panel" id="proyectos">
      <div className="projects-intro">
        <p className="kicker">Selección / 2025—2026</p>
        <h2 className="headline">CONOCE<br />MI TRABAJO</h2>
        <p>Tres productos, tres retos y una misma obsesión: hacer que lo complejo se sienta simple.</p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
