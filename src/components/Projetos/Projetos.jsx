import React, { useRef, useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBalanceScale,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import { projetos } from "../../config/Config";
import "./Projetos.css";

/* Map each project id to an icon */
const iconMap = {
  "area-trabalhista": <FaBalanceScale />,
  "area-previdenciaria": <FaShieldAlt />,
  consultoria: <FaHandshake />,
};

export default function Projetos() {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!projetos || projetos.length === 0) return;
    if (index < 0) setIndex(0);
    if (index > projetos.length - 1) setIndex(projetos.length - 1);
  }, [index]);

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setIndex((i) => Math.min(projetos.length - 1, i + 1));
  }

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;
    const wrapWidth = wrap.clientWidth;
    const maxTranslate = Math.max(0, track.scrollWidth - wrapWidth);
    let offset = index * wrapWidth;
    offset = Math.max(0, Math.min(offset, maxTranslate));
    track.style.transform = `translateX(-${offset}px)`;
  }, [index]);

  return (
    <section id="projects" className="projetos">
      <header className="projetos__header">
        <h1>Áreas de atuação</h1>
        <p>
          Atuação há mais de 30 anos em Belo Horizonte e região, com ampla
          experiência no mercado.
        </p>
      </header>

      <div className="projetos__carousel">
        <button
          className="carousel__nav carousel__nav--prev carousel__nav--desktop"
          onClick={prev}
          aria-label="Anterior"
          disabled={index === 0}
        >
          <FaChevronLeft />
        </button>

        <div className="projetos__track-wrap" ref={wrapRef}>
          <ul className="projetos__track" ref={trackRef}>
            {projetos.map((p, i) => (
              <li key={p.id} className="projeto-card">
                {/* ---- top row: area name + icon ---- */}
                <div className="projeto-card__top">
                  <span className="projeto-card__label">{p.nome}</span>
                  <span className="projeto-card__icon">
                    {iconMap[p.id] ?? <FaBalanceScale />}
                  </span>
                </div>
                <p className="projeto-card__desc">{p.descricao}</p>

                {Array.isArray(p.tecnologias) && p.tecnologias.length > 0 && (
                  <div className="projeto-card__techs">
                    {p.tecnologias.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="carousel__nav carousel__nav--next carousel__nav--desktop"
          onClick={next}
          aria-label="Próximo"
          disabled={index === projetos.length - 1}
        >
          <FaChevronRight />
        </button>

        {/* Mobile nav row: arrows + dots together */}
        <div className="carousel__controls">
          <button
            className="carousel__nav carousel__nav--mobile"
            onClick={prev}
            aria-label="Anterior"
            disabled={index === 0}
          >
            <FaChevronLeft />
          </button>

          <div
            className="carousel__dots"
            role="tablist"
            aria-label="Navegação do carrossel"
          >
            {projetos.map((p, i) => (
              <button
                key={p.id}
                className={`carousel__dot ${i === index ? "is-active" : ""}`}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Ir para ${p.nome}`}
              />
            ))}
          </div>

          <button
            className="carousel__nav carousel__nav--mobile"
            onClick={next}
            aria-label="Próximo"
            disabled={index === projetos.length - 1}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
