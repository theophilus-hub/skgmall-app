import { StyleSheet, Text, View } from 'react-native'
import {SplashScreen, Stack, Tabs, Redirect} from 'expo-router';
import {useFonts} from 'expo-font'

const AuthLayout = () => {

  const [fontsLoaded, error] = useFonts({
        "Odin" : require("../../assets/fonts/Odin-Bold.otf"),
        "Inter" : require("../../assets/fonts/Inter Regular.ttf")
    })

return (
  <Stack>
      <Stack.Screen name='signin' options={{headerShown: false}} />
      <Stack.Screen name='signup' options={{headerShown: false}} />
      <Stack.Screen name='profile' options={{headerShown: false}} />
  </Stack>
)
}

export default AuthLayout