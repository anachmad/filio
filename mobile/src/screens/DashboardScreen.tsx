import React from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = ({ navigation }: { navigation: any }) => {

    const handleLogout = async () => {

        // Menghapus auth token dari async storage
        await AsyncStorage.removeItem('authToken');

        Alert.alert('Logout', 'Anda telah berhasil logout.');

    }
    return (
        <View style = {styles.container}>
            <Text>Dashboard Screen</Text>
            <Button 
                title = 'Logout' 
                onPress = { handleLogout }
                color = 'red'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DashboardScreen;