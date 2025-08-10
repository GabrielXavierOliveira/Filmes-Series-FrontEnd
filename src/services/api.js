import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', //URL base da API
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); //Verifica se usuário tem token de login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; //Adiciona o token a todas as requições
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;