import { Stack, useLocalSearchParams } from 'expo-router';

export default () => {
    return (
        <Stack>
            <Stack.Screen name='[id]' options={{ headerShown: false }} />
            <Stack.Screen name='food' options={{ headerShown: false }}/>
        </Stack>
    );
}