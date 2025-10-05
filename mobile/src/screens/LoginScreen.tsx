import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native'

const LoginScreen = ({ navigation }: { navigation: any }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        Alert.alert('Login Info', `Email: ${email}, Password: ${password}`);
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

            <Button title = 'Login' onPress={handleLogin}/>

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