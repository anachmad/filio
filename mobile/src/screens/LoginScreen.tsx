import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    // Menggunakan context Auth untuk mendapatkan fungsi signIn
    // dan state yang diperlukan untuk login
    const { signIn } = useAuth();

    // State untuk menyimpan input email, password, dan loading state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Fungsi untuk handle login
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

            // Mendapatkan user dan token dari response            
            const { user, token } = response.data;

            // Mengirim data user dan token ke fungsi signIn dari AuthContext
            // untuk menyimpan state user dan token.
            // Fungsi signIn ini akan mengubah state user dan token di AuthContext
            // Setiap perubahan pada state ini akan memicu AppNavigator untuk re-render
            // dan menampilkan screen yang sesuai.
            // Dengan begitu, user akan diarahkan ke Dashboard Screen setelah login sukses.
            await signIn(user, token);

            Alert.alert('Login Sukses', `Selamat datang kembali, ${user.fullName}!`);
            
        } catch(error: any) {
            // Menampilkan pesan error dari server
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada jaringan';
            Alert.alert('Login Gagal', errorMessage);
            console.error(error);

        } finally {
            // Mengubah state Loading menjadi False setelah proses login selesai
            setLoading(false);
        }

    }

    // Fungsi untuk berpindah screen ke Register Screen
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