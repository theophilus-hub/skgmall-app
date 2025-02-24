import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import { useEffect, useMemo } from 'react';

import GlobalProvider from '../context/GlobalProvider';
import { EditProvider } from 'context/editContext';
import SettingsContextProvider from 'context/settingsContext';
import MultiProvider from 'context/multiprovider';
import { Provider as PaperProvider } from "react-native-paper";
import { Platform } from 'react-native';
import StoresContextProvider from 'context/shopsProvider';
SplashScreen.preventAutoHideAsync();


const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Odin": require("../assets/fonts/Odin-Bold.otf"),
        "Inter": require("../assets/fonts/Inter Regular.ttf")
    })

    useEffect(() => {
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])


    if (!fontsLoaded && !error) return null;

    const statusConfig: { style?: "dark", bgColor?: string } = Platform.OS === "android" ? { style: "dark", bgColor: "white" } : {};

    return (
        <PaperProvider>
            <MultiProvider providers={[GlobalProvider, SettingsContextProvider, StoresContextProvider, EditProvider]}>
                <Stack screenOptions={{  statusBarStyle: statusConfig.style, statusBarBackgroundColor: statusConfig.bgColor }}>
                    <Stack.Screen name='index' options={{ headerShown: false }} />
                    <Stack.Screen name='welcome' options={{ headerShown: false }} />
                    <Stack.Screen name='(auth)' options={{ headerShown: false, }} />
                    <Stack.Screen name='(tabs)' options={{ headerShown: false}} />
                     <Stack.Screen name='notifications' options={{ headerShown: false }} />
                    <Stack.Screen name='store' options={{ headerShown: false }} />
                    <Stack.Screen name='profile' options={{ headerShown: false }} />
                </Stack>
            </MultiProvider>
        </PaperProvider>

    );
}

export default RootLayout

