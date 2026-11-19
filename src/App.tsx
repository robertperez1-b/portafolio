import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  FileDown,
  Loader2,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sun,
  X,
} from "lucide-react";
import {
  DEFAULT_PROFILE,
  EDUCATION_TIMELINE,
  EXPERIENCE_TIMELINE,
  PROJECTS,
  PROJECT_CATEGORIES,
  PortfolioProject,
  ProfileState,
  ProjectCategory,
  SKILL_GROUPS,
} from "./data/portfolioData";
import { ProjectCaseModal } from "./components/ProjectCaseModal";
import { downloadProfileCv } from "./utils/codeGenerator";

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pf-theme");
      if (saved === "light" || saved === "dark") return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Personal profile
  const [profile, setProfile] = useState<ProfileState>(DEFAULT_PROFILE);

  // Interactive Projects filter & Case Study modal
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("Todos");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  // Interactive Skills category switcher
  const [activeSkillGroupId, setActiveSkillGroupId] = useState<string>(SKILL_GROUPS[0].id);

  // Interactive Timeline accordion
  const [openTimelineIds, setOpenTimelineIds] = useState<string[]>(["exp-1", "edu-1"]);

  // Clipboard email feedback
  const [emailCopied, setEmailCopied] = useState(false);

  // Interactive 3D tilt on portrait hover
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPortraitTilt({ x: x * 20, y: -y * 20 });
  };

  const handlePortraitMouseLeave = () => {
    setIsPortraitHovered(false);
    setPortraitTilt({ x: 0, y: 0 });
  };

  // Contact form interactive state & live validation
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "Desarrollo de sitio web",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Persist theme & sync mobile status bar color
  useEffect(() => {
    try {
      localStorage.setItem("pf-theme", theme);
    } catch {
      // ignore
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", theme === "dark" ? "#121211" : "#faf9f6");
    }
  }, [theme]);

  // Sync document title with personalized name
  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`;
  }, [profile.name, profile.role]);

  // Scroll-spy for navbar links
  useEffect(() => {
    const ids = ["proyectos", "habilidades", "trayectoria", "contacto"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.05 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Todos") return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const activeSkillGroup = useMemo(
    () => SKILL_GROUPS.find((g) => g.id === activeSkillGroupId) ?? SKILL_GROUPS[0],
    [activeSkillGroupId]
  );

  const handleNavigateProject = useCallback(
    (direction: "prev" | "next") => {
      if (!activeProject) return;
      const idx = PROJECTS.findIndex((p) => p.id === activeProject.id);
      const nextIdx =
        direction === "next"
          ? (idx + 1) % PROJECTS.length
          : (idx - 1 + PROJECTS.length) % PROJECTS.length;
      setActiveProject(PROJECTS[nextIdx]);
    },
    [activeProject]
  );

  const handleInquireProject = useCallback((topic: string) => {
    setActiveProject(null);
    setSubmitted(false);
    setForm((prev) => ({
      ...prev,
      subject: "Consulta sobre proyecto",
      message: `Hola, me interesó «${topic}» y me gustaría conversar sobre una propuesta similar.`,
    }));
    setTimeout(() => {
      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
      document.getElementById("contact-name")?.focus();
    }, 120);
  }, []);

  const toggleTimelineItem = (id: string) => {
    setOpenTimelineIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };


  // Validate contact form fields
  const validate = (values: ContactFormState): ContactFormErrors => {
    const errs: ContactFormErrors = {};
    if (values.name.trim().length < 2) {
      errs.name = "Ingresa tu nombre (mínimo 2 caracteres).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(values.email.trim())) {
      errs.email = "Ingresa un correo electrónico válido.";
    }
    if (values.message.trim().length < 12) {
      errs.message = "Cuéntame un poco más (mínimo 12 caracteres).";
    }
    return errs;
  };

  const errors = validate(form);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const apiKey = (import.meta as any).env?.VITE_WEB3FORMS_KEY;

    if (apiKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: apiKey,
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            from_name: "Contacto Portafolio",
          }),
        });
        const data = await response.json();
        if (data.success) {
          setSubmitted(true);
        } else {
          throw new Error(data.message || "Error al procesar el mensaje.");
        }
      } catch (err: any) {
        setSubmitError(
          "No fue posible enviar mediante el servicio automático. Puedes enviarlo directamente por correo:"
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Si no hay API key configurada, abrir cliente de correo con los datos precompletados
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        `[${form.subject}] Mensaje de ${form.name}`
      )}&body=${encodeURIComponent(
        `Nombre: ${form.name}\nCorreo: ${form.email}\nMotivo: ${form.subject}\n\nMensaje:\n${form.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { id: "proyectos", label: "Proyectos" },
    { id: "habilidades", label: "Habilidades" },
    { id: "trayectoria", label: "Trayectoria" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <div className="pf-root" data-theme={theme}>
      {/* Sticky Minimal Navbar (Bootstrap container) */}
      <nav className="pf-navbar py-3" aria-label="Navegación principal">
        <div className="container d-flex align-items-center justify-content-between gap-3">
          <a href="#inicio" className="pf-brand">
            <span className="pf-brand-dot" aria-hidden="true" />
            <span>{profile.name}</span>
          </a>

          {/* Desktop links */}
          <div className="d-none d-lg-flex align-items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`pf-nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right utilities: Theme switch + Discrete Bootstrap Guide/HTML button */}
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="pf-icon-btn"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
              title={theme === "light" ? "Modo oscuro" : "Modo claro"}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <button
              type="button"
              className="pf-icon-btn d-inline-flex d-lg-none"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {/* Collapsible mobile menu */}
        {mobileMenuOpen && (
          <div
            className="container d-lg-none pt-3 pb-2 mt-2 border-top"
            style={{ borderColor: "var(--pf-border)" }}
          >
            <div className="d-flex flex-column gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`pf-nav-link py-2 ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main id="inicio">
        {/* 1. HERO SECTION */}
        <header className="pf-hero">
          <div className="container">
            <div className="row align-items-center g-5">
              {/* Left Column: Editorial Introduction */}
              <div className="col-12 col-lg-7">
                <div className="pf-status-pill">
                  <span className="pf-status-dot" aria-hidden="true" />
                  <span>{profile.availability}</span>
                </div>

                <h1 className="pf-hero-title">
                  {profile.headlinePrefix}{" "}
                  <span className="pf-serif-italic" style={{ color: "var(--pf-accent)" }}>
                    {profile.headlineAccent}
                  </span>{" "}
                  {profile.headlineSuffix}
                </h1>

                <p
                  className="pf-text-secondary mb-4"
                  style={{ fontSize: "1.06rem", maxWidth: "560px", lineHeight: 1.68 }}
                >
                  {profile.bio}
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="d-flex flex-wrap align-items-center gap-3 mb-4 pb-2">
                  <a href="#proyectos" className="pf-btn-primary">
                    Explorar proyectos
                    <ArrowDown size={16} />
                  </a>
                  <a href="#contacto" className="pf-btn-secondary">
                    Iniciar conversación
                  </a>
                </div>

                {/* Clean Utility Links */}
                <div
                  className="d-flex flex-wrap align-items-center gap-4 pt-3 border-top"
                  style={{ borderColor: "var(--pf-border)", maxWidth: "520px" }}
                >
                  <button
                    type="button"
                    className="pf-social-link"
                    onClick={() => downloadProfileCv(profile)}
                  >
                    <FileDown size={15} />
                    <span>Descargar CV</span>
                  </button>

                  <button
                    type="button"
                    className="pf-social-link"
                    onClick={handleCopyEmail}
                  >
                    {emailCopied ? <Check size={15} /> : <Copy size={15} />}
                    <span>{emailCopied ? "¡Correo copiado!" : profile.email}</span>
                  </button>

                  <span className="pf-social-link" style={{ cursor: "default" }}>
                    <MapPin size={15} />
                    <span>{profile.location}</span>
                  </span>

                  {profile.phone && (
                    <a
                      href="https://wa.me/584241347741"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-social-link"
                      title="Escribir por WhatsApp"
                    >
                      <Phone size={15} />
                      <span>{profile.phone}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Editorial Portrait with Interactive 3D Motion */}
              <div className="col-12 col-lg-5">
                <figure className="m-0 mx-auto" style={{ maxWidth: "380px" }}>
                  <div
                    className="pf-portrait-frame"
                    onMouseEnter={() => setIsPortraitHovered(true)}
                    onMouseMove={handlePortraitMouseMove}
                    onMouseLeave={handlePortraitMouseLeave}
                    style={{
                      transform: isPortraitHovered
                        ? `perspective(800px) rotateX(${portraitTilt.y}deg) rotateY(${portraitTilt.x}deg) translateY(-8px) scale(1.02)`
                        : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
                    }}
                  >
                    <img
                      src="/images/portrait.jpg"
                      alt={`Retrato de ${profile.name}`}
                    />
                  </div>
                  <figcaption
                    className="d-flex align-items-center justify-content-between pt-2 mt-1 pf-mono pf-text-muted"
                    style={{ fontSize: "0.74rem" }}
                  >
                    <span>{profile.role.split("&")[0].trim()}</span>
                    <span>UNETI · Laravel · Python · JS</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </header>

        {/* 2. PROYECTOS SELECCIONADOS (Filterable Grid + Case Study Modal) */}
        <section id="proyectos" className="pf-section">
          <div className="container">
            <div className="row align-items-end justify-content-between g-4 mb-5">
              <div className="col-12 col-lg-6">
                <span className="pf-eyebrow mb-2">01 · Proyectos</span>
                <h2 className="display-6 fw-bold mb-2">Trabajo seleccionado</h2>
                <p className="pf-text-secondary mb-0" style={{ maxWidth: "480px" }}>
                  Selección de interfaces y aplicaciones web responsivas. Haz clic en cualquier
                  proyecto para explorar el reto, la solución y sus métricas.
                </p>
              </div>

              <div className="col-12 col-lg-auto">
                <div
                  className="pf-filter-bar"
                  role="tablist"
                  aria-label="Filtrar proyectos por categoría"
                >
                  {PROJECT_CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat;
                    const count =
                      cat === "Todos"
                        ? PROJECTS.length
                        : PROJECTS.filter((p) => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`pf-filter-pill ${isActive ? "active" : ""}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                        <span className="pf-mono ms-1" style={{ opacity: 0.75, fontSize: "0.74rem" }}>
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Responsive 2-Column Bootstrap Grid */}
            <div className="row g-4">
              {filteredProjects.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <p className="pf-text-secondary mb-3">
                    No hay proyectos registrados en esta categoría por el momento.
                  </p>
                  <button
                    type="button"
                    className="pf-btn-secondary"
                    onClick={() => setSelectedCategory("Todos")}
                  >
                    Ver todos los proyectos ({PROJECTS.length})
                  </button>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div key={project.id} className="col-12 col-md-6">
                    <article
                      className="pf-project-card"
                      onClick={() => setActiveProject(project)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Abrir caso de estudio: ${project.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveProject(project);
                        }
                      }}
                    >
                      <div className="pf-project-media">
                        <img src={project.image} alt={project.title} loading="lazy" />
                      </div>

                      <div className="pf-project-body">
                        <div>
                          <div
                            className="d-flex align-items-center justify-content-between pf-mono pf-text-muted mb-2"
                            style={{ fontSize: "0.73rem" }}
                          >
                            <span>
                              <strong style={{ color: "var(--pf-accent)" }}>{project.index}</strong> ·{" "}
                              {project.category}
                            </span>
                            <span>{project.year}</span>
                          </div>

                          <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
                            <h3 className="h5 fw-bold mb-0">{project.title}</h3>
                            <span className="pf-project-arrow" aria-hidden="true">
                              <ArrowUpRight size={16} />
                            </span>
                          </div>

                          <p className="pf-text-secondary mb-0" style={{ fontSize: "0.9rem" }}>
                            {project.summary}
                          </p>
                        </div>

                        <div className="d-flex flex-wrap gap-1 pt-1">
                          {project.stack.map((tech) => (
                            <span key={tech} className="pf-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* 3. HABILIDADES Y HERRAMIENTAS (Interactive Category Switcher + Progress Bars) */}
        <section id="habilidades" className="pf-section pf-section-alt">
          <div className="container">
            <div className="row g-5 align-items-start">
              {/* Left Column: Intro + Interactive Category Selector */}
              <div className="col-12 col-lg-4">
                <span className="pf-eyebrow mb-2">02 · Habilidades</span>
                <h2 className="display-6 fw-bold mb-3">Dominio técnico y diseño</h2>
                <p className="pf-text-secondary mb-4" style={{ fontSize: "0.93rem" }}>
                  Combino bases sólidas en estándares web con criterio tipográfico y visual para
                  entregar productos mantenibles.
                </p>

                <div
                  className="d-flex flex-column gap-2"
                  role="tablist"
                  aria-label="Áreas de habilidad"
                >
                  {SKILL_GROUPS.map((group, idx) => {
                    const isActive = group.id === activeSkillGroup.id;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`pf-skill-tab ${isActive ? "active" : ""}`}
                        onClick={() => setActiveSkillGroupId(group.id)}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="fw-bold" style={{ fontSize: "0.95rem" }}>
                            {group.title}
                          </span>
                          <span
                            className="pf-mono"
                            style={{
                              fontSize: "0.73rem",
                              color: isActive ? "var(--pf-accent)" : "var(--pf-ink-muted)",
                            }}
                          >
                            0{idx + 1}
                          </span>
                        </div>
                        <span
                          className="d-block pf-text-muted"
                          style={{ fontSize: "0.81rem", lineHeight: 1.4 }}
                        >
                          {group.caption}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Skill Bars + Deliverables */}
              <div className="col-12 col-lg-8">
                <div className="pf-skill-panel">
                  <div
                    className="d-flex flex-wrap align-items-baseline justify-content-between gap-2 pb-3 mb-4 border-bottom"
                    style={{ borderColor: "var(--pf-border)" }}
                  >
                    <h3 className="h5 fw-bold mb-0">{activeSkillGroup.title}</h3>
                    <span className="pf-mono pf-text-muted" style={{ fontSize: "0.75rem" }}>
                      {activeSkillGroup.skills.length} competencias clave
                    </span>
                  </div>

                  <div className="d-flex flex-column gap-4 mb-4">
                    {activeSkillGroup.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="d-flex flex-wrap align-items-baseline justify-content-between gap-2 mb-1">
                          <span className="fw-semibold" style={{ fontSize: "0.93rem" }}>
                            {skill.name}
                          </span>
                          <div className="d-flex align-items-center gap-2 pf-mono" style={{ fontSize: "0.75rem" }}>
                            <span className="pf-text-muted d-none d-sm-inline">
                              {skill.experience}
                            </span>
                            <span style={{ color: "var(--pf-accent)", fontWeight: 600 }}>
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        <div
                          className="pf-skill-track my-2"
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={skill.name}
                        >
                          <div
                            className="pf-skill-fill"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        <p className="pf-text-secondary mb-0" style={{ fontSize: "0.84rem" }}>
                          {skill.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables summary strip */}
                  <div
                    className="pt-4 border-top"
                    style={{ borderColor: "var(--pf-border)" }}
                  >
                    <span
                      className="pf-mono pf-text-muted d-block mb-3"
                      style={{ fontSize: "0.72rem", letterSpacing: "0.06em" }}
                    >
                      ENTREGABLES HABITUALES
                    </span>
                    <div className="row g-2">
                      {activeSkillGroup.deliverables.map((item) => (
                        <div key={item} className="col-12 col-sm-6">
                          <div
                            className="d-flex align-items-center gap-2"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <Check
                              size={15}
                              className="flex-shrink-0"
                              style={{ color: "var(--pf-accent)" }}
                            />
                            <span className="pf-text-secondary">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRAYECTORIA Y FORMACIÓN (Interactive Expandable Timeline) */}
        <section id="trayectoria" className="pf-section">
          <div className="container">
            <div className="mb-5">
              <span className="pf-eyebrow mb-2">03 · Trayectoria</span>
              <h2 className="display-6 fw-bold mb-2">Experiencia y formación</h2>
              <p className="pf-text-secondary mb-0" style={{ maxWidth: "540px" }}>
                Recorrido profesional y académico en desarrollo web. Selecciona cualquier etapa para
                desplegar los logros principales.
              </p>
            </div>

            <div className="row g-5">
              {/* Experience Column */}
              <div className="col-12 col-lg-6">
                <h3
                  className="pf-mono fw-semibold text-uppercase pb-2 mb-3 border-bottom"
                  style={{
                    fontSize: "0.76rem",
                    letterSpacing: "0.07em",
                    borderColor: "var(--pf-border)",
                    color: "var(--pf-ink-muted)",
                  }}
                >
                  Experiencia Profesional
                </h3>

                {EXPERIENCE_TIMELINE.map((item) => {
                  const isOpen = openTimelineIds.includes(item.id);
                  return (
                    <div key={item.id} className="pf-timeline-item">
                      <button
                        type="button"
                        className="pf-timeline-trigger"
                        aria-expanded={isOpen}
                        onClick={() => toggleTimelineItem(item.id)}
                      >
                        <div className="d-flex align-items-start justify-content-between gap-3">
                          <div>
                            <span
                              className="pf-mono d-block mb-1"
                              style={{ fontSize: "0.75rem", color: "var(--pf-accent)" }}
                            >
                              {item.period}
                            </span>
                            <h4 className="h6 fw-bold mb-1">{item.role}</h4>
                            <span className="pf-text-muted" style={{ fontSize: "0.84rem" }}>
                              {item.organization} · {item.location}
                            </span>
                          </div>
                          <ChevronDown
                            size={18}
                            className="pf-text-muted flex-shrink-0 mt-1"
                            style={{
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s ease",
                            }}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="pt-3">
                          <p className="pf-text-secondary mb-2" style={{ fontSize: "0.88rem" }}>
                            {item.summary}
                          </p>
                          <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                            {item.achievements.map((ach) => (
                              <li
                                key={ach}
                                className="d-flex align-items-start gap-2 pf-text-secondary"
                                style={{ fontSize: "0.83rem" }}
                              >
                                <span style={{ color: "var(--pf-accent)" }}>—</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Education Column */}
              <div className="col-12 col-lg-6">
                <h3
                  className="pf-mono fw-semibold text-uppercase pb-2 mb-3 border-bottom"
                  style={{
                    fontSize: "0.76rem",
                    letterSpacing: "0.07em",
                    borderColor: "var(--pf-border)",
                    color: "var(--pf-ink-muted)",
                  }}
                >
                  Formación y Certificaciones
                </h3>

                {EDUCATION_TIMELINE.map((item) => {
                  const isOpen = openTimelineIds.includes(item.id);
                  return (
                    <div key={item.id} className="pf-timeline-item">
                      <button
                        type="button"
                        className="pf-timeline-trigger"
                        aria-expanded={isOpen}
                        onClick={() => toggleTimelineItem(item.id)}
                      >
                        <div className="d-flex align-items-start justify-content-between gap-3">
                          <div>
                            <span
                              className="pf-mono d-block mb-1"
                              style={{ fontSize: "0.75rem", color: "var(--pf-accent)" }}
                            >
                              {item.period}
                            </span>
                            <h4 className="h6 fw-bold mb-1">{item.role}</h4>
                            <span className="pf-text-muted" style={{ fontSize: "0.84rem" }}>
                              {item.organization} · {item.location}
                            </span>
                          </div>
                          <ChevronDown
                            size={18}
                            className="pf-text-muted flex-shrink-0 mt-1"
                            style={{
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s ease",
                            }}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="pt-3">
                          <p className="pf-text-secondary mb-2" style={{ fontSize: "0.88rem" }}>
                            {item.summary}
                          </p>
                          <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                            {item.achievements.map((ach) => (
                              <li
                                key={ach}
                                className="d-flex align-items-start gap-2 pf-text-secondary"
                                style={{ fontSize: "0.83rem" }}
                              >
                                <span style={{ color: "var(--pf-accent)" }}>—</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 5. CONTACTO DIRECTO (Live JS Validation + Instant Email Copy) */}
        <section id="contacto" className="pf-section pf-section-alt">
          <div className="container">
            <div className="row g-5 justify-content-between align-items-start">
              {/* Left Column */}
              <div className="col-12 col-lg-5">
                <span className="pf-eyebrow mb-2">04 · Contacto</span>
                <h2 className="display-6 fw-bold mb-3">
                  Construyamos algo{" "}
                  <span className="pf-serif-italic" style={{ color: "var(--pf-accent)" }}>
                    bien hecho
                  </span>
                  .
                </h2>
                <p className="pf-text-secondary mb-4">
                  Si buscas colaborar en un sitio web, necesitas apoyo frontend para tu equipo o
                  quieres conversar sobre una oportunidad profesional, escríbeme. Respondo en menos
                  de 24 horas.
                </p>

                <div
                  className="d-flex flex-column gap-3 pt-3 border-top"
                  style={{ borderColor: "var(--pf-border)" }}
                >
                  <div>
                    <span
                      className="pf-mono pf-text-muted d-block mb-1"
                      style={{ fontSize: "0.72rem" }}
                    >
                      CORREO DIRECTO
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="btn btn-link p-0 text-decoration-none fw-bold d-inline-flex align-items-center gap-2"
                      style={{ color: "var(--pf-ink)", fontSize: "1.05rem" }}
                    >
                      <span>{profile.email}</span>
                      {emailCopied ? (
                        <span
                          className="pf-mono fw-medium"
                          style={{ fontSize: "0.75rem", color: "var(--pf-success)" }}
                        >
                          ¡Copiado!
                        </span>
                      ) : (
                        <Copy size={15} className="pf-text-muted" />
                      )}
                    </button>
                  </div>

                  <div>
                    <span
                      className="pf-mono pf-text-muted d-block mb-1"
                      style={{ fontSize: "0.72rem" }}
                    >
                      UBICACIÓN Y MODALIDAD
                    </span>
                    <span className="pf-text-secondary" style={{ fontSize: "0.92rem" }}>
                      {profile.location} · Trabajo presencial, híbrido o remoto
                    </span>
                  </div>

                  {profile.phone && (
                    <div>
                      <span
                        className="pf-mono pf-text-muted d-block mb-1"
                        style={{ fontSize: "0.72rem" }}
                      >
                        TELÉFONO &amp; WHATSAPP
                      </span>
                      <a
                        href="https://wa.me/584241347741"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-link p-0 text-decoration-none fw-bold d-inline-flex align-items-center gap-2"
                        style={{ color: "var(--pf-ink)", fontSize: "1.02rem" }}
                      >
                        <Phone size={15} style={{ color: "var(--pf-accent)" }} />
                        <span>{profile.phone}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Validated Bootstrap Form */}
              <div className="col-12 col-lg-6">
                <div className="pf-form-card">
                  {submitted ? (
                    <div className="py-4 text-center">
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                        style={{
                          width: "52px",
                          height: "52px",
                          background: "var(--pf-success-soft)",
                          color: "var(--pf-success)",
                        }}
                      >
                        <CheckCircle2 size={26} />
                      </div>
                      <h3 className="h4 fw-bold mb-2">¡Mensaje enviado, {form.name.split(" ")[0]}!</h3>
                      <p className="pf-text-secondary mb-4" style={{ fontSize: "0.92rem" }}>
                        Gracias por escribir sobre <strong>{form.subject.toLowerCase()}</strong>. Te
                        responderé pronto a <span className="pf-mono">{form.email}</span>.
                      </p>
                      <button
                        type="button"
                        className="pf-btn-secondary"
                        onClick={() => {
                          setSubmitted(false);
                          setTouched({});
                          setForm({
                            name: "",
                            email: "",
                            subject: "Desarrollo de sitio web",
                            message: "",
                          });
                        }}
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="row g-3">
                        <div className="col-12 col-sm-6">
                          <label htmlFor="contact-name" className="pf-label">
                            Nombre completo
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            className={`pf-input ${touched.name && errors.name ? "is-error" : ""}`}
                            placeholder="Ana García"
                            value={form.name}
                            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                          {touched.name && errors.name && (
                            <small className="text-danger d-block mt-1" style={{ fontSize: "0.76rem" }}>
                              {errors.name}
                            </small>
                          )}
                        </div>

                        <div className="col-12 col-sm-6">
                          <label htmlFor="contact-email" className="pf-label">
                            Correo electrónico
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            className={`pf-input ${touched.email && errors.email ? "is-error" : ""}`}
                            placeholder="ana@ejemplo.com"
                            value={form.email}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                          {touched.email && errors.email && (
                            <small className="text-danger d-block mt-1" style={{ fontSize: "0.76rem" }}>
                              {errors.email}
                            </small>
                          )}
                        </div>

                        <div className="col-12">
                          <label htmlFor="contact-subject" className="pf-label">
                            Motivo de contacto
                          </label>
                          <select
                            id="contact-subject"
                            className="pf-input"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          >
                            <option value="Desarrollo de software / Web">Desarrollo de software / Web</option>
                            <option value="Desarrollo Backend / Laravel / Python">
                              Desarrollo Backend / Laravel / Python
                            </option>
                            <option value="Soporte técnico e infraestructura">
                              Soporte técnico e infraestructura
                            </option>
                            <option value="Automatización con n8n">Automatización con n8n</option>
                            <option value="Oportunidad laboral">Oportunidad laboral</option>
                          </select>
                        </div>

                        <div className="col-12">
                          <div className="d-flex justify-content-between align-items-baseline">
                            <label htmlFor="contact-message" className="pf-label">
                              Mensaje
                            </label>
                            <span className="pf-mono pf-text-muted" style={{ fontSize: "0.71rem" }}>
                              {form.message.length} / 500
                            </span>
                          </div>
                          <textarea
                            id="contact-message"
                            rows={4}
                            maxLength={500}
                            className={`pf-input ${
                              touched.message && errors.message ? "is-error" : ""
                            }`}
                            placeholder="Cuéntame sobre el proyecto, plazos estimados o cómo puedo ayudarte..."
                            value={form.message}
                            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                          />
                          {touched.message && errors.message && (
                            <small className="text-danger d-block mt-1" style={{ fontSize: "0.76rem" }}>
                              {errors.message}
                            </small>
                          )}
                        </div>

                        {submitError && (
                          <div className="col-12">
                            <div
                              className="p-3 rounded-3"
                              style={{
                                background: "rgba(220, 53, 69, 0.08)",
                                border: "1px solid rgba(220, 53, 69, 0.2)",
                              }}
                            >
                              <p className="text-danger small mb-2">{submitError}</p>
                              <a
                                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                                  `[${form.subject}] Mensaje de ${form.name}`
                                )}&body=${encodeURIComponent(form.message)}`}
                                className="pf-btn-secondary py-1 px-3 d-inline-flex"
                                style={{ fontSize: "0.82rem" }}
                              >
                                Abrir correo hacia {profile.email}
                              </a>
                            </div>
                          </div>
                        )}

                        <div className="col-12 pt-2">
                          <button
                            type="submit"
                            className="pf-btn-primary"
                            disabled={isSubmitting}
                            style={{ opacity: isSubmitting ? 0.7 : 1 }}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 size={15} className="spinner-border spinner-border-sm" />
                                <span>Enviando...</span>
                              </>
                            ) : (
                              <>
                                <Send size={15} />
                                <span>Enviar mensaje</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <footer
        className="py-4 border-top"
        style={{ borderColor: "var(--pf-border)", fontSize: "0.83rem" }}
      >
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
          <span className="pf-text-muted">
            © 2026 <strong style={{ color: "var(--pf-ink)" }}>{profile.name}</strong> · Construido
            con HTML, CSS, Bootstrap 5 y JavaScript.
          </span>

          <div className="d-flex align-items-center gap-4">
            <a href="#inicio" className="pf-social-link">
              <span>Volver arriba</span>
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </footer>

      {/* Case Study Modal */}
      <ProjectCaseModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onNavigate={handleNavigateProject}
        onInquire={handleInquireProject}
      />
    </div>
  );
}

export default App;
