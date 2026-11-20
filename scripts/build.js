import fs from "fs";
import path from "path";

console.log("Iniciando build para Render...");

const distDir = path.resolve("dist");

// Crear o limpiar directorio dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Archivos y carpetas a copiar a dist
const itemsToCopy = ["index.html", "favicon.svg", "css", "js", "images"];

for (const item of itemsToCopy) {
  const src = path.resolve(item);
  const dest = path.resolve(distDir, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`Copiado: ${item} -> dist/${item}`);
  } else {
    console.warn(`Advertencia: No se encontró ${item}`);
  }
}

console.log("¡Build completado con éxito! Archivos listos en /dist.");
