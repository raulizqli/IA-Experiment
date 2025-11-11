# 📘 Guía de Implementación de CMS en la Nube

Esta guía te ayudará a integrar un CMS en la nube para gestionar el contenido del sitio dinámicamente.

---

## 🎯 Opciones de CMS Recomendadas

### 1. Firebase (Más Fácil - Recomendado para empezar)

**Ventajas:**
- ✅ Gratis hasta cierto límite
- ✅ Muy fácil de configurar
- ✅ Real-time updates
- ✅ Autenticación incluida
- ✅ Hosting incluido

**Pasos de Implementación:**

#### Paso 1: Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. Habilita Authentication
5. Habilita Storage (para imágenes)

#### Paso 2: Obtener Credenciales
1. En Firebase Console, ve a Project Settings
2. En la sección "Your apps", agrega una web app
3. Copia las credenciales (apiKey, authDomain, etc.)

#### Paso 3: Configurar en el Sitio
```javascript
// En config/firebase-config.js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

#### Paso 4: Agregar SDK de Firebase
```html
<!-- En index.html, antes de </body> -->
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js"></script>
<script src="config/firebase-config.js"></script>
<script src="js/cms-integration.js"></script>
```

#### Paso 5: Usar el CMS
```javascript
// Inicializar CMS
const cms = new CMSIntegration({
    provider: 'firebase',
    firebaseConfig: firebaseConfig
});

await cms.init();

// Obtener contenido
const services = await cms.getContent('services');
const blogPosts = await cms.getContent('blog');

// Renderizar contenido dinámicamente
services.forEach(service => {
    // Crear elementos HTML y agregar al DOM
});
```

---

### 2. Strapi (Más Flexible - Recomendado para control total)

**Ventajas:**
- ✅ Open source y gratuito
- ✅ Muy flexible
- ✅ Panel de administración completo
- ✅ API REST/GraphQL

**Pasos de Implementación:**

#### Paso 1: Instalar Strapi
```bash
npx create-strapi-app@latest my-cms
cd my-cms
npm run develop
```

#### Paso 2: Crear Tipos de Contenido
1. Ve a http://localhost:1337/admin
2. Crea tipos de contenido:
   - **Service**: title, description, icon, image
   - **BlogPost**: title, content, author, date, image
   - **Testimonial**: name, text, rating, image

#### Paso 3: Configurar Permisos
1. Settings > Users & Permissions Plugin > Roles > Public
2. Habilita "find" y "findOne" para cada tipo de contenido

#### Paso 4: Obtener API Token
1. Settings > API Tokens
2. Crea un nuevo token con permisos de lectura

#### Paso 5: Usar en el Sitio
```javascript
const cms = new CMSIntegration({
    provider: 'strapi',
    apiUrl: 'https://tu-strapi.com/api',
    apiToken: 'TU_API_TOKEN'
});

await cms.init();

const services = await cms.getContent('services');
```

---

### 3. Contentful (Más Fácil de Usar - Recomendado para no desarrolladores)

**Ventajas:**
- ✅ Excelente UI/UX
- ✅ Muy fácil de usar
- ✅ CDN integrado
- ✅ Gratis hasta 25,000 requests/mes

**Pasos de Implementación:**

#### Paso 1: Crear Cuenta
1. Ve a [Contentful](https://www.contentful.com/)
2. Crea una cuenta gratuita
3. Crea un nuevo espacio

#### Paso 2: Crear Content Types
1. Content model > Add content type
2. Crea tipos: Service, BlogPost, etc.

#### Paso 3: Obtener Credenciales
1. Settings > API keys
2. Copia Space ID y Content Delivery API - access token

#### Paso 4: Usar en el Sitio
```html
<script src="https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js"></script>
```

```javascript
const cms = new CMSIntegration({
    provider: 'contentful',
    spaceId: 'TU_SPACE_ID',
    accessToken: 'TU_ACCESS_TOKEN'
});

await cms.init();
```

---

## 🔐 Panel de Administración

### Crear Panel de Admin con Firebase

```html
<!-- admin.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Panel de Administración</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <div class="admin-container">
        <h1>Panel de Administración</h1>
        
        <section class="admin-section">
            <h2>Gestión de Servicios</h2>
            <form id="service-form">
                <input type="text" id="service-title" placeholder="Título" required>
                <textarea id="service-desc" placeholder="Descripción" required></textarea>
                <input type="file" id="service-image" accept="image/*">
                <button type="submit">Guardar Servicio</button>
            </form>
            
            <div id="services-list"></div>
        </section>
        
        <section class="admin-section">
            <h2>Gestión de Blog</h2>
            <!-- Similar estructura para blog posts -->
        </section>
    </div>
    
    <script src="js/admin.js"></script>
</body>
</html>
```

---

## 📝 Estructura de Datos Recomendada

### Firebase Firestore

```
services/
  └── {serviceId}/
      ├── title: "Sesiones Psicológicas"
      ├── description: "Terapia individual..."
      ├── icon: "🧠"
      ├── imageUrl: "https://..."
      └── order: 1

blog/
  └── {postId}/
      ├── title: "Título del post"
      ├── content: "Contenido..."
      ├── author: "Stephanie Leal"
      ├── date: Timestamp
      ├── imageUrl: "https://..."
      └── category: "Psicología"

appointments/
  └── {appointmentId}/
      ├── name: "Nombre del cliente"
      ├── email: "email@example.com"
      ├── phone: "8116128951"
      ├── date: Timestamp
      ├── type: "presencial" | "linea"
      └── status: "pending" | "confirmed" | "cancelled"
```

---

## 🚀 Despliegue

### Opción 1: Firebase Hosting (Gratis)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Opción 2: Netlify (Gratis)
1. Conecta tu repositorio GitHub
2. Netlify detecta automáticamente el sitio
3. Deploy automático en cada push

### Opción 3: Vercel (Gratis)
```bash
npm install -g vercel
vercel
```

---

## 📊 Monitoreo y Analytics

### Google Analytics 4
```html
<!-- En <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔒 Seguridad

1. **Reglas de Firestore:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /services/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

2. **Validación de formularios:** Siempre validar en el cliente Y servidor
3. **Rate limiting:** Limitar requests por IP
4. **HTTPS:** Siempre usar HTTPS en producción

---

## 📞 Soporte

Para ayuda adicional:
- Firebase: [Documentación](https://firebase.google.com/docs)
- Strapi: [Documentación](https://docs.strapi.io)
- Contentful: [Documentación](https://www.contentful.com/developers/docs/)

---

**Última actualización**: Noviembre 2025

