import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';

// Mendefiniskan tipe data untuk child
type Child = {
    id: string,
    name: string,
    dateOfBirth: string,
}

const DashboardScreen = ({ navigation }: { navigation: any }) => {

    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);

    // Fungsi mengambil daftar anak
    const fetchChildren = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');

            if(token) {
                const response = await apiClient.get('/children');
                setChildren(response.data);
            }

        } catch(error) {
            console.error('Gagal mengambil data anak:', error);

        } finally {
            setLoading(false);
        }
    }

    // Mengambil daftar anak saat pertama kali screen dibuka
    useEffect(() => {
        fetchChildren();
    }, [] );

    // Fungsi handle logout
    const handleLogout = async () => {

        // Menghapus auth token dari async storage
        await AsyncStorage.removeItem('authToken');

        Alert.alert('Logout', 'Anda telah berhasil logout.');

    }

    if(loading) {
        return <ActivityIndicator size='large' style={styles.container} />;
    }
        
    return (
        <View style = {styles.container}>
            {
                children.length > 0 ? (
                    <FlatList
                        data={children}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Text style={ styles.childItem }>{ item.name }</Text>}
                        ListHeaderComponent={ <Text style={ styles.title }>Anak Anda</Text> }
                    />
                ) : (
                    <Text>Anda belum memiliki profil anak.</Text>
                )    
            }

            <Button 
                title="Tambah Anak"
                onPress={() => {}} /* Navigasi ke screen tambah anak akan ditambahkan nanti */
            />
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    childItem: {
        fontSize: 18,
        padding: 10,
    }
});

export default DashboardScreen;