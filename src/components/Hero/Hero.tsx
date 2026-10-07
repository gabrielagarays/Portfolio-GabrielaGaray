import portraitSource from "../../imports/HOME_1_2x.jpg";
import "./Hero.css";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
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
          <button onClick={() => onNavigate("proyectos")} className="pill-button primary">Ver proyectos</button>
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
  );
}
