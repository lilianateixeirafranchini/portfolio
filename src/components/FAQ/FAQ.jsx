import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { faq } from "../../config/Config";
import { useTypewriter } from "../../hooks/useTypewriter";
import "./FAQ.css";

function FAQItem({ item, isActive, onClick, index }) {
  const { displayedText, isComplete } = useTypewriter(
    item.resposta,
    25,
    isActive
  );

  return (
    <div
      className={`faq-item ${isActive ? "faq-item--active" : ""}`}
      onClick={onClick}
    >
      <button className="faq-item__question" aria-expanded={isActive}>
        <span className="faq-item__number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="faq-item__text">{item.pergunta}</span>
        <FaChevronDown className="faq-item__chevron" />
      </button>

      <div className="faq-item__answer-wrap" aria-hidden={!isActive}>
        {isActive && (
          <div className="faq-item__answer">
            <div className="faq-item__typing-box">
              {!isComplete && (
                <div className="typing-box__header">
                  <span className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <span className="typing-label">Digitando resposta...</span>
                </div>
              )}
              <div className="typing-box__content">
                {displayedText}
                {!isComplete && <span className="cursor">|</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  if (!Array.isArray(faq) || faq.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="faq">
      <header className="faq__header">
        <h1>Perguntas frequentes</h1>
        <p>Tire suas dúvidas sobre nossos serviços e atendimento.</p>
      </header>

      <div className="faq__list">
        {faq.map((item, i) => (
          <FAQItem
            key={item.id}
            item={item}
            index={i}
            isActive={activeId === item.id}
            onClick={() => setActiveId(activeId === item.id ? null : item.id)}
          />
        ))}
      </div>
    </section>
  );
}
