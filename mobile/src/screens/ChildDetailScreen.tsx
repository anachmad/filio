import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const ChildDetailScreen = ({ route }: {route: any}) => {

    // Mengambil childId dari parameter route yang dikirim
    const { childId, childName } = route.params;

    // Mengambil data detail anak dari API, akan diimplementasikan nanti

    return(
        <View style = { styles.container }>
            <Text style = { styles.title}>Profil { childName }</Text>
            <Text>Ini adalah halaman detail untuk anak dengan nama { childName } dan id { childId } </Text>
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
});

export default ChildDetailScreen;

