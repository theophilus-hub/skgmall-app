import { Stack } from "expo-router";
import { Try } from "expo-router/build/views/Try";
import { createContext, useState, useEffect, Children, useContext } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);


    useEffect(() => {

    }, [])


    const signIn = async (email, password) => {
        try {

        } catch (e) {

        }
    }

    const logout = async () => {
        try {

        } catch (e) {

        }
    }

    const signUp = async (email, password,) => {
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