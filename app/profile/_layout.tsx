import { Stack } from 'expo-router';
import { Platform } from 'react-native';


const RootLayout = () => {
    const statusConfig: { style?: "dark", bgColor?: string } = Platform.OS === "android" ? { style: "dark", bgColor: "white" } : {};

    return (
        <Stack screenOptions={{  statusBarStyle: statusConfig.style, statusBarBackgroundColor: statusConfig.bgColor }}>
            <Stack.Screen name='info' options={{ headerShown: false }} />
            <Stack.Screen name='address' options={{ headerShown: false }} />
            <Stack.Screen name='payment' options={{ headerShown: false }} />
            <Stack.Screen name='support' options={{ headerShown: false }} />
            <Stack.Screen name='settings' options={{ headerShown: false }} />
            <Stack.Screen name='terms' options={{ headerShown: false }} />
            <Stack.Screen name='privacy' options={{ headerShown: false }} />

        </Stack>
    );
}

export default RootLayout