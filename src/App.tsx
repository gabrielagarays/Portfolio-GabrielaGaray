import { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent as ReactPointerEvent } from "react";
import portraitSource from "./imports/HOME_1_2x.jpg";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "herramientas", label: "Herramientas" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

const projects = [
  {
    number: "01",
    title: "Fit4All",
    type: "App fitness inclusiva",
    year: "2025",
    description: "Una experiencia creada para acompañar a todos, sin barreras.",
    tags: ["UX/UI", "Diseño inclusivo", "Figma"],
    className: "fit",
  },
  {
    number: "02",
    title: "LIBI",
    type: "App para comunidades",
    year: "2026",
    description: "Administración y convivencia conectadas en una misma plataforma.",
    tags: ["Producto", "Research", "Design system"],
    className: "libi",
  },
  {
    number: "03",
    title: "Evolve",
    type: "Rediseño de website",
    year: "2026",
    description: "Una nueva presencia digital para competir, crecer y conectar.",
    tags: ["UX/UI", "Branding", "Prototipado"],
    className: "evolve",
  },
];

const toolGroups = [
  ["DISEÑO", "Photoshop", "Illustrator", "Premiere", "Canva", "Figma", "Affinity"],
  ["PRODUCTO", "User Research", "User Flows", "Wireframing", "Prototyping", "Design Systems"],
  ["DESARROLLO", "HTML", "CSS", "Javascript", "React", "Git", "Github"],
  ["CALIDAD", "Usability Testing", "Manual Testing", "Cypress", "Bug Reporting"],
  ["PRODUCTIVIDAD", "Notion", "Trello", "Jira", "Linear", "Slack"],
];

export default function App() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const maxRef = useRef(0);
  const draggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, target: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    targetRef.current = Math.min(section.offsetLeft, maxRef.current);
    setMenuOpen(false);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const measure = () => {
      maxRef.current = Math.max(0, track.scrollWidth - window.innerWidth);
      targetRef.current = Math.min(targetRef.current, maxRef.current);
    };

    const update = () => {
      const difference = targetRef.current - currentRef.current;
      currentRef.current = reducedMotion
        ? targetRef.current
        : currentRef.current + difference * (draggingRef.current ? 0.22 : 0.085);

      if (Math.abs(difference) < 0.08) currentRef.current = targetRef.current;
      track.style.transform = `translate3d(${-currentRef.current}px, 0, 0)`;
      const progress = maxRef.current ? currentRef.current / maxRef.current : 0;
      document.documentElement.style.setProperty("--journey", String(progress));

      let closestIndex = 0;
      let closestDistance = Infinity;
      sections.forEach(({ id }, index) => {
        const node = document.getElementById(id);
        if (!node) return;
        const local = (node.offsetLeft - currentRef.current) / window.innerWidth;
        node.style.setProperty("--local", String(local));
        const distance = Math.abs(local);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveSection((previous) => (previous === closestIndex ? previous : closestIndex));
      frame = requestAnimationFrame(update);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      targetRef.current = Math.max(0, Math.min(maxRef.current, targetRef.current + delta * 1.1));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = Math.max(0, Math.min(sections.length - 1, activeSection + direction));
      scrollToSection(sections[next].id);
    };

    measure();
    frame = requestAnimationFrame(update);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", measure);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", measure);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSection]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a, button, input, textarea")) return;
    draggingRef.current = true;
    pointerStartRef.current = { x: event.clientX, target: targetRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const next = pointerStartRef.current.target - (event.clientX - pointerStartRef.current.x) * 1.25;
    targetRef.current = Math.max(0, Math.min(maxRef.current, next));
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.classList.remove("is-dragging");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main className="app-shell">
      <header className="site-header">
        <button className="monogram" onClick={() => scrollToSection("inicio")} aria-label="Ir al inicio">
          GG<span>®</span>
        </button>
        <nav className="header-nav" aria-label="Navegación principal">
          {sections.slice(1).map((section) => (
            <button key={section.id} onClick={() => scrollToSection(section.id)}>
              {section.label}
            </button>
          ))}
        </nav>
        <button
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <i />
          <i />
        </button>
      </header>

      <nav className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <p>Navegación / 2026</p>
        <div>
          {sections.map((section, index) => (
            <button key={section.id} onClick={() => scrollToSection(section.id)}>
              <span>0{index + 1}</span>
              {section.label}
            </button>
          ))}
        </div>
        <a href="mailto:gabrielagaraysan@gmail.com">gabrielagaraysan@gmail.com</a>
      </nav>

      <div
        className="horizontal-viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="horizontal-track" ref={trackRef}>
          <section className="panel hero-panel" id="inicio">
            <div className="hero-sidebar">
              <p>Gabriela Garay<br />Diseñadora UX/UI</p>
            </div>
            <div className="hero-content">
              <div className="portrait-mask" aria-hidden="true">
                <img src={portraitSource} alt="" draggable="false" />
              </div>
              <h1 className="display-title reveal">
                LA ESTÉTICA<br />
                ATRAE.<br />
                <span>LA EXPERIENCIA</span><br />
                <span>CONECTA.</span>
              </h1>
              <div className="hero-actions reveal">
                <button onClick={() => scrollToSection("proyectos")} className="pill-button primary">Ver proyectos</button>
                <a className="pill-button download-button" href="/Gabriela-Garay-CV.pdf" download>
                  Descargar CV
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hero-index">01 — 05</div>
            <div className="scroll-cue"><span /> Scroll / drag →</div>
          </section>

          <section className="panel about-panel" id="sobre-mi">
            <div className="section-number">02</div>
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="about-copy">
              <p className="kicker">Sobre mí / Diseñadora multidisciplinar</p>
              <h2 className="headline">¡HOLA! SOY<br />GABRIELA GARAY</h2>
              <p className="about-text">
                Diseño experiencias digitales donde la <strong>claridad</strong>, la emoción y la viabilidad
                técnica avanzan en la misma dirección.
              </p>
              <div className="values">
                <span>Creatividad</span><b>+</b><span>Análisis</span><b>+</b><span>Empatía</span>
              </div>
            </div>
            <p className="side-note">De la estrategia al detalle</p>
          </section>

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

          <section className="panel projects-panel" id="proyectos">
            <div className="projects-intro">
              <p className="kicker">Selección / 2025—2026</p>
              <h2 className="headline">CONOCE<br />MI TRABAJO</h2>
              <p>Tres productos, tres retos y una misma obsesión: hacer que lo complejo se sienta simple.</p>
            </div>
            <div className="project-list">
              {projects.map((project, index) => (
                <article className="project-card" key={project.title} style={{ "--card": index } as React.CSSProperties}>
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
              ))}
            </div>
          </section>

          <section className="panel contact-panel" id="contacto">
            <div className="contact-title">
              <p className="kicker">¿Y si lo hacemos diferente?</p>
              <h2 className="headline">HABLEMOS DE<br />TU PRÓXIMO<br />PROYECTO.</h2>
              <a href="mailto:gabrielagaraysan@gmail.com">gabrielagaraysan@gmail.com ↗</a>
            </div>
            <form className="contact-form" onSubmit={onSubmit}>
              <label>Tu nombre<input name="name" required placeholder="Escribe aquí" /></label>
              <label>Tu email<input name="email" type="email" required placeholder="hola@email.com" /></label>
              <label>Cuéntame sobre el proyecto<textarea name="message" required rows={3} placeholder="Tengo una idea..." /></label>
              <button type="submit">{sent ? "Mensaje enviado" : "Enviar mensaje"}<span>↗</span></button>
            </form>
            <div className="social-links">
              <a href="https://github.com/" target="_blank" rel="noreferrer">Github ↗</a>
              <a href="https://behance.net/" target="_blank" rel="noreferrer">Behance ↗</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
            <footer>© 2026 Gabriela Garay — Todos los derechos reservados.</footer>
          </section>
        </div>
      </div>

      <div className="progress-rail"><i /></div>
      <div className="section-dots" aria-label="Secciones">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={index === activeSection ? "active" : ""}
            onClick={() => scrollToSection(section.id)}
            aria-label={`Ir a ${section.label}`}
          />
        ))}
      </div>
    </main>
  );
}
