export type ProjectCategory =
  | "Todos"
  | "Aplicación Web"
  | "Backend & APIs"
  | "Soporte & Infraestructura"
  | "Datos Interactivos";

export interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, "Todos">;
  year: string;
  role: string;
  duration: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  liveUrl: string;
  repoUrl: string;
}

export interface SkillItem {
  name: string;
  level: number;
  experience: string;
  detail: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  caption: string;
  skills: SkillItem[];
  deliverables: string[];
}

export interface TimelineEntry {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  achievements: string[];
}

export interface ProfileState {
  name: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  availability: string;
  headlinePrefix: string;
  headlineAccent: string;
  headlineSuffix: string;
  bio: string;
}

export const DEFAULT_PROFILE: ProfileState = {
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

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Todos",
  "Aplicación Web",
  "Backend & APIs",
  "Soporte & Infraestructura",
  "Datos Interactivos",
];

export const PROJECTS: PortfolioProject[] = [
  {
    id: "senamecf-inventario",
    index: "01",
    title: "Sistema de Inventario — SENAMECF",
    subtitle: "Plataforma web para el control de inventario de Bienes Nacionales",
    category: "Backend & APIs",
    year: "2024 — 2026",
    role: "Desarrollador Fullstack & Laravel",
    duration: "En producción continua",
    image: "/images/inventario.jpg",
    summary:
      "Diseño e implementación de un sistema integral de inventario y trazabilidad para el departamento de Bienes Nacionales del SENAMECF, optimizando el ciclo de vida y custodia de los activos institucionales.",
    challenge:
      "Reemplazar los registros manuales y hojas dispersas con un sistema centralizado, auditado y seguro, que garantice coherencia en el inventario y tiempos de consulta inmediatos.",
    solution:
      "Desarrollé una solución en Laravel con modelo relacional seguro en MySQL, control de accesos por roles (RBAC), generación automatizada de actas de inventario y reportes exportables.",
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
    id: "gestion-educativa",
    index: "02",
    title: "Sistema Modular de Gestión Educativa & Ambiental",
    subtitle: "Plataforma administrativa con control operativo y seguimiento ambiental",
    category: "Aplicación Web",
    year: "2025",
    role: "Analista & Desarrollador de Software",
    duration: "5 meses",
    image: "/images/plaga.jpg",
    summary:
      "Sistema modular orientado a la gestión académica, administrativa y de bienestar escolar, incorporando un módulo especializado para el control, reporte y seguimiento ambiental y de plagas.",
    challenge:
      "Las instituciones educativas requerían no solo gestionar expedientes y asistencia, sino también prevenir riesgos sanitarios y operativos de forma coordinada con la dirección y el personal de apoyo.",
    solution:
      "Diseñé una arquitectura modular con interfaces accesibles, sistema de alertas tempranas para mantenimiento e incidencias ambientales, y tableros de control para la toma de decisiones directivas.",
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
    id: "inatur-soporte",
    index: "03",
    title: "Dashboard de Métricas & Control de Inventario — INATUR",
    subtitle: "Panel interactivo de KPIs de soporte, trazabilidad de activos y análisis de incidentes",
    category: "Datos Interactivos",
    year: "2022",
    role: "Especialista en Soporte & Análisis de Datos",
    duration: "6 meses",
    image: "/images/dashboard-inatur.jpg",
    summary:
      "Diseño e implementación de un tablero interactivo de control para el departamento de Informática, con visualización estadística de incidentes, trazabilidad del parque tecnológico y métricas de resolución técnica.",
    challenge:
      "Ausencia de un registro histórico y visual centralizado de averías, piezas y soluciones técnicas aplicadas, lo que provocaba demoras en la resolución de incidentes repetitivos.",
    solution:
      "Estructuré un catálogo exhaustivo con modelado de datos en Power BI, indicadores de rendimiento (KPIs), planos de red en Visio y base documental para agilizar el soporte.",
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
    id: "sundde-infraestructura",
    index: "04",
    title: "Despliegue y Mantenimiento Operativo — SUNDDE",
    subtitle: "Mantenimiento integral a estaciones de trabajo y mejora en calidad de servicio",
    category: "Soporte & Infraestructura",
    year: "2023",
    role: "Soporte Técnico Especializado",
    duration: "1 año",
    image: "/images/sundde.jpg",
    summary:
      "Instalación, configuración y mantenimiento de sistemas operativos Windows y Linux en estaciones críticas, implementando estrategias de limpieza lógica/física y atención a usuarios.",
    challenge:
      "Garantizar la alta disponibilidad de estaciones de trabajo bajo constante carga operativa y asegurar la conectividad y seguridad de los puestos de atención.",
    solution:
      "Ejecuté planes de mantenimiento preventivo y correctivo, estandarización de imágenes de sistema operativo y rutinas de optimización para extender la vida útil del equipamiento.",
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

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "desarrollo",
    title: "Desarrollo de Software & Fullstack",
    caption: "Tecnologías frontend y backend para aplicaciones robustas",
    skills: [
      {
        name: "PHP & Laravel (MVC, Eloquent, APIs, Blade)",
        level: 92,
        experience: "2+ años · Sistemas en producción",
        detail: "Desarrollo de sistemas de inventario, modelos relacionales, autenticación y lógica de negocio segura.",
      },
      {
        name: "JavaScript (ES6+, DOM, Asincronía, Fetch)",
        level: 90,
        experience: "Habilidad sólida · Frontend interactivo",
        detail: "Interfaces dinámicas, manipulación del DOM, consumo de servicios y validaciones cliente.",
      },
      {
        name: "Python (Django, Flask & Scripts de Automatización)",
        level: 86,
        experience: "Desarrollo backend y utilidades",
        detail: "Creación de APIs REST, servicios modulares, análisis de datos y scripts de automatización.",
      },
      {
        name: "Frontend Moderno (React, Angular, Bootstrap, Tailwind)",
        level: 88,
        experience: "Maquetación y componentes",
        detail: "Diseño responsivo mobile-first, Tailwind CSS, Bootstrap 5 y arquitectura de componentes.",
      },
    ],
    deliverables: [
      "Sistemas web y plataformas administrativas a medida",
      "APIs RESTful seguras y documentadas",
      "Módulos de inventario y trazabilidad",
      "Interfaces de usuario responsivas y accesibles",
    ],
  },
  {
    id: "soporte",
    title: "Soporte Técnico & Sistemas Operativos",
    caption: "Mantenimiento, diagnóstico y administración de infraestructura",
    skills: [
      {
        name: "Administración de Sistemas Operativos (Windows & Linux)",
        level: 94,
        experience: "Instalación, hardening y soporte",
        detail: "Instalación, configuración y mantenimiento de distribuciones Linux (Ubuntu/Debian) y entornos Windows.",
      },
      {
        name: "Soporte de Hardware & Mantenimiento Técnico",
        level: 95,
        experience: "Preventivo y correctivo",
        detail: "Diagnóstico de componentes, ensamblaje, sustitución de hardware, optimización térmica y limpieza.",
      },
      {
        name: "Redes, Seguridad y Servidores Linux",
        level: 88,
        experience: "Infraestructura y ciberseguridad",
        detail: "Diseño básico de infraestructura de red, seguridad de servidores Linux, prevención de ransomware y permisos.",
      },
      {
        name: "Contenedores Docker & Virtualización",
        level: 82,
        experience: "Aislamiento de entornos",
        detail: "Despliegue de aplicaciones en contenedores, gestión de imágenes y máquinas virtuales.",
      },
    ],
    deliverables: [
      "Planes de mantenimiento preventivo y correctivo",
      "Diagnóstico y reparación de estaciones de trabajo",
      "Configuración y seguridad de servidores",
      "Estandarización de imágenes de sistema",
    ],
  },
  {
    id: "herramientas",
    title: "Automatización, Datos & Metodologías",
    caption: "Productividad, flujos de trabajo e inteligencia de negocio",
    skills: [
      {
        name: "Automatización de Flujos de Trabajo (n8n)",
        level: 88,
        experience: "Integración de procesos",
        detail: "Automatización de tareas repetitivas, conexión entre APIs y orquestación de flujos de datos.",
      },
      {
        name: "Power BI & Paquetes de Ofimática Avanzada",
        level: 89,
        experience: "Análisis y reportes",
        detail: "Creación de tableros de control visuales, KPIs, modelado de métricas e informes ejecutivos.",
      },
      {
        name: "Metodologías Ágiles Scrum (Jira, Trello, Miro)",
        level: 90,
        experience: "Gestión de proyectos",
        detail: "Planificación por sprints, roadmaps de producto y documentación viva bajo estándares ISO/IEC/IEEE.",
      },
      {
        name: "Visio & Documentación Técnica Estructurada",
        level: 87,
        experience: "Planos y especificaciones",
        detail: "Estructuración de planos de red, diagramas de flujo de procesos y manuales técnicos.",
      },
    ],
    deliverables: [
      "Flujos automatizados con n8n",
      "Dashboards ejecutivos en Power BI",
      "Documentación bajo ISO/IEC/IEEE 26514 y 12207",
      "Planos de infraestructura en Microsoft Visio",
    ],
  },
];

export const EXPERIENCE_TIMELINE: TimelineEntry[] = [
  {
    id: "exp-1",
    period: "2024 — 2026",
    role: "Desarrollador de Software (Laravel)",
    organization: "SENAMECF",
    location: "Caracas, Venezuela",
    summary:
      "Desarrollo e implementación del sistema central de inventario para el departamento de Bienes Nacionales, desarrollado en el framework Laravel.",
    achievements: [
      "Implementación del módulo de registro, catalogación, traslados y auditoría de activos nacionales.",
      "Optimización de consultas en base de datos para generación inmediata de reportes de bienes.",
    ],
  },
  {
    id: "exp-2",
    period: "2025",
    role: "Desarrollador de Software",
    organization: "Unidad Educativa",
    location: "Caracas, Venezuela",
    summary:
      "Análisis y desarrollo de un sistema modular enfocado en la gestión educativa institucional con módulo especializado de reporte y seguimiento ambiental/plagas.",
    achievements: [
      "Diseño e implementación del módulo de control y seguimiento ambiental para el bienestar escolar.",
      "Estructuración de arquitectura modular escalable para incorporar nuevos servicios académicos.",
    ],
  },
  {
    id: "exp-3",
    period: "2023",
    role: "Soporte Técnico & Mantenimiento de Sistemas",
    organization: "SUNDDE",
    location: "Caracas, Venezuela",
    summary:
      "Soporte técnico a usuarios para solución de problemáticas de hardware y software, asegurando la continuidad de las operaciones institucionales.",
    achievements: [
      "Instalación y configuración de sistemas operativos Windows y Linux en estaciones críticas.",
      "Implementación de estrategias preventivas de limpieza y mejora en la calidad del servicio técnico.",
    ],
  },
  {
    id: "exp-4",
    period: "2022",
    role: "Soporte Técnico & Gestión de Inventario",
    organization: "INATUR",
    location: "Caracas, Venezuela",
    summary:
      "Soporte técnico integral a usuarios internos y externos, instalación y mantenimiento de equipos informáticos.",
    achievements: [
      "Diseño e implementación de un inventario óptimo en el departamento de Informática.",
      "Documentación estructurada de casos y seguimiento de incidentes para conservación de soluciones.",
    ],
  },
];

export const EDUCATION_TIMELINE: TimelineEntry[] = [
  {
    id: "edu-1",
    period: "2021 — 2024",
    role: "Técnico Superior Universitario en Informática",
    organization: "Universidad Nacional Experimental de las Telecomunicaciones e Informática (UNETI)",
    location: "Caracas, Venezuela",
    summary:
      "Formación universitaria superior en desarrollo de software, arquitectura de sistemas, bases de datos, redes de telecomunicaciones y soporte de tecnología de información.",
    achievements: [
      "Especialización práctica en lenguajes de programación (JavaScript, Python, PHP) y metodologías ágiles Scrum.",
    ],
  },
  {
    id: "edu-2",
    period: "Certificaciones Técnicas",
    role: "Ciberseguridad, Servidores Linux y Desarrollo Web",
    organization: "Fundación Telefónica & Academias Especializadas",
    location: "Credenciales de Formación Continua",
    summary:
      "Certificaciones en Técnico en Mantenimiento de Computadoras, Seguridad de Servidores Linux, Desarrollo con Laravel, Ciberseguridad («The end of Ransomware»), Taller Fundación Telefónica y Atención al Cliente.",
    achievements: [
      "Documentación de software bajo estándares internacionales ISO/IEC/IEEE 26514 e ISO/IEC 12207.",
      "Manejo de herramientas ágiles Scrum: Jira, Trello, Miro y Roadmap.",
    ],
  },
  {
    id: "edu-3",
    period: "Educación Secundaria",
    role: "Bachiller en Ciencias",
    organization: "Unidad Educativa «Nicanor Bolet Peraza»",
    location: "Caracas, Venezuela",
    summary:
      "Educación secundaria concluida con formación básica en ciencias exactas y computación.",
    achievements: [
      "Educación primaria cursada en Unidad Educativa «Ciudad de Barcelona».",
    ],
  },
];
