import React, { act, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';

const ChildDetailScreen = ({ route }: {route: any}) => {

    // Mengambil childId dan childName dari parameter route yang dikirim
    const { childId, childName } = route.params;

    // Mengambil data detail anak dari API, akan diimplementasikan nanti

    return(
        <View style = { styles.container }>
            <Text style = { styles.title}>Profil { childName }</Text>
            <Text>Ini adalah halaman detail untuk anak dengan nama { childName } dan id { childId } </Text>

            <Button
                title = 'Tambah Aktivitas Baru'
                onPress = {() => {
                    // Navigasi ke AddActivityScreen dengan parameter childId dan childName
                    route.navigation.navigate('AddActivity', { childId, childName });
                }}
            />

            <Text style = { styles.activityHeader }>Riwayat Aktivitas</Text>
            <Text>Belum ada aktivitas yang ditambahkan.</Text>
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
        marginTop: 30,
        marginBottom: 10,
    },
});

export default ChildDetailScreen;

