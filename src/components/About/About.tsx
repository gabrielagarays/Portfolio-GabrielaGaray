import "./About.css";

export default function About() {
  return (
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
  );
}
