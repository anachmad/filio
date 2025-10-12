import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';

interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const bootstrapAsync = async () => {
            let token = null;
            try {
                token = await AsyncStorage.getItem('authToken');
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                console.error('Failed to load token', error);
            }
            setUserToken(token);
            setIsLoading(false);
        };
        bootstrapAsync();   
    }, []);

    const signIn = async (token: string) => {
        try {
            await AsyncStorage.setItem('authToken', token); 
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUserToken(token);
        } catch (error) {
            console.error('Failed to sign in', error);
        }
    };

    const signOut = async () => {
        
            await AsyncStorage.removeItem('authToken');
            delete apiClient.defaults.headers.common['Authorization'];
            setUserToken(null);
        
    };

    return (
        <AuthContext.Provider value={{ userToken, isLoading, signIn, signOut }}>
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
