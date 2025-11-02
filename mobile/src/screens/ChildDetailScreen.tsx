import React, { act, use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import apiClient from '../api/client';
import ActivityCard from '../components/ActivityCard';

type FitrahTag = {
    name: string;
};

type Activity = {
    id: string;
    title: string;
    description: string | null;
    activityDate: string;
    fitrahTags: FitrahTag[];
};

const ChildDetailScreen = ({ route, navigation }: {route: any; navigation: any}) => {

    // Mengambil childId dan childName dari parameter route yang dikirim
    const { childId, childName } = route.params;

    // State untuk menyimpan data aktivitas
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Mengambil data detail anak dari API
    const fetchActivities = async () => {
        try {
            setLoading(true);
            // Mengambil data aktivitas dari API berdasarkan childId
            const response = await apiClient.get(`/activities/child/${childId}`);
            setActivities(response.data);
        } catch (error) {
            console.error('Gagal mengambil aktivitas:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            // Mengambil data aktivitas setiap kali layar ini difokuskan
            fetchActivities();
        }, [childId])
    );

    const renderActivityItem = ({ item }: { item: Activity }) => (
        <ActivityCard activity={item} />
    );

    return(
        <View style = { styles.container }>
            <Text style = { styles.title}>Profil { childName }</Text>

            <Button
                title = 'Tambah Aktivitas Baru'
                onPress = {() => {
                    // Navigasi ke AddActivityScreen dengan parameter childId dan childName
                    navigation.navigate('AddActivity', { childId, childName });
                }}
            />

            <Text style = { styles.activityHeader }>Riwayat Aktivitas</Text>

            {loading ? (
                <ActivityIndicator size = "large" color = "#0000ff" />
            ) : (
                <FlatList
                    data = { activities }
                    renderItem = { renderActivityItem }
                    keyExtractor = {(item) => item.id}
                    style = { styles.list }
                    ListEmptyComponent={
                        <Text style = { styles.emptyText }>Belum ada aktivitas yang dicatat.</Text>
                    }
                />
            )}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    activityHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    list: {
        flex: 1,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontStyle: 'italic',
        marginTop: 20,
    },
});

export default ChildDetailScreen;

