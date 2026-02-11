import "./SobreMim.css";
import { profile, sobremim } from "../../config/Config.js";

export default function SobreMim() {
  return (
    <section id="home" className="sobre-mim">
      <div className="sobre-mim__container">
        <div className="sobre-mim__imagem">
          <div className="sobre-mim__logo" role="img" aria-label={`Logo ${profile.name}`}>
            <svg className="logo-mark" viewBox="0 0 240 240" aria-hidden="true">
              <defs>
                <radialGradient id="glow" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                  <stop offset="55%" stopColor="rgba(255,255,255,0.35)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
                </linearGradient>
              </defs>

              <circle className="logo-bg" cx="120" cy="120" r="112" />
              <circle className="logo-glow" cx="120" cy="120" r="112" fill="url(#glow)" />
              <circle className="logo-ring" cx="120" cy="120" r="104" fill="none" stroke="url(#ring)" strokeWidth="2" />

              <g className="logo-lines" fill="none" strokeWidth="1.6">
                <path d="M58 138 C82 118, 102 110, 120 110 C138 110, 158 118, 182 138" />
                <path d="M66 158 C90 142, 108 136, 130 136 C150 136, 168 142, 194 158" />
              </g>

              <path className="logo-flourish" d="M66 96 C92 80, 110 78, 128 82 C150 88, 164 100, 186 96" />

              <text className="logo-monogram" x="120" y="150" textAnchor="middle">LF</text>

              <text className="logo-caption" x="120" y="204" textAnchor="middle">ADVOCACIA</text>
            </svg>
          </div>
        </div>

        <div className="sobre-mim__texto">
          <h1 className="sobre-mim__titulo">{profile.name}</h1>

          <h2 className="sobre-mim__subtitulo">Sobre Mim</h2>
          <p className="sobre-mim__paragrafo">{sobremim.texto1ptbr}</p>
          <p className="sobre-mim__paragrafo">{sobremim.texto2ptbr}</p>
        </div>
      </div>
    </section>
  );
}
