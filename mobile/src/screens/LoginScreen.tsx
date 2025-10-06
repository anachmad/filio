import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import apiClient from '../api/client';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Mem-validasi input
        if (!email || !password) {
            Alert.alert('Error', 'Email dan Password harus diisi.');
            return;
        }

        // Memulai loading
        setLoading(true);
        try {
            // Mengirim request ke backend server
            const response = await apiClient.post('auth/login', {
                email: email,
                password: password,
            });

            // Jika sukses, API akan mengirim token
            const token = response.data.token;
            console.log('Login berhasil, token: ', token);

            // TODO : simpan token ke asyncstorage

            // Mengirim notifikasi pada layar dan navigasi ke dasboard screen
            Alert.alert('Sukses', 'Anda telah berhasil login!');
            navigation.navigate('Dashboard');

        } catch(error: any) {
            // Menampilkan pesan error dari server
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada jaringan';
            Alert.alert('Login Gagal', errorMessage);
            console.error(error);

        } finally {
            // Loading selesai, state Loading diubah menjadi False
            setLoading(false);
        }


    }

    const handleNavigateToRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Selamat Datang Kembali</Text>

            <TextInput
                style = {styles.input}
                placeholder = 'Email'
                value = {email}
                onChangeText = {setEmail}
                keyboardType = 'email-address'
                autoCapitalize = 'none'
            />

            <TextInput
                style = {styles.input}
                placeholder = 'Password'
                value = {password}
                onChangeText = {setPassword}
                secureTextEntry
            />

            <Button 
                title = {loading ? 'Loading...' : 'Login'} 
                onPress = {handleLogin}
                disabled = {loading}
            />

            <TouchableOpacity onPress={handleNavigateToRegister}>
                <Text style = {styles.linkText}>
                    Belum punya akun? Daftar di sini
                </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    linkText: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default LoginScreen;