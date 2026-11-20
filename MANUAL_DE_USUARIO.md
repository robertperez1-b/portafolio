# Manual de Usuario y Documentación Técnica del Portafolio

**Propietario:** Robert José Pérez Castro  
**Titulación:** Técnico Superior Universitario en Informática (UNETI)  
**Ubicación:** Caracas, Venezuela  
**Despliegue en producción:** [portafolio-724a.onrender.com](https://portafolio-724a.onrender.com)  
**Repositorio GitHub:** [github.com/robertperez1-b/portafolio](https://github.com/robertperez1-b/portafolio.git)

---

## 1. Visión General del Proyecto

Este portafolio web fue estructurado utilizando exclusivamente **HTML5 estándar, CSS3 personalizado, JavaScript nativo (ES6+) y Bootstrap 5.3**. 

Se eliminaron las dependencias de transpilación o frameworks pesados (como React, TypeScript o Vite) en favor de:
- **Velocidad de carga inmediata:** Sin esperas de empaquetado ni retrasos por hidratación.
- **Portabilidad total:** Se ejecuta en cualquier servidor web estático (Apache, Nginx, Laragon, Render, GitHub Pages) o localmente haciendo doble clic en `index.html`.
- **Mantenibilidad:** El código está desacoplado y ampliamente comentado en cada sección.

---

## 2. Estructura del Proyecto

```text
Portafolio/
│
├── index.html                           # Estructura semántica HTML5 y puntos de anclaje
├── render.yaml                          # Configuración de despliegue estático en Render
├── favicon.svg                          # Icono vectorial oficial del portafolio
├── Documentacion-Usuario-y-Tecnica-Portafolio.docx  # Documentación formal en Word
│
├── css/
│   └── styles.css                       # Variables CSS (:root), temas, diseño y responsive
│
├── js/
│   └── app.js                           # Lógica funcional, gestión de estado y renderizado dinámico
│
└── images/                              # Recursos gráficos y fotografías
    ├── portrait.jpg                     # Fotografía de perfil con efecto 3D
    ├── inventario.jpg                   # Proyecto SENAMECF
    ├── plaga.jpg                        # Proyecto Gestión Educativa
    ├── dashboard-inatur.jpg             # Proyecto Dashboard INATUR
    └── sundde.jpg                       # Proyecto SUNDDE Infraestructura
```

---

## 3. Manual de Usuario (Interacción y Uso)

### 3.1. Alternancia de Tema (Modo Claro / Modo Oscuro)
- El botón circular en la barra de navegación superior permite conmutar entre tema claro y tema oscuro.
- El sistema detecta automáticamente la preferencia de color del sistema operativo del visitante (`prefers-color-scheme`).
- La elección del usuario se almacena en el `localStorage` del navegador para mantenerse en visitas futuras.

### 3.2. Descarga de Currículum Vitae (CV)
- El botón **Descargar CV** en el Hero procesa dinámicamente un archivo de texto estructurado (`cv-robert-perez.txt`) con el perfil profesional, proyectos clave, formación y lista de competencias técnicas, descargándose automáticamente.

### 3.3. Copia Rápida de Correo y WhatsApp
- Al pulsar sobre el correo electrónico (`perezrobert2002@gmail.com`), este se copia al portapapeles con una confirmación visual instantánea (`¡Correo copiado!`).
- El botón de teléfono cuenta con enlace directo a WhatsApp (`https://wa.me/584241347741`) para facilitar contacto inmediato.

### 3.4. Efecto 3D Tilt en la Fotografía de Perfil
- En computadoras de escritorio, al pasar el cursor sobre la foto de Robert Pérez, esta reacciona calculando la posición tridimensional del cursor (`perspective`, `rotateX`, `rotateY`).
- En dispositivos móviles o táctiles, este cálculo se desactiva de forma inteligente (`@media (hover: none)`) para garantizar un consumo de batería óptimo y suavidad de desplazamiento.

### 3.5. Filtro de Proyectos y Modal de Caso de Estudio
- **Filtros por categoría:** Permite segmentar por *Todos*, *Aplicación Web*, *Backend & APIs*, *Soporte & Infraestructura* y *Datos Interactivos*. Cada botón muestra el recuento de proyectos en tiempo real.
- **Ventana Modal de Caso de Estudio:**
  - Al hacer clic en cualquier tarjeta, se despliega el análisis detallado del proyecto: Rol, duración, reto técnico, solución implementada, métricas e hitos.
  - **Navegación por teclado:** Se puede avanzar con la tecla `Flecha Derecha`, retroceder con `Flecha Izquierda` y cerrar la ventana con `Escape`.
  - **Botón "Consultar por un proyecto similar":** Cierra el modal y enfoca automáticamente el formulario de contacto con un mensaje personalizado.

### 3.6. Selector de Competencias Técnicas
- Las pestañas laterales permiten conmutar entre *Desarrollo de Software*, *Soporte Técnico* y *Automatización / Datos*.
- Cada área expone barras de progreso animadas, detalle técnico de aplicación y una lista de entregables habituales.

### 3.7. Formulario de Contacto
- Validación en tiempo de ejecución:
  - Nombre: mínimo 2 caracteres.
  - Correo electrónico: formato válido (`usuario@dominio.com`).
  - Mensaje: mínimo 12 caracteres y contador hasta 500 caracteres.
- Al enviar, abre de forma segura y transparente el gestor de correo predeterminado del usuario con el destinatario, asunto y mensaje listos para ser enviados.

---

## 4. Guía de Mantenimiento para Desarrolladores

Cualquier cambio de información o nuevos proyectos se efectúa directamente en `js/app.js`:

1. **Editar datos de perfil:** Modificar el objeto `PROFILE` al inicio del archivo.
2. **Agregar nuevos proyectos:** Añadir un nuevo objeto al arreglo `PROJECTS` siguiendo la estructura:
   ```javascript
   {
     id: "nuevo-proyecto",
     index: "05",
     title: "Nombre del Proyecto",
     subtitle: "Breve descripción",
     category: "Backend & APIs",
     year: "2026",
     role: "Desarrollador Fullstack",
     duration: "3 meses",
     image: "images/mi-imagen.jpg",
     summary: "Resumen del proyecto...",
     challenge: "Reto afrontado...",
     solution: "Solución implementada...",
     highlights: ["Logro 1", "Logro 2"],
     metrics: [{ label: "Eficiencia", value: "+30%" }],
     stack: ["PHP", "Laravel", "MySQL"],
     liveUrl: "mailto:...",
     repoUrl: "https://github.com/..."
   }
   ```
3. **Despliegue a producción:** Un simple `git add .`, `git commit -m "..."` y `git push origin main` actualiza automáticamente el sitio en Render.
