import React, { createContext, useState, useEffect, Children, useContext, PropsWithChildren, useCallback, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "react-native";
import { Credentials, Theme, ThemeMode } from "./models";

const LightTheme: Theme = {
    primary: '#EA0001',
    primaryVariant: '#EA1111',
    onPrimary: 'white',
    secondary: '#EC5300',
    secondaryVariant: '#EF6310',
    onSecondary: "white",
    surface: "wheatWhite",
    surfaceLow: "white",
    surfaceHigh: "lightGrey",
    onSurface: "grey"
}

const DarkTheme: Theme = {
    primary: '#EA0001',
    primaryVariant: '#EA1111',
    onPrimary: 'white',
    secondary: '#EC5300',
    secondaryVariant: '#EF6310',
    onSecondary: "white",
    surface: "#001208",
    surfaceLow: "#000000",
    surfaceHigh: "#122345",
    onSurface: "white"
}

interface SettingsState{
    themeMode: ThemeMode, 
    autoLogin: boolean,
    credentials?: Credentials
}

export interface SettingsContextType extends Partial<SettingsState> {
    loading: boolean,
    firstVisit?: boolean,
    theme: Theme,
    toggleAutoLogin: CallableFunction,
    setThemeMode: (value: ThemeMode) => void,
    setCredentials: (credentials: Credentials) => void,
}

export const SettingsContext = createContext<SettingsContextType| undefined>(undefined);
export const useSettings = () => {
    const value = useContext(SettingsContext);

    if (!value) {
        throw new Error('useSettings must be wrapped inside SettingsContextProvider');
    }
    return value;
}

const SettingsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<SettingsState>();
    const [loadingState, setLoadingState] = useState<{ loading: boolean, firstVisit?: boolean }>({ loading: true });
    const scheme = useColorScheme();

    const save = async () => {
        try {
            const jsonValue = JSON.stringify(state);
            await AsyncStorage.setItem('settings', jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    const load = async (): Promise<SettingsState| undefined> => {
        try {
            const jsonValue = await AsyncStorage.getItem('settings');
            return jsonValue !== null ? JSON.parse(jsonValue) : undefined;
        } catch (e) {
            console.error(e);
        }
    };

    const init = useCallback(async()=>{
        if(!state){
            load().then((savedState)=>{
                console.log(JSON.stringify(savedState));
                if(savedState){
                    setState(savedState);
                    setLoadingState({ loading: false, firstVisit: false });
                }else{
                    setState({ themeMode: "auto", autoLogin: true });
                    setLoadingState({ loading: false, firstVisit: true });
                }
            });
        }
    }, [state]);

    useEffect(()=> {
        init();
        if(state){ save(); }
    }, [ state, init ]);

    const theme = useMemo(()=>{
        if(state?.themeMode === "dark"){
            return DarkTheme;
        }else if(state?.themeMode === "light"){
            return LightTheme;
        }
        return scheme === "light" ? LightTheme : DarkTheme;
    }, [state?.themeMode]);

    const toggleAutoLogin = () =>{
        if(state){
            setState({ ...state, autoLogin: state?.autoLogin! });
        }
    }
    const setThemeMode = (value: ThemeMode) => {
        if(state){
            setState({ ...state, themeMode: value });
        }
    }

    const setCredentials = (credentials: Credentials) => {
        if(state){
            setState({ ...state, credentials });
        }
    }

    return (
        <SettingsContext.Provider value={{ ...state, ...loadingState, theme, setCredentials, toggleAutoLogin, setThemeMode }}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;