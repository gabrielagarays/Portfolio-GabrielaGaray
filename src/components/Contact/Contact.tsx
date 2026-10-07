import type { FormEvent } from "react";
import "./Contact.css";

interface ContactProps {
  sent: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Contact({ sent, onSubmit }: ContactProps) {
  return (
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
  );
}
