/**
 * CMS Integration Module
 * Este módulo permite conectar el sitio con un CMS en la nube
 * Soporta: Firebase, Strapi, Contentful, Sanity
 */

class CMSIntegration {
    constructor(config) {
        this.config = config;
        this.provider = config.provider || 'firebase';
        this.initialized = false;
    }

    /**
     * Inicializa la conexión con el CMS
     */
    async init() {
        try {
            switch (this.provider) {
                case 'firebase':
                    await this.initFirebase();
                    break;
                case 'strapi':
                    await this.initStrapi();
                    break;
                case 'contentful':
                    await this.initContentful();
                    break;
                case 'sanity':
                    await this.initSanity();
                    break;
                default:
                    console.warn('Provider no reconocido, usando modo estático');
            }
            this.initialized = true;
            console.log(`CMS ${this.provider} inicializado correctamente`);
        } catch (error) {
            console.error('Error al inicializar CMS:', error);
            // Fallback a contenido estático
            this.initialized = false;
        }
    }

    /**
     * Inicializa Firebase
     */
    async initFirebase() {
        // Verificar si Firebase está disponible
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase SDK no está cargado');
        }

        // Inicializar Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(this.config.firebaseConfig);
        }

        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
    }

    /**
     * Inicializa Strapi
     */
    async initStrapi() {
        this.apiUrl = this.config.apiUrl || 'http://localhost:1337/api';
        this.apiToken = this.config.apiToken;
    }

    /**
     * Inicializa Contentful
     */
    async initContentful() {
        if (typeof contentful === 'undefined') {
            throw new Error('Contentful SDK no está cargado');
        }
        this.client = contentful.createClient({
            space: this.config.spaceId,
            accessToken: this.config.accessToken
        });
    }

    /**
     * Inicializa Sanity
     */
    async initSanity() {
        if (typeof sanityClient === 'undefined') {
            throw new Error('Sanity SDK no está cargado');
        }
        this.client = sanityClient({
            projectId: this.config.projectId,
            dataset: this.config.dataset,
            useCdn: true
        });
    }

    /**
     * Obtiene contenido del CMS
     */
    async getContent(type, id = null) {
        if (!this.initialized) {
            return this.getStaticContent(type);
        }

        try {
            switch (this.provider) {
                case 'firebase':
                    return await this.getFirebaseContent(type, id);
                case 'strapi':
                    return await this.getStrapiContent(type, id);
                case 'contentful':
                    return await this.getContentfulContent(type, id);
                case 'sanity':
                    return await this.getSanityContent(type, id);
            }
        } catch (error) {
            console.error(`Error al obtener contenido ${type}:`, error);
            return this.getStaticContent(type);
        }
    }

    /**
     * Obtiene contenido de Firebase
     */
    async getFirebaseContent(type, id) {
        const docRef = id 
            ? this.db.collection(type).doc(id)
            : this.db.collection(type);
        
        const snapshot = await docRef.get();
        
        if (id) {
            return snapshot.exists ? snapshot.data() : null;
        } else {
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
    }

    /**
     * Obtiene contenido de Strapi
     */
    async getStrapiContent(type, id) {
        const url = id 
            ? `${this.apiUrl}/${type}/${id}`
            : `${this.apiUrl}/${type}`;
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (this.apiToken) {
            headers['Authorization'] = `Bearer ${this.apiToken}`;
        }

        const response = await fetch(url, { headers });
        const data = await response.json();
        
        return id ? data.data : data.data;
    }

    /**
     * Obtiene contenido de Contentful
     */
    async getContentfulContent(type, id) {
        if (id) {
            const entry = await this.client.getEntry(id);
            return this.transformContentfulEntry(entry);
        } else {
            const entries = await this.client.getEntries({
                content_type: type
            });
            return entries.items.map(item => this.transformContentfulEntry(item));
        }
    }

    /**
     * Obtiene contenido de Sanity
     */
    async getSanityContent(type, id) {
        const query = id
            ? `*[_type == "${type}" && _id == "${id}"][0]`
            : `*[_type == "${type}"]`;
        
        return await this.client.fetch(query);
    }

    /**
     * Transforma entrada de Contentful a formato estándar
     */
    transformContentfulEntry(entry) {
        const fields = entry.fields || entry;
        return {
            id: entry.sys?.id || entry.id,
            ...fields
        };
    }

    /**
     * Contenido estático de fallback
     */
    getStaticContent(type) {
        const staticContent = {
            'services': [
                {
                    id: '1',
                    title: 'Sesiones Psicológicas',
                    description: 'Terapia individual para niños, adolescentes y adultos.',
                    icon: '🧠'
                },
                {
                    id: '2',
                    title: 'Talleres y Cursos',
                    description: 'Talleres especializados para diferentes grupos.',
                    icon: '📚'
                },
                {
                    id: '3',
                    title: 'Servicios Empresariales',
                    description: 'Programas diseñados para empresas.',
                    icon: '💼'
                }
            ],
            'blog': [],
            'testimonials': []
        };

        return staticContent[type] || [];
    }

    /**
     * Guarda contenido en el CMS (requiere autenticación)
     */
    async saveContent(type, data, id = null) {
        if (!this.initialized) {
            throw new Error('CMS no inicializado');
        }

        // Verificar autenticación
        if (!await this.isAuthenticated()) {
            throw new Error('No autenticado');
        }

        try {
            switch (this.provider) {
                case 'firebase':
                    return await this.saveFirebaseContent(type, data, id);
                case 'strapi':
                    return await this.saveStrapiContent(type, data, id);
                default:
                    throw new Error('Guardar contenido no soportado para este provider');
            }
        } catch (error) {
            console.error('Error al guardar contenido:', error);
            throw error;
        }
    }

    /**
     * Guarda contenido en Firebase
     */
    async saveFirebaseContent(type, data, id) {
        if (id) {
            await this.db.collection(type).doc(id).set(data, { merge: true });
            return id;
        } else {
            const docRef = await this.db.collection(type).add(data);
            return docRef.id;
        }
    }

    /**
     * Guarda contenido en Strapi
     */
    async saveStrapiContent(type, data, id) {
        const url = id 
            ? `${this.apiUrl}/${type}/${id}`
            : `${this.apiUrl}/${type}`;
        
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            },
            body: JSON.stringify({ data })
        });

        const result = await response.json();
        return result.data?.id || id;
    }

    /**
     * Verifica si el usuario está autenticado
     */
    async isAuthenticated() {
        if (this.provider === 'firebase' && this.auth) {
            return new Promise((resolve) => {
                this.auth.onAuthStateChanged((user) => {
                    resolve(!!user);
                });
            });
        }
        return false;
    }

    /**
     * Sube una imagen al storage del CMS
     */
    async uploadImage(file, path) {
        if (!this.initialized) {
            throw new Error('CMS no inicializado');
        }

        try {
            switch (this.provider) {
                case 'firebase':
                    return await this.uploadFirebaseImage(file, path);
                case 'strapi':
                    return await this.uploadStrapiImage(file);
                default:
                    throw new Error('Upload de imágenes no soportado');
            }
        } catch (error) {
            console.error('Error al subir imagen:', error);
            throw error;
        }
    }

    /**
     * Sube imagen a Firebase Storage
     */
    async uploadFirebaseImage(file, path) {
        const storageRef = this.storage.ref();
        const fileRef = storageRef.child(`${path}/${file.name}`);
        await fileRef.put(file);
        return await fileRef.getDownloadURL();
    }

    /**
     * Sube imagen a Strapi
     */
    async uploadStrapiImage(file) {
        const formData = new FormData();
        formData.append('files', file);

        const response = await fetch(`${this.apiUrl}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiToken}`
            },
            body: formData
        });

        const data = await response.json();
        return data[0]?.url;
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CMSIntegration;
} else {
    window.CMSIntegration = CMSIntegration;
}

