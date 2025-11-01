import React, { act, use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import apiClient from '../api/client';

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
        <View style = { styles.activityCard }>
            <Text style = { styles.activityTitle }>{item.title}</Text>
            { item.description && <Text style = { styles.activityDescription }>{item.description}</Text>}
            <Text style = { styles.activityDate }>{item.activityDate}</Text>
            <View style = { styles.tagContainer }>
                {item.fitrahTags.map((tag) => (
                    <View key={tag.name} style = { styles.tagChip }>
                        <Text style={styles.tagText}>{tag.name}</Text>
                    </View>
                ))}
            </View>
        </View>
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
    activityCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41, // Untuk iOS
        shadowColor: '#000', // Untuk iOS
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    activityDescription: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,   
    },
    activityDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    tagChip: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 5,
        marginBottom: 5,
    },
    tagText: {
        fontSize: 12,
        color: '#333',
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

