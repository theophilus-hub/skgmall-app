import { View, Text, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/SKG2b.png'

const SplashScreen = () => {
  return (
    <View className='w-full h-[95vh] items-center justify-center'>
      <Image 
        source={Logo}
        className=' h-14'
        resizeMode='contain'
      />
    </View>
  )
}

export default SplashScreen