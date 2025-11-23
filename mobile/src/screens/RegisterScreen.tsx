import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Komponen RegisterScreen untuk menangani pendaftaran user baru
// Menggunakan useState untuk mengelola state input form
// Menggunakan apiClient untuk berkomunikasi dengan backend server
const RegisterScreen = ({ navigation }: { navigation: any }) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { signIn } = useAuth();

    const handleRegister = async () => {
        // Memvalidasi input
        if (!fullName || !email || !password || !familyName) {
            Alert.alert('Error', 'Semua field harus terisi.');
            return;
        }

        setLoading(true);

        // Menyimpan data user dan berpindah ke screen Dashboard
        try {
            const response = await apiClient.post('/auth/register', {
                fullName,
                email,
                password,
                familyName
            });

            const { user, token } = response.data;

            // Mengirim data user dan token ke fungsi signIn dari AuthContext
            // untuk menyimpan state user dan token
            await signIn(user, token);

            Alert.alert('Register sukses', `Nama Lengkap : ${fullName}, Email : ${email}`);

        } catch(error: any) {
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan jaringan.';
            Alert.alert('Registrasi gagal', errorMessage);
            console.error(error);

        } finally {
            setLoading(false);
        }

    };

    const handleNavigateToLogin = () => {
        navigation.navigate('Login');
    };

    const toogleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Buat Akun Baru</Text>

            <TextInput 
                style = {styles.input}
                placeholder = 'Nama Lengkap'
                value = {fullName}
                onChangeText = {setFullName}
                autoCapitalize = 'words' 
            />

            <TextInput 
                style = {styles.input}
                placeholder = 'Nama Keluarga'
                value = {familyName}
                onChangeText = {setFamilyName}
                autoCapitalize = 'words' 
            />

            <TextInput 
                style = {styles.input}
                placeholder = 'Email'
                value = {email}
                onChangeText = {setEmail}
                keyboardType = 'email-address'
                autoCapitalize = 'none' 
            />

            <View style = {styles.passwordContainer}>
                <TextInput 
                    style = {styles.inputPassword}
                    placeholder = 'Password'
                    value = {password}
                    onChangeText = {setPassword}
                    secureTextEntry = {!showPassword}
                />

                <MaterialCommunityIcons
                    style = {styles.icon}
                    name = {showPassword ? 'eye-off' : 'eye'}
                    size = {25}
                    onPress = {toogleShowPassword}
                />

            </View>

            <Button 
                title = { loading ? 'Mendaftar ...' : 'Register' }
                onPress = {handleRegister}
                disabled = { loading }
            />

            <TouchableOpacity onPress = {handleNavigateToLogin}>
                <Text style = {styles.linkText}> Sudah punya akun? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        height: 40,
        borderColor: 'grey',
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
        flex: 0.1,
    },
    inputPassword: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 8,
        flex: 0.9,
    }
});

export default RegisterScreen;