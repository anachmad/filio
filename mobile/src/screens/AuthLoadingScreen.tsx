import React from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// Menampilkan spinner loading
const AuthLoadingScreen = () => {
    return (
        <View style = { styles.container }>
            <ActivityIndicator size = "large" />

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

export default AuthLoadingScreen;