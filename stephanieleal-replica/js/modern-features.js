/**
 * Modern Features JavaScript
 * Funcionalidades modernas para el sitio
 */

// ============================================
// TOAST NOTIFICATIONS
// ============================================
class ToastManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Cerrar">&times;</button>
        `;

        this.container.appendChild(toast);

        // Auto remove
        const autoRemove = setTimeout(() => {
            this.remove(toast);
        }, duration);

        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.remove(toast);
        });

        return toast;
    }

    remove(toast) {
        toast.classList.add('hiding');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }
}

// ============================================
// MODAL MANAGER
// ============================================
class ModalManager {
    constructor() {
        this.activeModal = null;
    }

    show(content, options = {}) {
        // Close existing modal
        if (this.activeModal) {
            this.close();
        }

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'modal-content';
        
        if (typeof content === 'string') {
            modal.innerHTML = content;
        } else {
            modal.appendChild(content);
        }

        // Close button
        if (options.closable !== false) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 2rem; cursor: pointer; color: #666;';
            closeBtn.addEventListener('click', () => this.close());
            modal.style.position = 'relative';
            modal.appendChild(closeBtn);
        }

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);

        // Close on overlay click
        if (options.closeOnOverlay !== false) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            });
        }

        // Close on ESC
        this.escHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        document.addEventListener('keydown', this.escHandler);

        this.activeModal = overlay;
        return overlay;
    }

    close() {
        if (this.activeModal) {
            this.activeModal.classList.remove('active');
            setTimeout(() => {
                if (this.activeModal.parentNode) {
                    this.activeModal.parentNode.removeChild(this.activeModal);
                }
                this.activeModal = null;
            }, 300);
        }
        document.removeEventListener('keydown', this.escHandler);
    }
}

// ============================================
// SCROLL REVEAL
// ============================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// DARK MODE TOGGLE
// ============================================
class DarkMode {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.createToggle();
    }

    createToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
        toggle.addEventListener('click', () => this.toggle());
        document.body.appendChild(toggle);
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);
        
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// ============================================
// FORM ENHANCEMENTS
// ============================================
class FormEnhancer {
    constructor() {
        this.toast = new ToastManager();
        this.init();
    }

    init() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.handleSubmit(e, form);
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        this.validateField(input);
                    }
                });
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Email inválido';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Teléfono inválido';
            }
        }

        // Update UI
        if (isValid) {
            field.classList.remove('error');
            this.removeError(field);
        } else {
            field.classList.add('error');
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        this.removeError(field);
        const error = document.createElement('span');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
        field.parentNode.appendChild(error);
    }

    removeError(field) {
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
    }

    async handleSubmit(e, form) {
        e.preventDefault();

        // Validate all fields
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.toast.show('Por favor, completa todos los campos correctamente', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }

        try {
            // Simulate API call (replace with actual API)
            await this.submitForm(form);
            
            this.toast.show('¡Mensaje enviado con éxito!', 'success');
            form.reset();
        } catch (error) {
            this.toast.show('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
            console.error('Form submission error:', error);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    }

    async submitForm(form) {
        // This would be replaced with actual API call
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Form data:', data);
        
        // In production, replace with:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // if (!response.ok) throw new Error('Submission failed');
    }
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize toast manager
    window.toast = new ToastManager();
    
    // Initialize modal manager
    window.modal = new ModalManager();
    
    // Initialize scroll reveal
    new ScrollReveal();
    
    // Initialize dark mode
    new DarkMode();
    
    // Initialize form enhancements
    new FormEnhancer();
    
    console.log('Modern features initialized');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ToastManager, ModalManager, ScrollReveal, DarkMode, FormEnhancer };
}

