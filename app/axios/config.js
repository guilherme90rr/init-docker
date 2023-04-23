import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000, // tempo limite padrão de 5 segundos
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
