import { motion } from "motion/react";
import portraitSource from "../../imports/HOME_1_2x.jpg";
import "./Hero.css";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="panel hero-panel" id="inicio">
      <div className="hero-sidebar">
        <p>
          Gabriela Garay
          <br />
          Diseñadora UX/UI
        </p>
      </div>

      <div className="hero-content">
        <motion.div
          className="portrait-mask"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={portraitSource} alt="" draggable="false" />
        </motion.div>

        <motion.h1
          className="display-title reveal"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          LA ESTÉTICA
          <br />
          ATRAE.
          <br />
          <span>LA EXPERIENCIA</span>
          <br />
          <span>CONECTA.</span>
        </motion.h1>

        <motion.div
          className="hero-actions reveal"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: "easeOut",
          }}
        >
          <button
            onClick={() => onNavigate("proyectos")}
            className="pill-button primary"
          >
            Ver proyectos
          </button>

          <a
            className="pill-button download-button"
            href="/Gabriela-Garay-CV.pdf"
            download
          >
            Descargar CV
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
            </svg>
          </a>
        </motion.div>
      </div>

      <div className="hero-index">01 — 05</div>

      <div className="scroll-cue">
        <span />
        Scroll / drag →
      </div>
    </section>
  );
}