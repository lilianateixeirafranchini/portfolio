import { useState, useEffect, useRef } from "react";
import {
  FaHome, FaIdBadge, FaFolderOpen, FaInfoCircle, FaPaperPlane,
  FaAngleDoubleLeft, FaAngleDoubleRight, FaQuestionCircle
} from "react-icons/fa";
import { profile, navItems } from "../../config/Config.js";
import "./Sidebar.css";

const iconMap = {
  home:   <FaHome />,
  id:     <FaIdBadge />,
  folder: <FaFolderOpen />,
  info:   <FaInfoCircle />,
  send:   <FaPaperPlane />,
  question: <FaQuestionCircle />,
};

export default function Sidebar({ onExpandedChange }) {
  const [expanded, setExpanded] = useState(false);
  const [current, setCurrent] = useState(navItems?.[0]?.key || null);
  const currentRef = useRef(current);
  const sidebarRef = useRef(null);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (!Array.isArray(navItems) || !navItems.length) return;

    const sections = navItems
      .map((it) => document.getElementById(it.key))
      .filter(Boolean);
    if (!sections.length) return;

    const visibility = new Map();
    const thresholds = [0, 0.25, 0.5, 0.75, 1];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.intersectionRatio);
        });

        // pick the most visible section
        let bestId = null;
        let bestRatio = -1;
        for (const [id, ratio] of visibility.entries()) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId && bestId !== currentRef.current) {
          currentRef.current = bestId;
          setCurrent(bestId);
        }
      },
      // Focus on the center of the viewport so the section nearest the
      // center is selected as active while scrolling.
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: thresholds }
    );

    sections.forEach((el) => {
      visibility.set(el.id, 0);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof onExpandedChange === "function") onExpandedChange(expanded);
  }, [expanded, onExpandedChange]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${expanded ? "expanded" : ""}`}
    >
      <div className="sidebar__content">
        <div className="sidebar__brand">
          {expanded && (
            <div className="brand__text">
              <span className="brand__title">{profile?.name ?? "Liliana Teixeira Franchini"}</span>
              <span className="brand__subtitle">{profile?.role ?? "Advogada"}</span>
            </div>
          )}
        </div>

        <nav className="sidebar__nav" aria-label="Navegação principal">
          {navItems?.map((it) => (
            <button
              key={it.key}
              className="nav__item"
              type="button"
              data-active={current === it.key ? "true" : "false"}
              aria-current={current === it.key ? "page" : undefined}
              onClick={() => {
                const section = document.getElementById(it.key);
                if (section) {
                  const scrollPosition = it.key === "projects" ? "start" : "center";
                  section.scrollIntoView({ behavior: "smooth", block: scrollPosition });
                }
                currentRef.current = it.key;
                setCurrent(it.key);
                setExpanded(false);
              }}
            >
              <span className="nav__icon">{iconMap[it.icon]}</span>
              {expanded && <span className="nav__label">{it.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <button
        className="sidebar__toggle"
        type="button"
        aria-expanded={expanded ? "true" : "false"}
        aria-label={expanded ? "Recolher menu" : "Expandir menu"}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
      </button>
    </aside>
  );
}
