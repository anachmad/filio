import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import AddChildScreen from './src/screens/AddChildScreen';
import ChildDetailScreen from './src/screens/ChildDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  // Melacak status loading awal dan auth token
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  // Memeriksa auth token di async storage dan memperbarui state
  useEffect(() => {
      const bootstrapAsync = async () => {
        let token = null;

        try {
          token = await AsyncStorage.getItem('authToken');
        
        } catch (error) {
          console.error('Gagal mengambil token', error);
        }

        setUserToken(token);
        setIsLoading(false);
      };

      bootstrapAsync();

  }, []);

  // Menampilkan screen Loading jika masih dalam proses loading
  if (isLoading) {
    return <AuthLoadingScreen />
  }

  return (
      <NavigationContainer>
          <Stack.Navigator>
            { userToken == null ? (
              <>
                <Stack.Screen
                  name = 'Login'
                  component = { LoginScreen }
                  options = {{ headerShown: false }}
                  />

                <Stack.Screen
                  name = 'Register'
                  component = { RegisterScreen }
                  options = {{ title: 'Daftar akun baru' }}
                  />
              </>
            ) : (
              // Menampilkan screen Dashboard jika token ada
              <>
                <Stack.Screen 
                  name = 'Dashboard'
                  component = { DashboardScreen }
                />

                <Stack.Screen
                  name = 'AddChild'
                  component = { AddChildScreen }
                  options = {{ title : 'Tambah Profil Anak '}}
                />

                <Stack.Screen
                  name = 'ChildDetail'
                  component = { ChildDetailScreen }
                  options = {{ title: 'Profil Anak' }}
                />
              </>
            )}

          </Stack.Navigator>
      </NavigationContainer>
  );
}