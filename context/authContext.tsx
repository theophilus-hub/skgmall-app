import { User } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { Try } from "expo-router/build/views/Try";
import React, { createContext, useState, useEffect, Children, useContext, PropsWithChildren } from "react";

interface AuthState{
    isAuthenticated: boolean
    user?: User
}

export interface AuthContextType extends AuthState {
    signIn: (email: string, password: string) => Promise<void>,
    signUp: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType| undefined>(undefined);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


    useEffect(() => {

    }, [])


    const signIn = async (email: string, password: string) => {
        try {

        } catch (e) {

        }
    }

    const logout = async () => {
        try {

        } catch (e) {

        }
    }

    const signUp = async (email: string, password: string) => {
        try {

        } catch (e) {

        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must b wrapped inside AuthContextProvider');
    }
    return value;
}