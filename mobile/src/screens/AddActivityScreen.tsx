import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FITRAH_CATEGORIES, Fitrah } from '../constants/fitrah';

const AddActivityScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const { childId, childName } = route.params;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFitrahs, setSelectedFitrahs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleFitrahSelection = (fitrahId: string) => {
        setSelectedFitrahs((prevSelected) => prevSelected.includes(fitrahId) ? prevSelected.filter((id) => id !== fitrahId) : [...prevSelected, fitrahId]);
    };

    const handleSaveActivity = async () => {

        // Mengecek validasi data yang diinput
        if(!title || selectedFitrahs.length === 0) {
            Alert.alert('Error', 'Judul dan minimal 1 jenis fitrah harus diisi.')
            return;
        }

        // Menampilkan data yang diinput, untuk sementara sebelum implementasi API
        Alert.alert(
            'Data Aktivitas',
            `Judul ${title}\nDeskripsi : ${description}\nFitrah : ${selectedFitrahs.join(', ')}`
        );

        navigation.goBack();
    };

    return(
        <ScrollView style = { styles.container }>
            <Text style = { styles.header }>Aktivitas Baru untuk { childName }</Text>

            <Text style = { styles.label }>Judul Kegiatan</Text>
            <TextInput
                style = { styles.input }
                placeholder = 'Contoh : Membaca buku bersama ayah'
                value = { title }
                onChangeText = { setTitle }
            />

            <Text style = { styles.label }>Deskripsi Kegiatan (Opsional)</Text>
            <TextInput
                style = { [styles.input, styles.textArea] }
                placeholder = 'Ceritakan lebih detail tentang kegiatan ini'
                value = { description }
                onChangeText = { setDescription }
                multiline
            />

            <Text style = { styles.label }>Stimulasi fitrah (pilih minimal 1)</Text>
            <View style = { styles.fitrahContainer }>
                {FITRAH_CATEGORIES.map((fitrah) => (
                    <TouchableOpacity 
                        key={fitrah.id}
                        style = {[
                            styles.fitrahChip,
                            selectedFitrahs.includes(fitrah.id) && styles.fitrahChipSelected,
                        ]}
                        onPress={() => toggleFitrahSelection(fitrah.id)}
                    >
                        <Text style = {[
                            styles.fitrahText,
                            selectedFitrahs.includes(fitrah.id) && styles.fitrahTextSelected,
                            ]}
                        >
                            {fitrah.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Button
                title = { loading ? 'Menyimpan...' : 'Simpan Aktivitas' }
                onPress = { handleSaveActivity }
                disabled = { loading }
            />
            
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
        padding: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    fitrahContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        justifyContent: 'space-between',  
    },
    fitrahChip: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 20,
        margin: 5,
    },
    fitrahChipSelected: {
        backgroundColor: '#007bff',
        borderColor: '#0056b3',
        borderWidth: 1,
    },
    fitrahText: {
        color: '#000',
    },
    fitrahTextSelected: {
        color: '#fff',
    },
});

export default AddActivityScreen;
