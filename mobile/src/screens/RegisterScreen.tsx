import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native'

const RegisterScreen = ({ navigation }: { navigation: any }) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        Alert.alert('Register info', `Nama Lengkap : ${fullName}, Email : ${email}`);
    }

    const handleNavigateToLogin = () => {
        navigation.navigate('Login');
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
                title = 'Register'
                onPress = {handleRegister}
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
});

export default RegisterScreen;