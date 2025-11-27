import axios from 'axios';

// 1. Crear una instancia de Axios con la URL base de tu Spring Boot
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Asegúrate que este puerto sea el de tu Backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Configurar el Interceptor (La "magia" de la sesión)
// Antes de que salga cualquier petición, revisa si hay un token guardado
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Recuperamos el token del navegador
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Lo pegamos en el encabezado
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;