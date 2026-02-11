import React, { useState } from "react";
import { carreira, formacao } from "../../config/Config";
import "./Carreira.css";

export default function Carreira() {
  const [openId, setOpenId] = useState(null);

  function toggleItem(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }
  return (
    <section id="career" className="carreira">
      <header className="carreira__header">
        <h1>Carreira</h1>
        <p>Trajetória profissional voltada à advocacia, com experiência prática e atendimento responsável.</p>
      </header>

      <ul className="carreira__lista carreira__accordion carreira__timeline">
        {carreira.map((exp) => {
          const isOpen = openId === exp.id;
          return (
            <li key={exp.id} className={`carreira__item ${isOpen ? "open" : ""}`}>
              <div className="carreira__left" />

              <div className="carreira__right">
                <button
                  className="carreira__toggle"
                  onClick={() => toggleItem(exp.id)}
                  aria-expanded={isOpen}
                >
                  <div className="carreira__row">
                    <div className="carreira__meta">
                      <h3 className="carreira__cargo">{exp.cargo}</h3>
                      <h4 className="carreira__empresa">{exp.empresa}</h4>
                    </div>
                    <div className="carreira__aside">
                      <span className="carreira__periodo">{exp.periodo}</span>
                      <span className="carreira__chev" aria-hidden></span>
                    </div>
                  </div>
                </button>

                <div className="carreira__content" hidden={!isOpen}>
                  <p className="carreira__descricao">{exp.descricao}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <header className="carreira__header">
        <h2>Formação</h2>
      </header>

      <ul className="carreira__lista carreira__accordion carreira__timeline">
        {formacao.map((f) => {
          const isOpen = openId === f.id;
          return (
            <li key={f.id} className={`carreira__item ${isOpen ? "open" : ""}`}>
              <div className="carreira__left" />

              <div className="carreira__right">
                <button
                  className="carreira__toggle"
                  onClick={() => toggleItem(f.id)}
                  aria-expanded={isOpen}
                >
                  <div className="carreira__row">
                    <div className="carreira__meta">
                      <h3 className="carreira__cargo">{f.cargo}</h3>
                      <h4 className="carreira__empresa">{f.empresa}</h4>
                    </div>
                    <div className="carreira__aside">
                      <span className="carreira__periodo">{f.periodo}</span>
                      <span className="carreira__chev" aria-hidden></span>
                    </div>
                  </div>
                </button>

                <div className="carreira__content" hidden={!isOpen}>
                  <p className="carreira__descricao">{f.descricao}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
