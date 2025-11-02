import axios from 'axios';
import { Alert } from 'react-native';

const DEV_BASE_URL = 'http://192.168.0.3:3000/api';
const PROD_BASE_URL = 'https://filio-backend-909558761445.asia-southeast1.run.app/api';

const isDevelopment = __DEV__;

const baseURL = isDevelopment ? DEV_BASE_URL : PROD_BASE_URL;

console.log(`API client initialized for ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}`);
console.log(`Connecting to: ${baseURL}`);

const apiClient = axios.create({
    baseURL: baseURL,
});

// Interceptor to handle responses
apiClient.interceptors.request.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            Alert.alert('Koneksi Gagal', 'Tidak dapat terhubung ke server. Pastikan Anda terhubung ke internet.');
    } else {
        if (error.response.status >= 500) {
            Alert.alert('Kesalahan Server', 'Terjadi kesalahan pada server. Silakan coba lagi nanti.');
        }
    }
        return Promise.reject(error);
    }
);

export default apiClient;