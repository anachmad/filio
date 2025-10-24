import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Alert, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView }from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

// Mendefiniskan tipe data untuk child
type Child = {
    id: string,
    name: string,
    dateOfBirth: string,
}

const DashboardScreen = ({ navigation }: { navigation: any }) => {

    const [children, setChildren] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, signOut } = useAuth();

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

    // Mengambil daftar anak setiap kali Dashboard Screen menjadi fokus
    useFocusEffect(
        React.useCallback(() => {
            console.log('Dashboard screen is getting focus, fetching children data ... ');
            setLoading(true);
            fetchChildren();
        }, [])
    );

    // Fungsi handle logout
    const handleLogout = async () => {

        // Menggunakan fungsi signOut dari AuthContext
        await signOut(); 
        
        // Menampilkan informasi telah logout
        Alert.alert('Logout', 'Anda telah berhasil logout.');
    }

    if(loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size='large' />
            </SafeAreaView>
        );
    }
        
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.title}>Selamat Datang {user?.fullName}</Text>
            {
                children.length > 0 ? (
                    <FlatList
                        data={children}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style = { styles.childItemContainer }
                                onPress = {() => navigation.navigate('ChildDetail', {
                                    childId: item.id,
                                    childName: item.name,
                                })}
                            >
                                <Text style = { styles.childItemText }>{ item.name }</Text>
                            </TouchableOpacity>
                        )}
                        ListHeaderComponent={ <Text style={ styles.title }>Pilih profil Anak</Text> }
                    />
                ) : (
                    <View style = { styles.emptyContainer }>
                        <Text>Anda belum memiliki profil anak.</Text>
                    </View>
                )
            }
            <View style = { styles.buttonContainer}>

                <Button 
                    title="Tambah Anak"
                    onPress={() => navigation.navigate('AddChild')}
                />
            
                <View style = { styles.buttonSpacer } />

                <Button 
                    title = 'Logout' 
                    onPress = { handleLogout }
                    color = 'red'
                />


            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 16,
        alignItems: 'center',
        textAlign: 'center',
    },
    childItemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 5,
    },
    childItemText: {
        fontSize: 18,
    },
    childItem: {
        fontSize: 18,
        padding: 5,
    },
    buttonContainer: {
        marginTop: 10,
    },
    buttonSpacer: {
        height: 10,
    }

});

export default DashboardScreen;