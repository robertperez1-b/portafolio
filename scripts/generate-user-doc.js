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
        text: text,
        font: "Arial",
        size: 22,
        bold: isBold,
        color: PRIMARY_COLOR,
      }),
    ],
    spacing: { before: 80, after: 80, line: 320 },
  });
}

function createBullet(text, boldPrefix = "") {
  const children = [];
  if (boldPrefix) {
    children.push(
      new TextRun({
        text: boldPrefix + " ",
        font: "Arial",
        size: 22,
        bold: true,
        color: PRIMARY_COLOR,
      })
    );
  }
  children.push(
    new TextRun({
      text: text,
      font: "Arial",
      size: 22,
      color: SECONDARY_COLOR,
    })
  );

  return new Paragraph({
    children: children,
    bullet: { level: 0 },
    spacing: { before: 60, after: 60, line: 300 },
  });
}

function createCallout(title, description) {
  const cellBorders = {
    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    left: { style: BorderStyle.SINGLE, size: 24, color: ACCENT_COLOR },
  };

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorders,
            shading: { type: ShadingType.CLEAR, fill: LIGHT_BG },
            margins: { top: 160, bottom: 160, left: 240, right: 200 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    font: "Arial",
                    size: 22,
                    bold: true,
                    color: ACCENT_COLOR,
                  }),
                ],
                spacing: { after: 60 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: description,
                    font: "Arial",
                    size: 20,
                    color: SECONDARY_COLOR,
                  }),
                ],
                spacing: { line: 280 },
              }),
            ],
          }),
        ],
      }),
    ],
    alignment: AlignmentType.CENTER,
  });
}

function createTable(headers, rows) {
  const tableBorders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
    left: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
    right: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
  };

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(
      (h) =>
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: "EAE6DC" },
          margins: { top: 120, bottom: 120, left: 160, right: 160 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: h,
                  font: "Arial",
                  size: 20,
                  bold: true,
                  color: PRIMARY_COLOR,
                }),
              ],
            }),
          ],
        })
    ),
  });

  const bodyRows = rows.map(
    (row, idx) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              shading: {
                type: ShadingType.CLEAR,
                fill: idx % 2 === 0 ? "FFFFFF" : "FAF8F5",
              },
              margins: { top: 100, bottom: 100, left: 160, right: 160 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cell,
                      font: "Arial",
                      size: 20,
                      color: PRIMARY_COLOR,
                    }),
                  ],
                }),
              ],
            })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: [headerRow, ...bodyRows],
    alignment: AlignmentType.CENTER,
  });
}

async function generateDoc() {
  const doc = new Document({
    creator: "Robert Pérez",
    title: "Documentación Técnica y Manual de Usuario — Portafolio Web",
    description: "Manual de usuario y especificación de arquitectura HTML, CSS, JavaScript y Bootstrap 5.",
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 22, color: PRIMARY_COLOR },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        children: [
          // Portada
          new Paragraph({
            children: [
              new TextRun({
                text: "MANUAL DE USUARIO Y DOCUMENTACIÓN TÉCNICA",
                font: "Arial",
                size: 18,
                bold: true,
                color: ACCENT_COLOR,
              }),
            ],
            spacing: { before: 200, after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Portafolio Web Profesional — Robert Pérez",
                font: "Arial",
                size: 40,
                bold: true,
                color: PRIMARY_COLOR,
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Arquitectura Estándar: HTML5 + CSS3 + JavaScript (ES6+) + Bootstrap 5.3",
                font: "Arial",
                size: 24,
                color: SECONDARY_COLOR,
              }),
            ],
            spacing: { after: 360 },
          }),

          createCallout(
            "Ficha Técnica del Sistema",
            "• Titular: Robert José Pérez Castro (TSU en Informática, UNETI, Caracas)\n" +
            "• URL de Producción: https://portafolio-724a.onrender.com\n" +
            "• Repositorio Oficial: https://github.com/robertperez1-b/portafolio.git\n" +
            "• Entorno de Ejecución: 100% Nativo en Navegador (Zero Build Tooling, Carga Ultrarrápida)\n" +
            "• Fecha de Actualización: Noviembre 2026"
          ),

          new Paragraph({ text: "", spacing: { after: 240 } }),

          // 1. Introducción y Propósito
          createHeading1("1. Introducción y Propósito"),
          createParagraph(
            "El presente documento detalla la estructura, funcionamiento y operación del portafolio profesional de Robert Pérez. Diseñado para ofrecer una presentación de alto nivel para reclutadores, líderes técnicos y clientes, el sitio combina un diseño editorial refinado con un rendimiento excepcional mediante el uso de tecnologías web estándar sin dependencias de compilación pesadas."
          ),
          createParagraph(
            "El proyecto responde a los principios de arquitectura limpia, accesibilidad (WCAG AA), diseño responsivo móvil-primero y portabilidad total."
          ),

          // 2. Arquitectura de Tecnologías
          createHeading1("2. Arquitectura del Software"),
          createParagraph(
            "Se implementó una arquitectura 100% estática basada en estándares universales de la web:"
          ),
          createTable(
            ["Tecnología", "Versión / Fuente", "Rol en el Portafolio"],
            [
              ["HTML5 Semántico", "Estándar W3C", "Estructuración accesible con etiquetas main, header, section, nav y figure."],
              ["CSS3 Custom Properties", "Nativo W3C", "Sistema de temas (claro/oscuro), variables de diseño, tipografía y animaciones."],
              ["Bootstrap CSS & JS", "v5.3.3 (CDN)", "Sistema de rejilla responsiva (Grid), espaciados, utilidades de alineación y soporte modal."],
              ["JavaScript Vanilla", "ES6+ Moderno", "Lógica interactiva completa, renderizado reactivo del DOM, validación y navegación modal."],
              ["Google Fonts", "CDN", "Familias tipográficas Plus Jakarta Sans, Inter, Newsreader y JetBrains Mono."],
              ["Render Hosting", "Static Site", "Alojamiento global con certificados SSL/TLS y cabeceras de seguridad activas."]
            ]
          ),

          new Paragraph({ text: "", spacing: { after: 200 } }),

          // 3. Estructura de Archivos
          createHeading1("3. Estructura Limpia de Archivos"),
          createParagraph(
            "La estructura del proyecto prescinde de node_modules o transpiladores para producción, permitiendo su despliegue y modificación inmediata:"
          ),
          createBullet("Página principal semántica que conecta los módulos, estilos y fuentes.", "index.html:"),
          createBullet("Hoja de estilos personalizada con sistema de colores, temas y media queries.", "css/styles.css:"),
          createBullet("Lógica del cliente: gestión de estado, filtros, modal, acordión y formulario.", "js/app.js:"),
          createBullet("Directorio con las fotografías de proyectos e imagen de perfil con efecto 3D.", "images/:"),
          createBullet("Icono vectorial adaptativo para navegadores modernos.", "favicon.svg:"),
          createBullet("Archivo de configuración estática para despliegue automatizado en Render.", "render.yaml:"),

          // 4. Manual de Usuario: Guía de Navegación
          createHeading1("4. Manual de Usuario — Experiencia de Navegación"),
          createParagraph(
            "El sitio está estructurado en cuatro secciones principales diseñadas para una lectura fluida:"
          ),

          createHeading2("4.1. Encabezado y Sección Hero"),
          createBullet("Permite alternar instantáneamente entre tema claro y tema oscuro mediante el botón superior. La preferencia se almacena en el navegador (localStorage).", "Modo Oscuro / Claro:"),
          createBullet("Al hacer clic en 'Descargar CV', el sistema genera y descarga un resumen técnico completo en texto (.txt) sin requerir servicios externos.", "Descarga de CV:"),
          createBullet("Al tocar el botón de correo, la dirección se copia automáticamente al portapapeles con confirmación visual.", "Copiado Rápido de Correo:"),
          createBullet("Al pasar el cursor sobre la fotografía de perfil, esta reacciona con inclinación tridimensional suave según las coordenadas del ratón (desactivado automáticamente en dispositivos táctiles).", "Efecto 3D Tilt:"),

          createHeading2("4.2. Galería de Proyectos y Casos de Estudio"),
          createBullet("Botones tipo píldora que permiten categorizar los proyectos (Backend & APIs, Aplicación Web, Soporte & Infraestructura, Datos Interactivos).", "Filtrado Dinámico:"),
          createBullet("Al seleccionar cualquier tarjeta, se despliega una ventana modal con el análisis a fondo: contexto institucional, reto tecnológico, solución adoptada, métricas y tecnologías utilizadas.", "Detalle de Caso:"),
          createBullet("El modal permite cambiar entre proyectos con los botones anterior/siguiente o mediante las teclas de flechas (Izquierda / Derecha) y salir con la tecla Escape.", "Navegación por Teclado:"),

          createHeading2("4.3. Competencias Técnicas y Entregables"),
          createBullet("Segmentadas en tres grupos: Desarrollo de Software, Soporte Técnico y Automatización / Datos.", "Pestañas de Habilidades:"),
          createBullet("Cada competencia exhibe su nivel porcentual, años de experiencia y detalle explicativo con barras de progreso animadas.", "Indicadores de Dominio:"),
          createBullet("Lista verificable de resultados tangibles por cada área de especialidad.", "Entregables Habituales:"),

          createHeading2("4.4. Trayectoria Profesional y Formación"),
          createBullet("Acordeones interactivos donde el usuario puede abrir o cerrar las etapas de experiencia (SENAMECF, Unidad Educativa, SUNDDE, INATUR) y formación (UNETI, Certificaciones).", "Línea de Tiempo:"),

          createHeading2("4.5. Formulario de Contacto Inteligente"),
          createBullet("Comprueba en tiempo real que el nombre tenga al menos 2 caracteres, el correo tenga formato válido y el mensaje cuente con al menos 12 caracteres.", "Validación en Vivo:"),
          createBullet("Permite seleccionar el motivo específico del contacto (Desarrollo Web, Backend, Soporte, Automatización n8n u Oportunidad laboral).", "Segmentación de Asunto:"),
          createBullet("Apertura asistida del cliente de correo nativo con asunto y cuerpo preformateados para envío garantizado.", "Fallback de Correo Seguro:"),

          // 5. Mantenimiento y Actualización de Contenidos
          createHeading1("5. Guía de Mantenimiento para Desarrolladores"),
          createParagraph(
            "Para actualizar la información del portafolio en el futuro, solo se requiere editar el archivo js/app.js:"
          ),
          createBullet("Modificar el objeto constante PROFILE al inicio de js/app.js.", "Cambiar datos de perfil:"),
          createBullet("Agregar o editar elementos en el arreglo constante PROJECTS. Cada proyecto cuenta con atributos de título, métricas, solución y tecnologías.", "Agregar un nuevo proyecto:"),
          createBullet("Actualizar las listas en SKILL_GROUPS con el nombre, nivel (0-100) y detalles de cada herramienta.", "Actualizar habilidades:"),
          createBullet("Sustituir el archivo correspondiente en la carpeta images/ manteniendo los nombres referenciados.", "Reemplazar imágenes:")
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.resolve("c:\\laragon\\www\\Portafolio\\Documentacion-Usuario-y-Tecnica-Portafolio.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Documento generado con éxito en:", outPath);
}

generateDoc();
