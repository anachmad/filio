import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';

export interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (user: User, token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const bootstrapAsync = async () => {
            let token = null;
            let storedUserString = null;
            try {
                token = await AsyncStorage.getItem('authToken');
                storedUserString = await AsyncStorage.getItem('user');

                if (storedUserString && token) {
                    const storedUser = JSON.parse(storedUserString);
                    setUser(storedUser);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Failed to load token', error);
            } finally {
                setIsLoading(false);
            }
        };
        bootstrapAsync();   
    }, []);

    const signIn = async (userData: User, token: string) => {
         
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
        
        await AsyncStorage.setItem('authToken', token); 
        await AsyncStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);    

        console.log('User signed in:', userData);

    };

    const signOut = async () => {
        
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('user');
            delete apiClient.defaults.headers.common['Authorization'];
            setUser(null);
            console.log('User signed out.');
        
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
