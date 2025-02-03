import { Stack } from 'expo-router';
import { Platform } from 'react-native';


const RootLayout = () => {
    const statusConfig: { style?: "dark", bgColor?: string } = Platform.OS === "android" ? { style: "dark", bgColor: "white" } : {};

    return (
        <Stack screenOptions={{  statusBarStyle: statusConfig.style, statusBarBackgroundColor: statusConfig.bgColor }}>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='[id]' options={{ headerShown: false }} />
        </Stack>
    );
}

export default RootLayout