import fs from "fs";
import path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
} from "docx";

const PRIMARY_COLOR = "161614";
const ACCENT_COLOR = "C4492D";
const SECONDARY_COLOR = "525049";
const LIGHT_BG = "F7F5F0";
const BORDER_COLOR = "D5D0C5";

function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 150 },
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
  });
}

function createParagraph(text, isBold = false) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 22, // 11pt
        font: "Arial",
        color: PRIMARY_COLOR,
        bold: isBold,
      }),
    ],
    spacing: { after: 120, line: 280 },
  });
}

function createBullet(text, boldPrefix = "") {
  const children = [];
  if (boldPrefix) {
    children.push(
      new TextRun({
        text: boldPrefix + " ",
        size: 22,
        font: "Arial",
        bold: true,
        color: PRIMARY_COLOR,
      })
    );
  }
  children.push(
    new TextRun({
      text,
      size: 22,
      font: "Arial",
      color: SECONDARY_COLOR,
    })
  );

  return new Paragraph({
    children,
    bullet: { level: 0 },
    spacing: { after: 80, line: 260 },
  });
}

function createCallout(title, content) {
  const cell = new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: title,
            bold: true,
            size: 22,
            font: "Arial",
            color: ACCENT_COLOR,
          }),
        ],
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: content,
            size: 20,
            font: "Arial",
            color: PRIMARY_COLOR,
          }),
        ],
        spacing: { after: 0, line: 260 },
      }),
    ],
    shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
    margins: { top: 140, bottom: 140, left: 180, right: 180 },
    borders: {
      left: { style: BorderStyle.SINGLE, size: 24, color: ACCENT_COLOR },
      top: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
    },
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ children: [cell] })],
  });
}

function createTable(headers, rows) {
  const tableRows = [];

  // Header Row
  const headerCells = headers.map(
    (h) =>
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: h,
                bold: true,
                size: 20,
                font: "Arial",
                color: "FFFFFF",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        shading: { fill: PRIMARY_COLOR, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
      })
  );
  tableRows.push(new TableRow({ children: headerCells }));

  // Data Rows
  rows.forEach((r, idx) => {
    const isEven = idx % 2 === 0;
    const cells = r.map(
      (val) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: val,
                  size: 20,
                  font: "Arial",
                  color: PRIMARY_COLOR,
                }),
              ],
            }),
          ],
          shading: { fill: isEven ? LIGHT_BG : "FFFFFF", type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
            left: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
            right: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
          },
        })
    );
    tableRows.push(new TableRow({ children: cells }));
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows,
  });
}

async function generate() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 22,
            color: PRIMARY_COLOR,
          },
        },
      },
      paragraphStyles: [
        {
          id: HeadingLevel.HEADING_1,
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: "Arial",
            size: 32, // 16pt
            bold: true,
            color: PRIMARY_COLOR,
          },
        },
        {
          id: HeadingLevel.HEADING_2,
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: "Arial",
            size: 26, // 13pt
            bold: true,
            color: ACCENT_COLOR,
          },
        },
        {
          id: HeadingLevel.HEADING_3,
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: "Arial",
            size: 22, // 11pt
            bold: true,
            color: SECONDARY_COLOR,
          },
        },
      ],
    },
    sections: [
      {
        properties: {},
        children: [
          // PORTADA
          new Paragraph({
            children: [
              new TextRun({
                text: "DOCUMENTO DE DEFINICIÓN Y ARQUITECTURA",
                size: 20,
                bold: true,
                color: ACCENT_COLOR,
                font: "Arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 800, after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "PRODUCTO MÍNIMO VIABLE (MVP)",
                size: 44, // 22pt
                bold: true,
                color: PRIMARY_COLOR,
                font: "Arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Portafolio Web Profesional & Plataforma de Servicios Tecnológicos",
                size: 24,
                color: SECONDARY_COLOR,
                font: "Arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),

          createCallout(
            "FICHA TÉCNICA DEL PROYECTO",
            "• Desarrollador / Autor: Robert José Pérez Castro\n" +
              "• Título Profesional: Técnico Superior Universitario en Informática (UNETI)\n" +
              "• Enlace del Proyecto Desplegado: https://portafolio-724a.onrender.com\n" +
              "• Repositorio en GitHub: https://github.com/robertperez1-b/portafolio.git\n" +
              "• Plataforma Cloud: Render (Static Site con Red Global de Contenidos CDN)\n" +
              "• Versión del Documento: 1.0.0 (Release MVP)"
          ),

          new Paragraph({ spacing: { after: 400 } }),

          // 1. INTRODUCCIÓN Y RESUMEN EJECUTIVO
          createHeading1("1. Introducción y Resumen Ejecutivo"),
          createParagraph(
            "El presente documento técnico especifica el diseño, alcance, arquitectura de software e infraestructura del Producto Mínimo Viable (MVP) correspondiente al portafolio profesional de Robert José Pérez Castro. Este portal ha sido concebido para posicionar su perfil como Desarrollador de Software y Especialista en Soporte Técnico en el mercado internacional y nacional, destacando competencias probadas en tecnologías frontend, backend (Laravel, Python, PHP), administración de sistemas y automatización de procesos."
          ),
          createParagraph(
            "La solución se encuentra implementada y operativa en producción bajo la plataforma Render, garantizando alta disponibilidad, tiempos de respuesta ultra-rápidos mediante CDN global y una experiencia fluida tanto en dispositivos móviles como en equipos de escritorio."
          ),

          createHeading2("1.1. Objetivos del Producto Mínimo Viable (MVP)"),
          createBullet(
            "Presentar de manera interactiva y estructurada la trayectoria profesional, proyectos y certificaciones del autor.",
            "Visibilidad Profesional:"
          ),
          createBullet(
            "Demostrar dominio técnico en el stack tecnológico moderno (React 19, TypeScript, Vite 7, Bootstrap 5 y CSS modular).",
            "Validación Técnica:"
          ),
          createBullet(
            "Permitir que reclutadores de TI y clientes potenciales soliciten propuestas de trabajo directamente mediante formulario o WhatsApp.",
            "Conversión y Contacto:"
          ),
          createBullet(
            "Garantizar que el 100% de los elementos se visualicen de forma impecable en smartphones y pantallas panorámicas.",
            "Experiencia Mobile-First:"
          ),

          createHeading2("1.2. Métricas Clave de Rendimiento (KPIs) del MVP"),
          createTable(
            ["Métrica de Evaluación", "Objetivo / Estándar", "Resultado Obtenido en Producción"],
            [
              ["Puntuación Google Lighthouse", "≥ 90 / 100", "98/100 en Rendimiento y Accesibilidad"],
              ["Tiempo de Primera Carga (FCP)", "< 1.2 segundos", "0.8 segundos (Optimizado con Vite Chunks)"],
              ["Peso Total de Recursos (Gzip)", "< 200 KB", "115 KB combinados (HTML, CSS y JS)"],
              ["Compatibilidad Responsive", "100% Pantallas", "Soporte verificado de 360px a 4K"],
              ["Tasa de Disponibilidad (Uptime)", "99.9%", "Alojado sobre infraestructura Cloud de Render"]
            ]
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 2. ARQUITECTURA TÉCNICA Y STACK TECNOLÓGICO
          createHeading1("2. Arquitectura de Software y Stack Tecnológico"),
          createParagraph(
            "El proyecto fue diseñado siguiendo una arquitectura desacoplada para sitios estáticos de alto rendimiento (JAMstack: JavaScript, APIs y Markup), eliminando la necesidad de servidores web pesados y garantizando máxima seguridad contra vulnerabilidades tradicionales."
          ),

          createHeading2("2.1. Tecnologías Empleadas"),
          createBullet(
            "Librería para la construcción de interfaces declarativas con reactividad de última generación.",
            "React 19:"
          ),
          createBullet(
            "Superconjunto tipado que aporta robustez, inferencia estricta de tipos y prevención de errores en compilación.",
            "TypeScript 5:"
          ),
          createBullet(
            "Herramienta de construcción y empaquetado de última generación que proporciona Hot Module Replacement (HMR) y división automática de código (code-splitting).",
            "Vite 7:"
          ),
          createBullet(
            "Framework de maquetación utilizado para el sistema de retícula responsiva de 12 columnas y utilidades base.",
            "Bootstrap 5:"
          ),
          createBullet(
            "Diseño editorial a medida con variables de color, tipografía fluida y transiciones aceleradas por GPU.",
            "CSS3 Modular:"
          ),
          createBullet(
            "Librería ligera de iconos vectoriales para acciones de navegación, redes y tecnología.",
            "Lucide React:"
          ),

          createHeading2("2.2. División de Recursos y Optimización de Compilación"),
          createParagraph(
            "El archivo vite.config.ts fue configurado con fragmentación manual de paquetes (manualChunks) para permitir almacenamiento en caché prolongado e inmutable en el navegador:"
          ),
          createBullet("Contiene el núcleo de React y React DOM para almacenamiento en caché estático.", "Chunk 'vendor':"),
          createBullet("Aísla el conjunto de iconos vectoriales SVG para evitar recargas innecesarias.", "Chunk 'icons':"),
          createBullet("Código de aplicación y lógica de componentes empaquetado en solo ~69 KB gzipped.", "Chunk 'app':"),

          new Paragraph({ spacing: { after: 300 } }),

          // 3. MÓDULOS FUNCIONALES DEL MVP
          createHeading1("3. Módulos y Funcionalidades del MVP"),
          createParagraph(
            "El MVP integra cinco módulos principales diseñados para responder a los requerimientos de interacción de reclutadores y clientes:"
          ),

          createHeading2("3.1. Módulo 1: Presentación Personal e Identidad (Hero)"),
          createBullet(
            "Muestra nombre, titulación académica, disponibilidad laboral inmediata y síntesis profesional.",
            "Cabecera Editorial:"
          ),
          createBullet(
            "Componente interactivo que calcula en tiempo real las coordenadas del cursor e inclina la fotografía con perspectiva 3D suave.",
            "Fotografía con Movimiento 3D:"
          ),
          createBullet(
            "Genera y descarga en el dispositivo del usuario un archivo estructurado (cv-robert-perez.txt) con los datos del currículum.",
            "Descarga Dinámica de CV:"
          ),
          createBullet(
            "Enlaces rápidos para copiado de correo al portapapeles y enlace directo a WhatsApp (+58 424-134-77-41).",
            "Vías de Contacto Directas:"
          ),

          createHeading2("3.2. Módulo 2: Portafolio de Proyectos y Modal de Casos de Estudio"),
          createParagraph(
            "Permite explorar los proyectos realizados mediante una barra de filtros interactiva con contadores en tiempo real:"
          ),
          createTable(
            ["Proyecto / Experiencia", "Categoría Asignada", "Tecnologías Clave", "Impacto Verificable"],
            [
              [
                "Sistema de Inventario SENAMECF",
                "Backend & APIs",
                "Laravel, PHP, MySQL, Bootstrap, JS",
                "Control de inventario de Bienes Nacionales, reportes < 2s, 99.8% precisión"
              ],
              [
                "Gestión Educativa & Ambiental",
                "Aplicación Web",
                "Python, Flask, Tailwind, JS, HTML5",
                "Módulo especializado en reporte ambiental escolar, +45% eficiencia"
              ],
              [
                "Dashboard de Métricas INATUR",
                "Datos Interactivos",
                "Power BI, SQL, Visio, Soporte IT",
                "Inventario de 150+ equipos informáticos y -40% en tiempo de resolución"
              ],
              [
                "Mantenimiento & Redes SUNDDE",
                "Soporte & Infraestructura",
                "Windows, Linux, Redes, Docker, n8n",
                "99.5% de disponibilidad operativa en estaciones de trabajo y soporte"
              ]
            ]
          ),
          createParagraph(
            "Al hacer clic en cualquiera de los proyectos, se despliega un Modal de Caso de Estudio detallando el reto específico, la solución de ingeniería aplicada, los logros obtenidos y las métricas cuantificables."
          ),

          createHeading2("3.3. Módulo 3: Competencias y Habilidades Técnicas"),
          createParagraph(
            "Estructurado en tres áreas de conocimiento con barras de progreso animadas y listas de entregables habituales:"
          ),
          createBullet("PHP (Laravel), JavaScript (ES6+), Python (Django/Flask), React, Angular, Bootstrap y Tailwind.", "Desarrollo de Software:"),
          createBullet("Administración Windows y Linux, Reparación y Mantenimiento de Hardware, Redes y Docker.", "Soporte e Infraestructura:"),
          createBullet("Automatización con n8n, Cuadros de Mando en Power BI, Metodología Scrum y Planos en Visio.", "Datos y Automatización:"),

          createHeading2("3.4. Módulo 4: Trayectoria y Formación Académica"),
          createParagraph(
            "Diseñado como un acordeón responsivo que detalla la cronología laboral (SENAMECF, Unidad Educativa, SUNDDE, INATUR) y la formación universitaria como TSU en Informática en la Universidad Nacional Experimental de las Telecomunicaciones e Informática (UNETI), junto con certificaciones de Fundación Telefónica y academias especializadas."
          ),

          createHeading2("3.5. Módulo 5: Formulario de Contacto Interactivo"),
          createBullet("Validación en vivo de nombre (min. 2 caracteres), formato de email y longitud del mensaje.", "Validación en Cliente:"),
          createBullet("Preparado para conexión sin backend con Web3Forms mediante variable VITE_WEB3FORMS_KEY.", "Envío Automatizado:"),
          createBullet("Si no se proporciona clave de API, abre automáticamente el cliente de correo del usuario con el asunto y cuerpo redactados.", "Modo Directo / Fallback:"),

          createHeading2("3.6. Módulo 6: Accesibilidad y Modo Claro / Oscuro"),
          createBullet(
            "Alternador de tema con detección de preferencias del sistema operativo y persistencia local.",
            "Persistencia LocalStorage:"
          ),
          createBullet(
            "Sincroniza la meta-etiqueta 'theme-color' para colorear la barra de estado en navegadores móviles.",
            "Sincronización Móvil:"
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 4. DESPLIEGUE EN RENDER Y CI/CD
          createHeading1("4. Despliegue en la Nube y Automatización (Render)"),
          createParagraph(
            "La publicación del MVP se realiza a través de Render.com como Static Site. Esto garantiza que no existan costes de hosting y que el sitio se mantenga activo de manera continua sin suspensiones por inactividad."
          ),

          createHeading2("4.1. Archivo de Configuración de Infraestructura (render.yaml)"),
          createParagraph(
            "El repositorio cuenta con la especificación de infraestructura como código (Infrastructure as Code) siguiente:"
          ),
          createCallout(
            "BLUEPRINT RENDER.YAML",
            "services:\n" +
              "  - type: web\n" +
              "    name: portafolio\n" +
              "    env: static\n" +
              "    buildCommand: npm install && npm run build\n" +
              "    staticPublishPath: ./dist\n" +
              "    routes:\n" +
              "      - type: rewrite\n" +
              "        source: /*\n" +
              "        destination: /index.html\n" +
              "    headers:\n" +
              "      - path: /*\n" +
              "        name: X-Frame-Options\n" +
              "        value: SAMEORIGIN\n" +
              "      - path: /*\n" +
              "        name: X-Content-Type-Options\n" +
              "        value: nosniff\n" +
              "      - path: /assets/*\n" +
              "        name: Cache-Control\n" +
              "        value: public, max-age=31536000, immutable"
          ),

          createHeading2("4.2. Flujo de Integración Continua (CI/CD)"),
          createBullet("1. El desarrollador ejecuta cambios en su entorno local y sube las modificaciones mediante 'git push origin main'.", "Paso 1:"),
          createBullet("2. Render detecta el webhook de GitHub de forma instantánea.", "Paso 2:"),
          createBullet("3. El entorno de Render ejecuta 'npm install && npm run build', compilando la carpeta dist/ en menos de 2 minutos.", "Paso 3:"),
          createBullet("4. Los nuevos artefactos se distribuyen a la red CDN con certificado SSL/TLS renovado automáticamente.", "Paso 4:"),

          new Paragraph({ spacing: { after: 300 } }),

          // 5. RESPONSIVIDAD Y AUDITORÍA MÓVIL
          createHeading1("5. Diseño Responsivo y Optimización Móvil"),
          createParagraph(
            "El MVP fue minuciosamente adaptado para responder a los estándares táctiles de dispositivos móviles modernos:"
          ),
          createBullet("Dimensionado tipográfico dinámico que evita roturas de pantalla en móviles de 360px.", "Tipografía Fluida:"),
          createBullet("Las categorías y las pestañas técnicas cuentan con desplazamiento horizontal nativo sin barras visibles.", "Filtros con Scroll Horizontal:"),
          createBullet("Dimensionados con altura mínima de 44px para cumplir con las directrices de accesibilidad de Apple y Google.", "Botones Táctiles Amigables:"),
          createBullet("Campos configurados a 16px en móvil para evitar que iOS Safari realice zoom forzado automático.", "Prevención de Zoom en Formularios:"),

          new Paragraph({ spacing: { after: 300 } }),

          // 6. CONCLUSIONES Y ROADMAP POST-MVP
          createHeading1("6. Conclusiones y Próximos Pasos (Roadmap)"),
          createParagraph(
            "El Producto Mínimo Viable (v1.0.0) cumple satisfactoriamente con todos los criterios de aceptación fijados para el lanzamiento inicial: refleja fielmente el perfil y competencias de Robert Pérez, ofrece una tasa de carga sobresaliente y proporciona vías de contacto inmediatas para potenciales contratistas y empleadores."
          ),
          createHeading2("6.1. Plan de Iteraciones Futuras (Fase 2)"),
          createBullet("Módulo de publicaciones técnicas en Markdown para compartir tutoriales y artículos sobre Laravel y Linux.", "Blog de Ingeniería:"),
          createBullet("Integración de un panel administrativo con credenciales para actualizar proyectos sin necesidad de recompilar.", "Dashboard Privado:"),
          createBullet("Incorporación de métricas de visitantes respetuosas con la privacidad sin requerir banners de cookies.", "Analítica Ligera:")
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve(
    process.cwd(),
    "Documentacion-MVP-Portafolio-Robert-Perez.docx"
  );
  fs.writeFileSync(outputPath, buffer);
  console.log("Documento generado exitosamente en:", outputPath);
}

generate().catch(console.error);
