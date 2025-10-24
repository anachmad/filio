import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://192.168.0.3:3000/api',
});

export default apiClient;