import { StyleSheet, Text, View } from 'react-native'
import {Slot, SplashScreen, Stack, useSegments, router} from 'expo-router';
import {useFonts} from 'expo-font'
import { useEffect, useState } from 'react';
import supabase from '@supabase/supabase-js';
import {getUser, clientSession} from '../lib/supabase'

import GlobalProvider from '../context/GlobalProvider'

SplashScreen.preventAutoHideAsync();


const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
      "Odin" : require("../assets/fonts/Odin-Bold.otf"),
      "Inter" : require("../assets/fonts/Inter Regular.ttf")
  })

  useEffect(() => {
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])


  if(!fontsLoaded && !error) return null;



  return (
    <GlobalProvider>
        <Stack>
            <Stack.Screen name='index' options={{headerShown: false}} />
            <Stack.Screen name='(auth)' options={{headerShown: false}} />
            <Stack.Screen name='(tabs)' options={{headerShown: false}} />
      </Stack> 
    </GlobalProvider>
  )




 
}

export default RootLayout

