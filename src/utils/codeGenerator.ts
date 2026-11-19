import {
  EXPERIENCE_TIMELINE,
  PROJECTS,
  ProfileState,
  SKILL_GROUPS,
} from "../data/portfolioData";

export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateStandalonePortfolioHtml(profile: ProfileState): string {
  const proyectosJson = JSON.stringify(
    PROJECTS.map((p) => ({
      id: p.id,
      titulo: p.title,
      categoria: p.category,
      anio: p.year,
      resumen: p.summary,
      reto: p.challenge,
      solucion: p.solution,
      stack: p.stack,
    })),
    null,
    4
  );

  const habilidadesHtml = SKILL_GROUPS[0].skills
    .map(
      (s) => `
          <div class="col-12 col-md-6">
            <div class="p-3 rounded-3 border bg-body">
              <div class="d-flex justify-content-between small fw-semibold mb-2">
                <span>${s.name}</span>
                <span class="text-secondary">${s.level}%</span>
              </div>
              <div class="progress" style="height: 6px;" role="progressbar" aria-valuenow="${s.level}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${s.level}%; background-color: var(--acento);"></div>
              </div>
              <p class="text-secondary small mb-0 mt-2">${s.detail}</p>
            </div>
          </div>`
    )
    .join("");

  return `<!doctype html>
<html lang="es" data-bs-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${profile.name} — ${profile.role}</title>
  <!-- Bootstrap 5.3 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <style>
    :root { --acento: #c4492d; }
    html { scroll-behavior: smooth; scroll-padding-top: 76px; }
    body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
    .btn-acento { background: var(--acento); color: #fff; border-color: var(--acento); }
    .btn-acento:hover { background: #a83b22; color: #fff; }
    .card-proyecto { transition: transform .2s ease, box-shadow .2s ease; cursor: pointer; }
    .card-proyecto:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,.08); }
    .filtro-btn.active { background: var(--bs-emphasis-color); color: var(--bs-body-bg); }
  </style>
</head>
<body>
  <!-- 1. Navbar responsivo con Bootstrap 5 -->
  <nav class="navbar navbar-expand-lg sticky-top bg-body border-bottom py-3">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">${profile.name}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="menuPrincipal">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li class="nav-item"><a class="nav-link" href="#proyectos">Proyectos</a></li>
          <li class="nav-item"><a class="nav-link" href="#habilidades">Habilidades</a></li>
          <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
          <li class="nav-item ms-lg-2">
            <button id="btnTema" class="btn btn-sm btn-outline-secondary rounded-pill px-3" type="button">
              Modo oscuro
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 2. Hero de presentación personal -->
  <header class="py-5 border-bottom">
    <div class="container py-lg-4">
      <div class="col-lg-8">
        <span class="badge rounded-pill text-bg-light border mb-3">${profile.availability}</span>
        <h1 class="display-5 fw-bold mb-3">
          ${profile.headlinePrefix} <em style="color: var(--acento);">${profile.headlineAccent}</em> ${profile.headlineSuffix}
        </h1>
        <p class="lead text-secondary mb-4">${profile.bio}</p>
        <div class="d-flex flex-wrap gap-2">
          <a href="#proyectos" class="btn btn-acento rounded-pill px-4 py-2">Ver proyectos</a>
          <a href="#contacto" class="btn btn-outline-secondary rounded-pill px-4 py-2">Contactar</a>
        </div>
      </div>
    </div>
  </header>

  <!-- 3. Galería de Proyectos filtrable con JavaScript -->
  <section id="proyectos" class="py-5 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <p class="text-uppercase small fw-semibold mb-1" style="color: var(--acento);">Portafolio</p>
          <h2 class="h3 fw-bold mb-0">Proyectos seleccionados</h2>
        </div>
        <div id="barraFiltros" class="d-flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos">
          <button class="btn btn-sm btn-outline-secondary rounded-pill filtro-btn active" data-cat="Todos">Todos</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill filtro-btn" data-cat="Datos Interactivos">Datos Interactivos</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill filtro-btn" data-cat="E-Commerce">E-Commerce</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill filtro-btn" data-cat="Aplicación Web">Aplicación Web</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill filtro-btn" data-cat="Diseño UI">Diseño UI</button>
        </div>
      </div>
      <div id="gridProyectos" class="row g-4"></div>
    </div>
  </section>

  <!-- 4. Habilidades técnicas con barras Bootstrap -->
  <section id="habilidades" class="py-5 bg-body-tertiary border-bottom">
    <div class="container">
      <p class="text-uppercase small fw-semibold mb-1" style="color: var(--acento);">Competencias</p>
      <h2 class="h3 fw-bold mb-4">Habilidades y herramientas</h2>
      <div class="row g-3">${habilidadesHtml}
      </div>
    </div>
  </section>

  <!-- 5. Formulario de Contacto con validación JavaScript -->
  <section id="contacto" class="py-5">
    <div class="container">
      <div class="row g-4 justify-content-between">
        <div class="col-lg-5">
          <p class="text-uppercase small fw-semibold mb-1" style="color: var(--acento);">Contacto</p>
          <h2 class="h3 fw-bold mb-3">¿Conversamos sobre tu próximo proyecto?</h2>
          <p class="text-secondary">Ubicación: ${profile.location}<br />Correo: <strong>${profile.email}</strong></p>
        </div>
        <div class="col-lg-6">
          <form id="formContacto" class="p-4 border rounded-4 bg-body" novalidate>
            <div class="mb-3">
              <label for="nombre" class="form-label small fw-semibold">Nombre</label>
              <input id="nombre" type="text" class="form-control" required minlength="2" placeholder="Tu nombre" />
              <div class="invalid-feedback">Por favor, ingresa tu nombre.</div>
            </div>
            <div class="mb-3">
              <label for="correo" class="form-label small fw-semibold">Correo electrónico</label>
              <input id="correo" type="email" class="form-control" required placeholder="tu@correo.com" />
              <div class="invalid-feedback">Ingresa un correo electrónico válido.</div>
            </div>
            <div class="mb-3">
              <label for="mensaje" class="form-label small fw-semibold">Mensaje</label>
              <textarea id="mensaje" class="form-control" rows="3" required minlength="10" placeholder="Cuéntame sobre tu idea..."></textarea>
              <div class="invalid-feedback">Escribe un mensaje de al menos 10 caracteres.</div>
            </div>
            <button type="submit" class="btn btn-acento rounded-pill px-4">Enviar mensaje</button>
            <div id="alertaExito" class="alert alert-success mt-3 mb-0 py-2 small d-none">
              ¡Gracias! Tu mensaje fue validado y enviado correctamente.
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal Bootstrap para ver caso de estudio -->
  <div class="modal fade" id="modalProyecto" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modalTitulo" class="modal-title h5 fw-bold"></h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div id="modalCuerpo" class="modal-body"></div>
      </div>
    </div>
  </div>

  <!-- Bootstrap 5 JS Bundle + Interactividad en JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    const proyectos = ${proyectosJson};
    const grid = document.getElementById("gridProyectos");
    const modal = new bootstrap.Modal(document.getElementById("modalProyecto"));

    function renderProyectos(categoria = "Todos") {
      const lista = categoria === "Todos" ? proyectos : proyectos.filter(p => p.categoria === categoria);
      grid.innerHTML = lista.map(p => \`
        <div class="col-12 col-md-6">
          <article class="card h-100 card-proyecto p-4" onclick="abrirDetalle('\${p.id}')">
            <div class="d-flex justify-content-between small text-secondary mb-2">
              <span>\${p.categoria}</span><span>\${p.anio}</span>
            </div>
            <h3 class="h5 fw-bold">\${p.titulo}</h3>
            <p class="text-secondary small flex-grow-1">\${p.resumen}</p>
            <div class="d-flex flex-wrap gap-1 mt-2">
              \${p.stack.map(t => \`<span class="badge text-bg-light border">\${t}</span>\`).join("")}
            </div>
          </article>
        </div>\`).join("");
    }

    window.abrirDetalle = function(id) {
      const p = proyectos.find(item => item.id === id);
      if (!p) return;
      document.getElementById("modalTitulo").textContent = p.titulo;
      document.getElementById("modalCuerpo").innerHTML = \`
        <p class="small"><strong>El reto:</strong> \${p.reto}</p>
        <p class="small mb-0"><strong>La solución:</strong> \${p.solucion}</p>\`;
      modal.show();
    };

    document.querySelectorAll(".filtro-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProyectos(btn.dataset.cat);
      });
    });

    // Alternar modo claro / oscuro con data-bs-theme de Bootstrap 5.3
    const btnTema = document.getElementById("btnTema");
    btnTema.addEventListener("click", () => {
      const html = document.documentElement;
      const oscuro = html.getAttribute("data-bs-theme") === "dark";
      html.setAttribute("data-bs-theme", oscuro ? "light" : "dark");
      btnTema.textContent = oscuro ? "Modo oscuro" : "Modo claro";
    });

    // Validación interactiva del formulario
    const form = document.getElementById("formContacto");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      document.getElementById("alertaExito").classList.remove("d-none");
      form.reset();
      form.classList.remove("was-validated");
    });

    renderProyectos();
  </script>
</body>
</html>`;
}

export function downloadProfileCv(profile: ProfileState) {
  const skillsSummary = SKILL_GROUPS.map(
    (g) => `${g.title.toUpperCase()}\n${g.skills.map((s) => `  • ${s.name} (${s.level}%)`).join("\n")}`
  ).join("\n\n");

  const expSummary = EXPERIENCE_TIMELINE.map(
    (e) => `${e.role} — ${e.organization} (${e.period})\n  ${e.summary}`
  ).join("\n\n");

  const projSummary = PROJECTS.map(
    (p) => `${p.index}. ${p.title} [${p.year}] — ${p.stack.join(", ")}\n  ${p.summary}`
  ).join("\n\n");

  const content = `${profile.name.toUpperCase()}
${profile.role}
${profile.location} | ${profile.email}
============================================================

PERFIL PROFESIONAL
${profile.bio}

EXPERIENCIA
${expSummary}

PROYECTOS DESTACADOS
${projSummary}

HABILIDADES TÉCNICAS
${skillsSummary}
`;

  const slug = profile.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

  downloadFile(`cv-${slug}.txt`, content, "text/plain;charset=utf-8;");
}
