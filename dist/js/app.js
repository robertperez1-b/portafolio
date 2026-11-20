/* ============================================================
   Robert Pérez — Portafolio · JavaScript Principal
   Stack: HTML + CSS + Bootstrap 5 + JavaScript
   ============================================================ */

// ---- SVG Icon Helpers ----
const Icons = {
  moon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  sun: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  menu: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  arrowDown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
  arrowUp: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>',
  arrowUpRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 5 7 7-7 7"/><path d="M5 12h14"/></svg>',
  fileDown: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>',
  copy: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
  send: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="m22 2-11 11"/></svg>',
  loader: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pf-spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  code2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
};

// ---- Portfolio Data ----
const PROFILE = {
  name: "Robert Pérez",
  role: "Desarrollador de Software & Especialista en Soporte Técnico",
  location: "Caracas, Venezuela",
  email: "perezrobert2002@gmail.com",
  phone: "(+58) 424-134-77-41",
  availability: "Disponible para proyectos de desarrollo y soporte · 2026",
  headlinePrefix: "Desarrollo soluciones de software",
  headlineAccent: "eficientes, seguras",
  headlineSuffix: "y orientadas a la experiencia del usuario.",
  bio: "Técnico Superior Universitario en Informática (UNETI) con experiencia sólida en JavaScript, Python y PHP. Especialista en arquitecturas con Laravel, interfaces responsivas con Bootstrap y Tailwind, administración de entornos Linux/Windows, soporte integral y automatización con n8n.",
};

const PROJECTS = [
  {
    id: "senamecf-inventario", index: "01",
    title: "Sistema de Inventario — SENAMECF",
    subtitle: "Plataforma web para el control de inventario de Bienes Nacionales",
    category: "Backend & APIs", year: "2024 — 2026",
    role: "Desarrollador Fullstack & Laravel", duration: "En producción continua",
    image: "images/inventario.jpg",
    summary: "Diseño e implementación de un sistema integral de inventario y trazabilidad para el departamento de Bienes Nacionales del SENAMECF, optimizando el ciclo de vida y custodia de los activos institucionales.",
    challenge: "Reemplazar los registros manuales y hojas dispersas con un sistema centralizado, auditado y seguro, que garantice coherencia en el inventario y tiempos de consulta inmediatos.",
    solution: "Desarrollé una solución en Laravel con modelo relacional seguro en MySQL, control de accesos por roles (RBAC), generación automatizada de actas de inventario y reportes exportables.",
    highlights: [
      "Módulo integral de altas, bajas, transferencias y mantenimiento de activos.",
      "Generación de reportes instantáneos y actas de entrega en formato estandarizado.",
      "Reducción sustancial del tiempo de conciliación de inventario institucional.",
    ],
    metrics: [
      { label: "Precisión inventario", value: "99.8 %" },
      { label: "Tiempo de reporte", value: "< 2 seg" },
      { label: "Arquitectura", value: "Laravel / MVC" },
    ],
    stack: ["PHP", "Laravel", "MySQL", "Bootstrap 5", "JavaScript", "Linux"],
    liveUrl: "mailto:perezrobert2002@gmail.com?subject=Consulta%20Sistema%20SENAMECF",
    repoUrl: "https://github.com",
  },
  {
    id: "gestion-educativa", index: "02",
    title: "Sistema Modular de Gestión Educativa & Ambiental",
    subtitle: "Plataforma administrativa con control operativo y seguimiento ambiental",
    category: "Aplicación Web", year: "2025",
    role: "Analista & Desarrollador de Software", duration: "5 meses",
    image: "images/plaga.jpg",
    summary: "Sistema modular orientado a la gestión académica, administrativa y de bienestar escolar, incorporando un módulo especializado para el control, reporte y seguimiento ambiental y de plagas.",
    challenge: "Las instituciones educativas requerían no solo gestionar expedientes y asistencia, sino también prevenir riesgos sanitarios y operativos de forma coordinada con la dirección y el personal de apoyo.",
    solution: "Diseñé una arquitectura modular con interfaces accesibles, sistema de alertas tempranas para mantenimiento e incidencias ambientales, y tableros de control para la toma de decisiones directivas.",
    highlights: [
      "Módulo de reporte y seguimiento ambiental/sanitario en tiempo real.",
      "Paneles segmentados por rol (directivos, personal operativo y docente).",
      "Mejora comprobada en la respuesta operativa y condiciones sanitarias del centro.",
    ],
    metrics: [
      { label: "Eficiencia de reporte", value: "+45 %" },
      { label: "Módulos activos", value: "6 módulos" },
      { label: "Adopción de usuarios", value: "100 %" },
    ],
    stack: ["JavaScript", "Python", "Flask", "Tailwind CSS", "HTML5", "PostgreSQL"],
    liveUrl: "mailto:perezrobert2002@gmail.com?subject=Consulta%20Sistema%20Educativo",
    repoUrl: "https://github.com",
  },
  {
    id: "inatur-soporte", index: "03",
    title: "Dashboard de Métricas & Control de Inventario — INATUR",
    subtitle: "Panel interactivo de KPIs de soporte, trazabilidad de activos y análisis de incidentes",
    category: "Datos Interactivos", year: "2022",
    role: "Especialista en Soporte & Análisis de Datos", duration: "6 meses",
    image: "images/dashboard-inatur.jpg",
    summary: "Diseño e implementación de un tablero interactivo de control para el departamento de Informática, con visualización estadística de incidentes, trazabilidad del parque tecnológico y métricas de resolución técnica.",
    challenge: "Ausencia de un registro histórico y visual centralizado de averías, piezas y soluciones técnicas aplicadas, lo que provocaba demoras en la resolución de incidentes repetitivos.",
    solution: "Estructuré un catálogo exhaustivo con modelado de datos en Power BI, indicadores de rendimiento (KPIs), planos de red en Visio y base documental para agilizar el soporte.",
    highlights: [
      "Tablero dinámico de control con métricas de incidentes y tiempos de respuesta.",
      "Inventario interactivo de hardware, periféricos y licencias de software.",
      "Aumento en la tasa de resolución en primer contacto de soporte técnico.",
    ],
    metrics: [
      { label: "Equipos inventariados", value: "150+" },
      { label: "Tiempo de resolución", value: "-40 %" },
      { label: "Satisfacción usuario", value: "96 %" },
    ],
    stack: ["Power BI", "SQL", "Excel Avanzado", "Soporte IT", "Visio"],
    liveUrl: "mailto:perezrobert2002@gmail.com?subject=Consulta%20Datos%20INATUR",
    repoUrl: "https://github.com",
  },
  {
    id: "sundde-infraestructura", index: "04",
    title: "Despliegue y Mantenimiento Operativo — SUNDDE",
    subtitle: "Mantenimiento integral a estaciones de trabajo y mejora en calidad de servicio",
    category: "Soporte & Infraestructura", year: "2023",
    role: "Soporte Técnico Especializado", duration: "1 año",
    image: "images/sundde.jpg",
    summary: "Instalación, configuración y mantenimiento de sistemas operativos Windows y Linux en estaciones críticas, implementando estrategias de limpieza lógica/física y atención a usuarios.",
    challenge: "Garantizar la alta disponibilidad de estaciones de trabajo bajo constante carga operativa y asegurar la conectividad y seguridad de los puestos de atención.",
    solution: "Ejecuté planes de mantenimiento preventivo y correctivo, estandarización de imágenes de sistema operativo y rutinas de optimización para extender la vida útil del equipamiento.",
    highlights: [
      "Instalación y configuración de estaciones en entornos Windows y Linux.",
      "Planes periódicos de desinfección, actualización y mantenimiento preventivo.",
      "Optimización en la continuidad operativa de los puestos de trabajo.",
    ],
    metrics: [
      { label: "Disponibilidad", value: "99.5 %" },
      { label: "Sistemas atendidos", value: "Win & Linux" },
      { label: "Mantenimientos", value: "Preventivo / Correctivo" },
    ],
    stack: ["Windows", "Linux", "Redes LAN", "Automatización n8n", "Seguridad"],
    liveUrl: "mailto:perezrobert2002@gmail.com?subject=Consulta%20Infraestructura%20SUNDDE",
    repoUrl: "https://github.com",
  },
];

const PROJECT_CATEGORIES = ["Todos", "Aplicación Web", "Backend & APIs", "Soporte & Infraestructura", "Datos Interactivos"];

const SKILL_GROUPS = [
  {
    id: "desarrollo",
    title: "Desarrollo de Software & Fullstack",
    caption: "Tecnologías frontend y backend para aplicaciones robustas",
    skills: [
      { name: "PHP & Laravel (MVC, Eloquent, APIs, Blade)", level: 92, experience: "2+ años · Sistemas en producción", detail: "Desarrollo de sistemas de inventario, modelos relacionales, autenticación y lógica de negocio segura." },
      { name: "JavaScript (ES6+, DOM, Asincronía, Fetch)", level: 90, experience: "Habilidad sólida · Frontend interactivo", detail: "Interfaces dinámicas, manipulación del DOM, consumo de servicios y validaciones cliente." },
      { name: "Python (Django, Flask & Scripts de Automatización)", level: 86, experience: "Desarrollo backend y utilidades", detail: "Creación de APIs REST, servicios modulares, análisis de datos y scripts de automatización." },
      { name: "Frontend Moderno (React, Angular, Bootstrap, Tailwind)", level: 88, experience: "Maquetación y componentes", detail: "Diseño responsivo mobile-first, Tailwind CSS, Bootstrap 5 y arquitectura de componentes." },
    ],
    deliverables: ["Sistemas web y plataformas administrativas a medida", "APIs RESTful seguras y documentadas", "Módulos de inventario y trazabilidad", "Interfaces de usuario responsivas y accesibles"],
  },
  {
    id: "soporte",
    title: "Soporte Técnico & Sistemas Operativos",
    caption: "Mantenimiento, diagnóstico y administración de infraestructura",
    skills: [
      { name: "Administración de Sistemas Operativos (Windows & Linux)", level: 94, experience: "Instalación, hardening y soporte", detail: "Instalación, configuración y mantenimiento de distribuciones Linux (Ubuntu/Debian) y entornos Windows." },
      { name: "Soporte de Hardware & Mantenimiento Técnico", level: 95, experience: "Preventivo y correctivo", detail: "Diagnóstico de componentes, ensamblaje, sustitución de hardware, optimización térmica y limpieza." },
      { name: "Redes, Seguridad y Servidores Linux", level: 88, experience: "Infraestructura y ciberseguridad", detail: "Diseño básico de infraestructura de red, seguridad de servidores Linux, prevención de ransomware y permisos." },
      { name: "Contenedores Docker & Virtualización", level: 82, experience: "Aislamiento de entornos", detail: "Despliegue de aplicaciones en contenedores, gestión de imágenes y máquinas virtuales." },
    ],
    deliverables: ["Planes de mantenimiento preventivo y correctivo", "Diagnóstico y reparación de estaciones de trabajo", "Configuración y seguridad de servidores", "Estandarización de imágenes de sistema"],
  },
  {
    id: "herramientas",
    title: "Automatización, Datos & Metodologías",
    caption: "Productividad, flujos de trabajo e inteligencia de negocio",
    skills: [
      { name: "Automatización de Flujos de Trabajo (n8n)", level: 88, experience: "Integración de procesos", detail: "Automatización de tareas repetitivas, conexión entre APIs y orquestación de flujos de datos." },
      { name: "Power BI & Paquetes de Ofimática Avanzada", level: 89, experience: "Análisis y reportes", detail: "Creación de tableros de control visuales, KPIs, modelado de métricas e informes ejecutivos." },
      { name: "Metodologías Ágiles Scrum (Jira, Trello, Miro)", level: 90, experience: "Gestión de proyectos", detail: "Planificación por sprints, roadmaps de producto y documentación viva bajo estándares ISO/IEC/IEEE." },
      { name: "Visio & Documentación Técnica Estructurada", level: 87, experience: "Planos y especificaciones", detail: "Estructuración de planos de red, diagramas de flujo de procesos y manuales técnicos." },
    ],
    deliverables: ["Flujos automatizados con n8n", "Dashboards ejecutivos en Power BI", "Documentación bajo ISO/IEC/IEEE 26514 y 12207", "Planos de infraestructura en Microsoft Visio"],
  },
];

const EXPERIENCE_TIMELINE = [
  { id: "exp-1", period: "2024 — 2026", role: "Desarrollador de Software (Laravel)", organization: "SENAMECF", location: "Caracas, Venezuela", summary: "Desarrollo e implementación del sistema central de inventario para el departamento de Bienes Nacionales, desarrollado en el framework Laravel.", achievements: ["Implementación del módulo de registro, catalogación, traslados y auditoría de activos nacionales.", "Optimización de consultas en base de datos para generación inmediata de reportes de bienes."] },
  { id: "exp-2", period: "2025", role: "Desarrollador de Software", organization: "Unidad Educativa", location: "Caracas, Venezuela", summary: "Análisis y desarrollo de un sistema modular enfocado en la gestión educativa institucional con módulo especializado de reporte y seguimiento ambiental/plagas.", achievements: ["Diseño e implementación del módulo de control y seguimiento ambiental para el bienestar escolar.", "Estructuración de arquitectura modular escalable para incorporar nuevos servicios académicos."] },
  { id: "exp-3", period: "2023", role: "Soporte Técnico & Mantenimiento de Sistemas", organization: "SUNDDE", location: "Caracas, Venezuela", summary: "Soporte técnico a usuarios para solución de problemáticas de hardware y software, asegurando la continuidad de las operaciones institucionales.", achievements: ["Instalación y configuración de sistemas operativos Windows y Linux en estaciones críticas.", "Implementación de estrategias preventivas de limpieza y mejora en la calidad del servicio técnico."] },
  { id: "exp-4", period: "2022", role: "Soporte Técnico & Gestión de Inventario", organization: "INATUR", location: "Caracas, Venezuela", summary: "Soporte técnico integral a usuarios internos y externos, instalación y mantenimiento de equipos informáticos.", achievements: ["Diseño e implementación de un inventario óptimo en el departamento de Informática.", "Documentación estructurada de casos y seguimiento de incidentes para conservación de soluciones."] },
];

const EDUCATION_TIMELINE = [
  { id: "edu-1", period: "2021 — 2024", role: "Técnico Superior Universitario en Informática", organization: "Universidad Nacional Experimental de las Telecomunicaciones e Informática (UNETI)", location: "Caracas, Venezuela", summary: "Formación universitaria superior en desarrollo de software, arquitectura de sistemas, bases de datos, redes de telecomunicaciones y soporte de tecnología de información.", achievements: ["Especialización práctica en lenguajes de programación (JavaScript, Python, PHP) y metodologías ágiles Scrum."] },
  { id: "edu-2", period: "Certificaciones Técnicas", role: "Ciberseguridad, Servidores Linux y Desarrollo Web", organization: "Fundación Telefónica & Academias Especializadas", location: "Credenciales de Formación Continua", summary: "Certificaciones en Técnico en Mantenimiento de Computadoras, Seguridad de Servidores Linux, Desarrollo con Laravel, Ciberseguridad («The end of Ransomware»), Taller Fundación Telefónica y Atención al Cliente.", achievements: ["Documentación de software bajo estándares internacionales ISO/IEC/IEEE 26514 e ISO/IEC 12207.", "Manejo de herramientas ágiles Scrum: Jira, Trello, Miro y Roadmap."] },
  { id: "edu-3", period: "Educación Secundaria", role: "Bachiller en Ciencias", organization: "Unidad Educativa «Nicanor Bolet Peraza»", location: "Caracas, Venezuela", summary: "Educación secundaria concluida con formación básica en ciencias exactas y computación.", achievements: ["Educación primaria cursada en Unidad Educativa «Ciudad de Barcelona»."] },
];


// ============================================================
//  APP STATE
// ============================================================
const state = {
  theme: "light",
  mobileMenuOpen: false,
  activeSection: "",
  selectedCategory: "Todos",
  activeSkillGroupId: SKILL_GROUPS[0].id,
  openTimelineIds: ["exp-1", "edu-1"],
  emailCopied: false,
  portraitTilt: { x: 0, y: 0 },
  isPortraitHovered: false,
  form: { name: "", email: "", subject: "Desarrollo de software / Web", message: "" },
  touched: {},
  submitted: false,
  isSubmitting: false,
  submitError: null,
  activeProject: null,
};


// ============================================================
//  THEME
// ============================================================
function initTheme() {
  const saved = localStorage.getItem("pf-theme");
  if (saved === "light" || saved === "dark") {
    state.theme = saved;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    state.theme = "dark";
  }
  applyTheme();
}

function applyTheme() {
  document.querySelector(".pf-root").setAttribute("data-theme", state.theme);
  try { localStorage.setItem("pf-theme", state.theme); } catch {}
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", state.theme === "dark" ? "#121211" : "#faf9f6");
  const btn = document.getElementById("btn-theme");
  if (btn) btn.innerHTML = state.theme === "light" ? Icons.moon : Icons.sun;
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
}


// ============================================================
//  MOBILE MENU
// ============================================================
function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  const mobileMenu = document.getElementById("mobile-menu");
  const btnMenu = document.getElementById("btn-mobile-menu");
  if (state.mobileMenuOpen) {
    mobileMenu.classList.remove("d-none");
    btnMenu.innerHTML = Icons.x;
    btnMenu.setAttribute("aria-expanded", "true");
  } else {
    mobileMenu.classList.add("d-none");
    btnMenu.innerHTML = Icons.menu;
    btnMenu.setAttribute("aria-expanded", "false");
  }
}

function closeMobileMenu() {
  state.mobileMenuOpen = false;
  const mobileMenu = document.getElementById("mobile-menu");
  const btnMenu = document.getElementById("btn-mobile-menu");
  if (mobileMenu) mobileMenu.classList.add("d-none");
  if (btnMenu) {
    btnMenu.innerHTML = Icons.menu;
    btnMenu.setAttribute("aria-expanded", "false");
  }
}


// ============================================================
//  SCROLL-SPY
// ============================================================
function initScrollSpy() {
  const ids = ["proyectos", "habilidades", "trayectoria", "contacto"];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          state.activeSection = entry.target.id;
          document.querySelectorAll(".pf-nav-link").forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.05 }
  );
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}


// ============================================================
//  PROJECT FILTERS
// ============================================================
function renderFilterPills() {
  const bar = document.getElementById("filter-bar");
  bar.innerHTML = PROJECT_CATEGORIES.map((cat) => {
    const count = cat === "Todos" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
    const isActive = state.selectedCategory === cat;
    return `<button type="button" role="tab" aria-selected="${isActive}" class="pf-filter-pill ${isActive ? 'active' : ''}" data-category="${cat}">${cat} <span class="pf-mono ms-1" style="opacity:0.75;font-size:0.74rem">(${count})</span></button>`;
  }).join("");

  bar.querySelectorAll(".pf-filter-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedCategory = btn.dataset.category;
      renderFilterPills();
      renderProjects();
    });
  });
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  const filtered = state.selectedCategory === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.category === state.selectedCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="pf-text-secondary mb-3">No hay proyectos registrados en esta categoría por el momento.</p>
        <button type="button" class="pf-btn-secondary" onclick="state.selectedCategory='Todos';renderFilterPills();renderProjects();">Ver todos los proyectos (${PROJECTS.length})</button>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((p) => `
    <div class="col-12 col-md-6">
      <article class="pf-project-card" tabindex="0" role="button" aria-label="Abrir caso de estudio: ${p.title}" data-project-id="${p.id}">
        <div class="pf-project-media">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="pf-project-body">
          <div>
            <div class="d-flex align-items-center justify-content-between pf-mono pf-text-muted mb-2" style="font-size:0.73rem">
              <span><strong style="color:var(--pf-accent)">${p.index}</strong> · ${p.category}</span>
              <span>${p.year}</span>
            </div>
            <div class="d-flex align-items-start justify-content-between gap-3 mb-2">
              <h3 class="h5 fw-bold mb-0">${p.title}</h3>
              <span class="pf-project-arrow" aria-hidden="true">${Icons.arrowUpRight}</span>
            </div>
            <p class="pf-text-secondary mb-0" style="font-size:0.9rem">${p.summary}</p>
          </div>
          <div class="d-flex flex-wrap gap-1 pt-1">
            ${p.stack.map((t) => `<span class="pf-tag">${t}</span>`).join("")}
          </div>
        </div>
      </article>
    </div>`).join("");

  grid.querySelectorAll(".pf-project-card").forEach((card) => {
    card.addEventListener("click", () => openProjectModal(card.dataset.projectId));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProjectModal(card.dataset.projectId); }
    });
  });
}


// ============================================================
//  PROJECT CASE STUDY MODAL
// ============================================================
function openProjectModal(projectId) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return;
  state.activeProject = project;
  renderModal();
  document.getElementById("project-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  state.activeProject = null;
  document.getElementById("project-modal").classList.add("hidden");
  document.body.style.overflow = "";
}

function navigateProject(direction) {
  if (!state.activeProject) return;
  const idx = PROJECTS.findIndex((p) => p.id === state.activeProject.id);
  const nextIdx = direction === "next" ? (idx + 1) % PROJECTS.length : (idx - 1 + PROJECTS.length) % PROJECTS.length;
  state.activeProject = PROJECTS[nextIdx];
  renderModal();
}

function inquireProject(topic) {
  closeModal();
  state.submitted = false;
  state.form.subject = "Consulta sobre proyecto";
  state.form.message = `Hola, me interesó «${topic}» y me gustaría conversar sobre una propuesta similar.`;
  renderContactForm();
  setTimeout(() => {
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
    const nameInput = document.getElementById("contact-name");
    if (nameInput) nameInput.focus();
  }, 120);
}

function renderModal() {
  const p = state.activeProject;
  if (!p) return;
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <!-- Top bar -->
    <div class="d-flex align-items-center justify-content-between px-4 py-3 border-bottom" style="border-color:var(--pf-border)">
      <div class="d-flex align-items-center gap-2 pf-mono" style="font-size:0.75rem">
        <span style="color:var(--pf-accent);font-weight:600">CASO ${p.index}</span>
        <span class="pf-text-muted">·</span>
        <span class="pf-text-secondary">${p.category}</span>
        <span class="pf-text-muted">·</span>
        <span class="pf-text-muted">${p.year}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="pf-icon-btn" onclick="navigateProject('prev')" aria-label="Proyecto anterior" title="Anterior">${Icons.arrowLeft}</button>
        <button type="button" class="pf-icon-btn" onclick="navigateProject('next')" aria-label="Proyecto siguiente" title="Siguiente">${Icons.arrowRight}</button>
        <button type="button" class="pf-icon-btn ms-1" onclick="closeModal()" aria-label="Cerrar detalle">${Icons.x}</button>
      </div>
    </div>

    <!-- Cover image -->
    <div style="aspect-ratio:16/8.8;overflow:hidden;background:var(--pf-bg-alt)">
      <img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;display:block">
    </div>

    <!-- Content -->
    <div class="p-3 p-sm-4 p-md-5">
      <div class="mb-4">
        <h2 class="h3 fw-bold mb-1">${p.title}</h2>
        <p class="pf-text-secondary mb-3">${p.subtitle}</p>
        <div class="row g-3 py-3 border-top border-bottom" style="border-color:var(--pf-border)">
          <div class="col-6 col-md-3">
            <span class="pf-mono pf-text-muted d-block" style="font-size:0.7rem">ROL</span>
            <span class="fw-medium" style="font-size:0.84rem">${p.role}</span>
          </div>
          <div class="col-6 col-md-2">
            <span class="pf-mono pf-text-muted d-block" style="font-size:0.7rem">DURACIÓN</span>
            <span class="fw-medium" style="font-size:0.84rem">${p.duration}</span>
          </div>
          ${p.metrics.slice(0, 2).map((m) => `
            <div class="col-6 col-md-3">
              <span class="pf-mono pf-text-muted d-block" style="font-size:0.7rem">${m.label.toUpperCase()}</span>
              <span class="pf-mono fw-semibold" style="font-size:0.9rem;color:var(--pf-accent)">${m.value}</span>
            </div>`).join("")}
        </div>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-12 col-md-6">
          <h3 class="h6 fw-bold mb-2">El reto</h3>
          <p class="pf-text-secondary mb-0" style="font-size:0.9rem">${p.challenge}</p>
        </div>
        <div class="col-12 col-md-6">
          <h3 class="h6 fw-bold mb-2">La solución</h3>
          <p class="pf-text-secondary mb-0" style="font-size:0.9rem">${p.solution}</p>
        </div>
      </div>

      <div class="p-3 p-md-4 rounded-3 mb-4" style="background:var(--pf-bg-alt);border:1px solid var(--pf-border)">
        <h3 class="h6 fw-bold mb-2">Resultados y detalles clave</h3>
        <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
          ${p.highlights.map((h) => `
            <li class="d-flex align-items-start gap-2 pf-text-secondary" style="font-size:0.87rem">
              <span class="flex-shrink-0 mt-1" style="color:var(--pf-accent)">${Icons.check}</span>
              <span>${h}</span>
            </li>`).join("")}
        </ul>
      </div>

      <div class="d-flex flex-wrap gap-2 mb-4">
        ${p.stack.map((t) => `<span class="pf-tag">${t}</span>`).join("")}
      </div>

      <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-2 pf-modal-actions">
        <button type="button" class="pf-btn-primary" onclick="inquireProject('${p.title.replace(/'/g, "\\'")}')"">Consultar por un proyecto similar ${Icons.arrowUpRight}</button>
        <button type="button" class="pf-btn-secondary" onclick="inquireProject('Código / Demo de ${p.title.replace(/'/g, "\\'")}')">${Icons.code2} Solicitar acceso al repositorio</button>
      </div>
    </div>`;
}


// ============================================================
//  SKILLS
// ============================================================
function renderSkillTabs() {
  const container = document.getElementById("skill-tabs");
  container.innerHTML = SKILL_GROUPS.map((group, idx) => {
    const isActive = group.id === state.activeSkillGroupId;
    return `
      <button type="button" role="tab" aria-selected="${isActive}" class="pf-skill-tab ${isActive ? 'active' : ''}" data-skill-group="${group.id}">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <span class="fw-bold" style="font-size:0.95rem">${group.title}</span>
          <span class="pf-mono" style="font-size:0.73rem;color:${isActive ? 'var(--pf-accent)' : 'var(--pf-ink-muted)'}">0${idx + 1}</span>
        </div>
        <span class="d-block pf-text-muted pf-skill-caption" style="font-size:0.81rem;line-height:1.4">${group.caption}</span>
      </button>`;
  }).join("");

  container.querySelectorAll(".pf-skill-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeSkillGroupId = btn.dataset.skillGroup;
      renderSkillTabs();
      renderSkillPanel();
    });
  });
}

function renderSkillPanel() {
  const group = SKILL_GROUPS.find((g) => g.id === state.activeSkillGroupId) || SKILL_GROUPS[0];
  const panel = document.getElementById("skill-panel");
  panel.innerHTML = `
    <div class="d-flex flex-wrap align-items-baseline justify-content-between gap-2 pb-3 mb-4 border-bottom" style="border-color:var(--pf-border)">
      <h3 class="h5 fw-bold mb-0">${group.title}</h3>
      <span class="pf-mono pf-text-muted" style="font-size:0.75rem">${group.skills.length} competencias clave</span>
    </div>
    <div class="d-flex flex-column gap-4 mb-4">
      ${group.skills.map((skill) => `
        <div>
          <div class="d-flex flex-wrap align-items-baseline justify-content-between gap-2 mb-1">
            <span class="fw-semibold" style="font-size:0.93rem">${skill.name}</span>
            <div class="d-flex align-items-center gap-2 pf-mono" style="font-size:0.75rem">
              <span class="pf-text-muted d-none d-sm-inline">${skill.experience}</span>
              <span style="color:var(--pf-accent);font-weight:600">${skill.level}%</span>
            </div>
          </div>
          <div class="pf-skill-track my-2" role="progressbar" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100" aria-label="${skill.name}">
            <div class="pf-skill-fill" style="width:${skill.level}%"></div>
          </div>
          <p class="pf-text-secondary mb-0" style="font-size:0.84rem">${skill.detail}</p>
        </div>`).join("")}
    </div>
    <div class="pt-4 border-top" style="border-color:var(--pf-border)">
      <span class="pf-mono pf-text-muted d-block mb-3" style="font-size:0.72rem;letter-spacing:0.06em">ENTREGABLES HABITUALES</span>
      <div class="row g-2">
        ${group.deliverables.map((item) => `
          <div class="col-12 col-sm-6">
            <div class="d-flex align-items-center gap-2" style="font-size:0.85rem">
              <span class="flex-shrink-0" style="color:var(--pf-accent)">${Icons.check}</span>
              <span class="pf-text-secondary">${item}</span>
            </div>
          </div>`).join("")}
      </div>
    </div>`;
}


// ============================================================
//  TIMELINE / ACCORDION
// ============================================================
function renderTimeline(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map((item) => {
    const isOpen = state.openTimelineIds.includes(item.id);
    return `
      <div class="pf-timeline-item" data-timeline-id="${item.id}">
        <button type="button" class="pf-timeline-trigger" aria-expanded="${isOpen}" data-toggle-timeline="${item.id}">
          <div class="d-flex align-items-start justify-content-between gap-3">
            <div>
              <span class="pf-mono d-block mb-1" style="font-size:0.75rem;color:var(--pf-accent)">${item.period}</span>
              <h4 class="h6 fw-bold mb-1">${item.role}</h4>
              <span class="pf-text-muted" style="font-size:0.84rem">${item.organization} · ${item.location}</span>
            </div>
            <span class="pf-text-muted pf-chevron-icon ${isOpen ? 'open' : ''}" style="margin-top:4px">${Icons.chevronDown}</span>
          </div>
        </button>
        <div class="pf-timeline-content ${isOpen ? 'open' : ''}">
          <div class="pt-3">
            <p class="pf-text-secondary mb-2" style="font-size:0.88rem">${item.summary}</p>
            <ul class="list-unstyled mb-0 d-flex flex-column gap-1">
              ${item.achievements.map((ach) => `
                <li class="d-flex align-items-start gap-2 pf-text-secondary" style="font-size:0.83rem">
                  <span style="color:var(--pf-accent)">—</span>
                  <span>${ach}</span>
                </li>`).join("")}
            </ul>
          </div>
        </div>
      </div>`;
  }).join("");

  container.querySelectorAll("[data-toggle-timeline]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.toggleTimeline;
      if (state.openTimelineIds.includes(id)) {
        state.openTimelineIds = state.openTimelineIds.filter((i) => i !== id);
      } else {
        state.openTimelineIds.push(id);
      }
      renderTimeline(containerId, items);
    });
  });
}


// ============================================================
//  PORTRAIT 3D TILT & MOVIMIENTO AUTÓNOMO
// ============================================================
function initPortraitTilt() {
  const frame = document.querySelector(".pf-portrait-frame");
  if (!frame) return;

  frame.addEventListener("mouseenter", () => {
    state.isPortraitHovered = true;
    frame.classList.add("pf-manual-tilt");
  });

  frame.addEventListener("mousemove", (e) => {
    const rect = frame.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `perspective(800px) rotateX(${-y * 20}deg) rotateY(${x * 20}deg) translateY(-8px) scale(1.02)`;
  });

  frame.addEventListener("mouseleave", () => {
    state.isPortraitHovered = false;
    frame.style.transform = "";
    // Reanudar la animación de movimiento autónomo suavemente
    setTimeout(() => {
      if (!state.isPortraitHovered) {
        frame.classList.remove("pf-manual-tilt");
      }
    }, 150);
  });
}


// ============================================================
//  COPY EMAIL
// ============================================================
function handleCopyEmail() {
  navigator.clipboard.writeText(PROFILE.email).then(() => {
    state.emailCopied = true;
    document.querySelectorAll(".email-copy-label").forEach((el) => {
      el.innerHTML = `${Icons.check} <span>¡Correo copiado!</span>`;
    });
    setTimeout(() => {
      state.emailCopied = false;
      document.querySelectorAll(".email-copy-label").forEach((el) => {
        el.innerHTML = `${Icons.copy} <span>${PROFILE.email}</span>`;
      });
    }, 2200);
  }).catch(() => {
    window.location.href = `mailto:${PROFILE.email}`;
  });
}


// ============================================================
//  DOWNLOAD CV
// ============================================================
function downloadProfileCv() {
  const skillsSummary = SKILL_GROUPS.map(
    (g) => `${g.title.toUpperCase()}\n${g.skills.map((s) => `  • ${s.name} (${s.level}%)`).join("\n")}`
  ).join("\n\n");

  const expSummary = EXPERIENCE_TIMELINE.map(
    (e) => `${e.role} — ${e.organization} (${e.period})\n  ${e.summary}`
  ).join("\n\n");

  const projSummary = PROJECTS.map(
    (p) => `${p.index}. ${p.title} [${p.year}] — ${p.stack.join(", ")}\n  ${p.summary}`
  ).join("\n\n");

  const content = `${PROFILE.name.toUpperCase()}
${PROFILE.role}
${PROFILE.location} | ${PROFILE.email}
============================================================

PERFIL PROFESIONAL
${PROFILE.bio}

EXPERIENCIA
${expSummary}

PROYECTOS DESTACADOS
${projSummary}

HABILIDADES TÉCNICAS
${skillsSummary}
`;

  const slug = PROFILE.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cv-${slug}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// ============================================================
//  CONTACT FORM
// ============================================================
function validateForm() {
  const errors = {};
  if (state.form.name.trim().length < 2) errors.name = "Ingresa tu nombre (mínimo 2 caracteres).";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(state.form.email.trim())) errors.email = "Ingresa un correo electrónico válido.";
  if (state.form.message.trim().length < 12) errors.message = "Cuéntame un poco más (mínimo 12 caracteres).";
  return errors;
}

function renderContactForm() {
  const container = document.getElementById("contact-form-container");

  if (state.submitted) {
    container.innerHTML = `
      <div class="py-4 text-center">
        <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style="width:52px;height:52px;background:var(--pf-success-soft);color:var(--pf-success)">${Icons.checkCircle}</div>
        <h3 class="h4 fw-bold mb-2">¡Mensaje enviado, ${state.form.name.split(" ")[0]}!</h3>
        <p class="pf-text-secondary mb-4" style="font-size:0.92rem">Gracias por escribir sobre <strong>${state.form.subject.toLowerCase()}</strong>. Te responderé pronto a <span class="pf-mono">${state.form.email}</span>.</p>
        <button type="button" class="pf-btn-secondary" onclick="resetContactForm()">Enviar otro mensaje</button>
      </div>`;
    return;
  }

  const errors = validateForm();
  const nameErr = state.touched.name && errors.name ? `<small class="text-danger d-block mt-1" style="font-size:0.76rem">${errors.name}</small>` : "";
  const emailErr = state.touched.email && errors.email ? `<small class="text-danger d-block mt-1" style="font-size:0.76rem">${errors.email}</small>` : "";
  const msgErr = state.touched.message && errors.message ? `<small class="text-danger d-block mt-1" style="font-size:0.76rem">${errors.message}</small>` : "";

  const submitErrHtml = state.submitError ? `
    <div class="col-12">
      <div class="p-3 rounded-3" style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.2)">
        <p class="text-danger small mb-2">${state.submitError}</p>
        <a href="mailto:${PROFILE.email}?subject=${encodeURIComponent(`[${state.form.subject}] Mensaje de ${state.form.name}`)}&body=${encodeURIComponent(state.form.message)}" class="pf-btn-secondary py-1 px-3 d-inline-flex" style="font-size:0.82rem">Abrir correo hacia ${PROFILE.email}</a>
      </div>
    </div>` : "";

  container.innerHTML = `
    <form id="contact-form" novalidate>
      <div class="row g-3">
        <div class="col-12 col-sm-6">
          <label for="contact-name" class="pf-label">Nombre completo</label>
          <input id="contact-name" type="text" class="pf-input ${state.touched.name && errors.name ? 'is-error' : ''}" placeholder="Ana García" value="${escapeHtml(state.form.name)}">
          ${nameErr}
        </div>
        <div class="col-12 col-sm-6">
          <label for="contact-email" class="pf-label">Correo electrónico</label>
          <input id="contact-email" type="email" class="pf-input ${state.touched.email && errors.email ? 'is-error' : ''}" placeholder="ana@ejemplo.com" value="${escapeHtml(state.form.email)}">
          ${emailErr}
        </div>
        <div class="col-12">
          <label for="contact-subject" class="pf-label">Motivo de contacto</label>
          <select id="contact-subject" class="pf-input">
            <option value="Desarrollo de software / Web" ${state.form.subject === 'Desarrollo de software / Web' ? 'selected' : ''}>Desarrollo de software / Web</option>
            <option value="Desarrollo Backend / Laravel / Python" ${state.form.subject === 'Desarrollo Backend / Laravel / Python' ? 'selected' : ''}>Desarrollo Backend / Laravel / Python</option>
            <option value="Soporte técnico e infraestructura" ${state.form.subject === 'Soporte técnico e infraestructura' ? 'selected' : ''}>Soporte técnico e infraestructura</option>
            <option value="Automatización con n8n" ${state.form.subject === 'Automatización con n8n' ? 'selected' : ''}>Automatización con n8n</option>
            <option value="Oportunidad laboral" ${state.form.subject === 'Oportunidad laboral' ? 'selected' : ''}>Oportunidad laboral</option>
          </select>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-baseline">
            <label for="contact-message" class="pf-label">Mensaje</label>
            <span class="pf-mono pf-text-muted" style="font-size:0.71rem">${state.form.message.length} / 500</span>
          </div>
          <textarea id="contact-message" rows="4" maxlength="500" class="pf-input ${state.touched.message && errors.message ? 'is-error' : ''}" placeholder="Cuéntame sobre el proyecto, plazos estimados o cómo puedo ayudarte...">${escapeHtml(state.form.message)}</textarea>
          ${msgErr}
        </div>
        ${submitErrHtml}
        <div class="col-12 pt-2">
          <button type="submit" class="pf-btn-primary" ${state.isSubmitting ? 'disabled style="opacity:0.7"' : ''}>
            ${state.isSubmitting ? `${Icons.loader} <span>Enviando...</span>` : `${Icons.send} <span>Enviar mensaje</span>`}
          </button>
        </div>
      </div>
    </form>`;

  // Bind events
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const subjectSelect = document.getElementById("contact-subject");
  const messageTextarea = document.getElementById("contact-message");

  nameInput.addEventListener("input", (e) => { state.form.name = e.target.value; updateCharCount(); });
  nameInput.addEventListener("blur", () => { state.touched.name = true; renderContactForm(); });
  emailInput.addEventListener("input", (e) => { state.form.email = e.target.value; });
  emailInput.addEventListener("blur", () => { state.touched.email = true; renderContactForm(); });
  subjectSelect.addEventListener("change", (e) => { state.form.subject = e.target.value; });
  messageTextarea.addEventListener("input", (e) => { state.form.message = e.target.value; updateCharCount(); });
  messageTextarea.addEventListener("blur", () => { state.touched.message = true; renderContactForm(); });

  form.addEventListener("submit", handleFormSubmit);
}

function updateCharCount() {
  const counter = document.querySelector("#contact-form .pf-mono.pf-text-muted");
  if (counter) counter.textContent = `${state.form.message.length} / 500`;
}

function resetContactForm() {
  state.submitted = false;
  state.touched = {};
  state.submitError = null;
  state.form = { name: "", email: "", subject: "Desarrollo de software / Web", message: "" };
  renderContactForm();
}

async function handleFormSubmit(e) {
  e.preventDefault();
  state.touched = { name: true, email: true, message: true };
  const errors = validateForm();
  if (Object.keys(errors).length > 0) { renderContactForm(); return; }

  state.isSubmitting = true;
  state.submitError = null;
  renderContactForm();

  // Mailto fallback (no Web3Forms key in static site)
  const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`[${state.form.subject}] Mensaje de ${state.form.name}`)}&body=${encodeURIComponent(`Nombre: ${state.form.name}\nCorreo: ${state.form.email}\nMotivo: ${state.form.subject}\n\nMensaje:\n${state.form.message}`)}`;
  window.location.href = mailtoUrl;
  state.submitted = true;
  state.isSubmitting = false;
  renderContactForm();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


// ============================================================
//  KEYBOARD SHORTCUTS (Modal)
// ============================================================
document.addEventListener("keydown", (e) => {
  if (!state.activeProject) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") navigateProject("next");
  if (e.key === "ArrowLeft") navigateProject("prev");
});


// ============================================================
//  INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Set document title
  document.title = `${PROFILE.name} — ${PROFILE.role}`;

  // Theme
  initTheme();
  document.getElementById("btn-theme").addEventListener("click", toggleTheme);

  // Mobile menu
  document.getElementById("btn-mobile-menu").addEventListener("click", toggleMobileMenu);
  document.querySelectorAll("#mobile-menu .pf-nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Scroll-spy
  initScrollSpy();

  // Projects
  renderFilterPills();
  renderProjects();

  // Modal backdrop click
  document.getElementById("project-modal").addEventListener("click", (e) => {
    if (e.target.id === "project-modal") closeModal();
  });

  // Skills
  renderSkillTabs();
  renderSkillPanel();

  // Timeline
  renderTimeline("experience-timeline", EXPERIENCE_TIMELINE);
  renderTimeline("education-timeline", EDUCATION_TIMELINE);

  // Portrait 3D tilt
  initPortraitTilt();

  // Copy email buttons
  document.querySelectorAll("[data-copy-email]").forEach((btn) => {
    btn.addEventListener("click", handleCopyEmail);
  });

  // Download CV
  document.querySelectorAll("[data-download-cv]").forEach((btn) => {
    btn.addEventListener("click", downloadProfileCv);
  });

  // Contact form
  renderContactForm();
});
