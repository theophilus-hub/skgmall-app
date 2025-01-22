import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import { useEffect } from 'react';

import GlobalProvider from '../context/GlobalProvider';
import SettingsContextProvider from 'context/settingsContext';
import MultiProvider from 'context/multiprovider';
import { Provider as PaperProvider } from "react-native-paper";
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

    return (
        <PaperProvider>

            <MultiProvider providers={[GlobalProvider, SettingsContextProvider]}>
                <Stack>
                    <Stack.Screen name='index' options={{ headerShown: false }} />
                    <Stack.Screen name='welcome' options={{ headerShown: false }} />
                    <Stack.Screen name='store/[id]' options={{ headerShown: false }} />
                    <Stack.Screen name='(auth)' options={{ headerShown: false, }} />
                    <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                </Stack>
            </MultiProvider>

        </PaperProvider>

    );
}

export default RootLayout

