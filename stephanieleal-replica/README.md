# Réplica del Sitio Web de Stephanie Leal

Este es un proyecto de réplica del sitio web profesional de Stephanie Leal, psicóloga en Monterrey, México. El sitio ha sido reconstruido usando tecnologías web modernas (HTML5, CSS3, JavaScript vanilla) en lugar de WordPress.

## 🚀 Características

- **Diseño Responsive**: Optimizado para dispositivos móviles, tablets y escritorio
- **Navegación Intuitiva**: Menú desplegable con todas las secciones principales
- **Formularios Funcionales**: Formularios de contacto y solicitud de citas
- **SEO Optimizado**: Meta tags, estructura semántica y contenido optimizado
- **Animaciones Suaves**: Transiciones y efectos visuales modernos
- **Accesible**: Estructura HTML semántica y navegación accesible

## 📁 Estructura del Proyecto

```
stephanieleal-replica/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principales
├── js/
│   └── main.js         # Funcionalidad JavaScript
├── pages/
│   ├── servicios.html  # Página de servicios
│   ├── agendar.html    # Página para agendar citas
│   ├── faq.html        # Preguntas frecuentes
│   ├── blog.html       # Blog
│   ├── terminos.html   # Términos de uso
│   └── privacidad.html # Política de privacidad
└── README.md           # Este archivo
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, Flexbox y Grid
- **JavaScript (Vanilla)**: Sin dependencias externas
- **Google Fonts**: Montserrat, Open Sans, Catamaran

## 📄 Páginas Incluidas

1. **Inicio** (`index.html`)
   - Hero section
   - Sobre Stephanie Leal
   - Historia personal
   - Servicios destacados
   - Formulario de contacto

2. **Servicios** (`pages/servicios.html`)
   - Sesiones psicológicas
   - Talleres y cursos
   - Servicios empresariales

3. **Agendar Cita** (`pages/agendar.html`)
   - Información sobre sesiones presenciales
   - Información sobre sesiones en línea
   - Formulario de reserva

4. **Preguntas Frecuentes** (`pages/faq.html`)
   - Accordion interactivo
   - Respuestas a preguntas comunes

5. **Blog** (`pages/blog.html`)
   - Artículos sobre psicología
   - Contenido sobre depresión, empatía, suicidio, etc.

6. **Términos de Uso** (`pages/terminos.html`)
7. **Política de Privacidad** (`pages/privacidad.html`)

## 🛠️ Instalación y Uso

### Opción 1: Servidor Local Simple

1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador

### Opción 2: Servidor Local con Python

```bash
# Python 3
python -m http.server 8000

# Luego abre en el navegador:
# http://localhost:8000
```

### Opción 3: Servidor Local con Node.js

```bash
# Instala http-server globalmente
npm install -g http-server

# Ejecuta el servidor
http-server

# Luego abre en el navegador la URL mostrada
```

## 🎯 Funcionalidades Implementadas

### Navegación
- Menú responsive con toggle móvil
- Dropdowns funcionales
- Scroll suave a secciones
- Indicador de página activa

### Formularios
- Validación de campos
- Prevención de envío múltiple
- Mensajes de confirmación
- Formulario de contacto
- Formulario de solicitud de citas

### Interactividad
- FAQ con accordion
- Animaciones al hacer scroll
- Efectos hover en tarjetas
- Navbar con efecto al hacer scroll

## 🎨 Personalización

### Colores
Los colores principales están definidos en variables CSS en `css/styles.css`:

```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #7b68ee;
    --accent-color: #50c878;
    /* ... más variables */
}
```

### Fuentes
Las fuentes se cargan desde Google Fonts. Puedes cambiarlas modificando los enlaces en el `<head>` de cada HTML.

## 📱 Responsive Design

El sitio está optimizado para:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Próximas Mejoras Sugeridas

- [ ] Integración con backend para formularios
- [ ] Sistema de calendario para reservas
- [ ] Integración con pasarela de pagos
- [ ] Sistema de blog dinámico
- [ ] Optimización de imágenes
- [ ] PWA (Progressive Web App)
- [ ] Integración con Google Analytics
- [ ] Chat en vivo

## 📝 Notas

- Los formularios actualmente muestran alertas. En producción, deberían conectarse a un backend.
- Las imágenes de ejemplo usan emojis. En producción, deberían reemplazarse con imágenes reales.
- Los enlaces de redes sociales están como placeholders. Actualiza con URLs reales.

## 📄 Licencia

Este proyecto es una réplica educativa/demostrativa del sitio original de Stephanie Leal.

## 👤 Contacto

**Stephanie Leal**
- Teléfono: 8116128951
- Email: contacto@stephanieleal.com.mx
- Dirección: Tampico 160, Colonia las Brisas, Monterrey, Nuevo León

---

**Nota**: Este es un proyecto de demostración. Para el sitio en producción, se recomienda implementar un backend robusto, sistema de autenticación para el área de administración, y todas las integraciones necesarias para un sitio web profesional completo.

