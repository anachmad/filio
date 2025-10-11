import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Button, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '../api/client';

const AddChildScreen = ({ navigation } : { navigation : any }) => {

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const onChangeDate = (event: any, selectedDate? : Date) => {

        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(false);
        setDateOfBirth(currentDate);
    };

    const handleAddChild = async () => {
        
        if (!name) {
            Alert.alert('Error', 'Nama anak harus diisi.');
            return;
        }

        setLoading(true);

        try {
            // Mengubah format tanggal menjadi YYYY-MM-DD
            const formattedDate = dateOfBirth.toISOString().split('T')[0];

            await apiClient.post('/children', {
                name,
                dateOfBirth: formattedDate,
            });

            Alert.alert('Sukses', 'Profil Anak telah ditambahkan.');
            navigation.goBack();

        } catch (error) {
            console.error('Gagal menambahkan profil anak.', error);
            Alert.alert('Error', 'Gagal menyimpan profil anak. Silakan coba lagi!')

        } finally {
            setLoading(false);
        }
    };

    return (
        <View style = { styles.container }>
            <Text style = { styles.label }>Nama Anak</Text>
            <TextInput 
                style = { styles.input}
                placeholder = 'Masukkan nama lengkap anak'
                value = { name }
                onChangeText = { setName }
            />

            <Text style = { styles.label }>Tanggal Lahir</Text>
            <Button 
                onPress = {() => setShowDatePicker(true) }
                title = 'Pilih tanggal'
            />

            { showDatePicker && (
                <DateTimePicker
                    testID = 'dateTimePicker'
                    value = { dateOfBirth }
                    mode = 'date'
                    display = 'default'
                    onChange = { onChangeDate }
                />
            )} 

            <View style={styles.buttonContainer}>
                <Button 
                    title = { loading ? 'Menyimpan...' : 'Simpan'}
                    onPress ={ handleAddChild }
                    disabled = { loading }    
                />
            </View>
        </View>        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20.
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 20.
    }
});

export default AddChildScreen;