import axios from 'axios';
import { Alert } from 'react-native';

const apiClient = axios.create({
    baseURL: 'http://192.168.0.3:3000/api',
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