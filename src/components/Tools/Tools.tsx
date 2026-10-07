import { toolGroups } from "../../data/tools";
import "./Tools.css";

export default function Tools() {
  return (
    <section className="panel tools-panel" id="herramientas">
      <div className="section-number">03</div>
      <div className="tools-heading">
        <p className="kicker">Lo que uso para crear</p>
        <h2 className="headline">HERRAMIENTAS</h2>
      </div>
      <div className="tools-grid">
        {toolGroups.map(([title, ...tools]) => (
          <div className="tool-column" key={title}>
            <h3>{title}</h3>
            {tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        ))}
      </div>
      <div className="sparkle sparkle-one" />
      <div className="sparkle sparkle-two" />
    </section>
  );
}
