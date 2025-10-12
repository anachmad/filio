import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from './src/context/AuthContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import AddChildScreen from './src/screens/AddChildScreen';
import ChildDetailScreen from './src/screens/ChildDetailScreen';
import AddActivityScreen from './src/screens/AddActivityScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken, isLoading } = useAuth();

  //  Menampilkan screen Loading jika masih dalam proses loading
  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <Stack.Navigator>
      {userToken == null ? (
        <>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ title: 'Daftar akun baru' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Dashboard'
            component={DashboardScreen}
          />
          <Stack.Screen
            name='AddChild'
            component={AddChildScreen}
            options={{ title: 'Tambah Profil Anak' }}
          />
          <Stack.Screen
            name='ChildDetail'
            component={ChildDetailScreen}
            options={{ title: 'Profil Anak' }}
          />
          <Stack.Screen
            name='AddActivity'
            component={AddActivityScreen}
            options={{ title: 'Tambah Aktivitas Baru' }}
          />
        </>
      )}
    </Stack.Navigator>  
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};