import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  X,
} from "lucide-react";
import { PortfolioProject } from "../data/portfolioData";

interface ProjectCaseModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  onInquire: (projectTitle: string) => void;
}

export const ProjectCaseModal: React.FC<ProjectCaseModalProps> = ({
  project,
  onClose,
  onNavigate,
  onInquire,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate("next");
      if (e.key === "ArrowLeft") onNavigate("prev");
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose, onNavigate]);

  if (!project) return null;

  return (
    <div
      className="pf-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div className="pf-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div
          className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom"
          style={{ borderColor: "var(--pf-border)" }}
        >
          <div className="d-flex align-items-center gap-2 pf-mono" style={{ fontSize: "0.75rem" }}>
            <span style={{ color: "var(--pf-accent)", fontWeight: 600 }}>
              CASO {project.index}
            </span>
            <span className="pf-text-muted">·</span>
            <span className="pf-text-secondary">{project.category}</span>
            <span className="pf-text-muted">·</span>
            <span className="pf-text-muted">{project.year}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="pf-icon-btn"
              onClick={() => onNavigate("prev")}
              aria-label="Proyecto anterior"
              title="Anterior"
            >
              <ArrowLeft size={15} />
            </button>
            <button
              type="button"
              className="pf-icon-btn"
              onClick={() => onNavigate("next")}
              aria-label="Proyecto siguiente"
              title="Siguiente"
            >
              <ArrowRight size={15} />
            </button>
            <button
              type="button"
              className="pf-icon-btn ms-1"
              onClick={onClose}
              aria-label="Cerrar detalle"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Cover preview image */}
        <div style={{ aspectRatio: "16 / 8.8", overflow: "hidden", background: "var(--pf-bg-alt)" }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Content body */}
        <div className="p-3 p-sm-4 p-md-5">
          <div className="mb-4">
            <h2 id="modal-project-title" className="h3 fw-bold mb-1">
              {project.title}
            </h2>
            <p className="pf-text-secondary mb-3">{project.subtitle}</p>

            {/* Metadata row */}
            <div
              className="row g-3 py-3 border-top border-bottom"
              style={{ borderColor: "var(--pf-border)" }}
            >
              <div className="col-6 col-md-3">
                <span className="pf-mono pf-text-muted d-block" style={{ fontSize: "0.7rem" }}>
                  ROL
                </span>
                <span className="fw-medium" style={{ fontSize: "0.84rem" }}>
                  {project.role}
                </span>
              </div>
              <div className="col-6 col-md-2">
                <span className="pf-mono pf-text-muted d-block" style={{ fontSize: "0.7rem" }}>
                  DURACIÓN
                </span>
                <span className="fw-medium" style={{ fontSize: "0.84rem" }}>
                  {project.duration}
                </span>
              </div>
              {project.metrics.slice(0, 2).map((m) => (
                <div key={m.label} className="col-6 col-md-3">
                  <span className="pf-mono pf-text-muted d-block" style={{ fontSize: "0.7rem" }}>
                    {m.label.toUpperCase()}
                  </span>
                  <span
                    className="pf-mono fw-semibold"
                    style={{ fontSize: "0.9rem", color: "var(--pf-accent)" }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <h3 className="h6 fw-bold mb-2">El reto</h3>
              <p className="pf-text-secondary mb-0" style={{ fontSize: "0.9rem" }}>
                {project.challenge}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <h3 className="h6 fw-bold mb-2">La solución</h3>
              <p className="pf-text-secondary mb-0" style={{ fontSize: "0.9rem" }}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key highlights */}
          <div
            className="p-3 p-md-4 rounded-3 mb-4"
            style={{ background: "var(--pf-bg-alt)", border: "1px solid var(--pf-border)" }}
          >
            <h3 className="h6 fw-bold mb-2">Resultados y detalles clave</h3>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="d-flex align-items-start gap-2 pf-text-secondary"
                  style={{ fontSize: "0.87rem" }}
                >
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-1"
                    style={{ color: "var(--pf-accent)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack & Footer actions */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech) => (
              <span key={tech} className="pf-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-2 pf-modal-actions">
            <button
              type="button"
              className="pf-btn-primary"
              onClick={() => onInquire(project.title)}
            >
              Consultar por un proyecto similar
              <ArrowUpRight size={16} />
            </button>

            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                onInquire(`Código / Demo de ${project.title}`);
              }}
              className="pf-btn-secondary"
            >
              <Code2 size={16} />
              Solicitar acceso al repositorio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
