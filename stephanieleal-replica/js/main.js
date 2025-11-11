// Navegación móvil
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle menú móvil
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Dropdown en móvil
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (link) {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        // Validación básica
        if (!formData.nombre || !formData.email || !formData.mensaje) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }
        
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        
        // Simular envío (en producción, aquí harías una petición al servidor)
        console.log('Formulario enviado:', formData);
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        
        // Limpiar formulario
        contactForm.reset();
        
        // En producción, aquí harías:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('¡Mensaje enviado con éxito!');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
        // });
    });
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para navbar fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animación al hacer scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con animación
document.querySelectorAll('.service-card, .contact-item, .about-text, .history-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Lazy loading para imágenes (si se agregan)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Actualizar año en footer
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// Prevenir envío múltiple del formulario
let isSubmitting = false;
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        if (isSubmitting) {
            return false;
        }
        isSubmitting = true;
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Re-habilitar después de 3 segundos (en producción, esto sería después de la respuesta del servidor)
            setTimeout(() => {
                isSubmitting = false;
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar';
            }, 3000);
        }
    });
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Agregar clase activa al enlace de navegación según la página actual
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

console.log('Sitio web de Stephanie Leal cargado correctamente');

