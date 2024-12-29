import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import StoreImage from '../assets/images/tabs/mall/res/bustling/front.jpg'
import { router } from 'expo-router'

const SmallStoreCard = ({promo, closed, icon, name, openT, closeT}) => {
  return (
    <TouchableOpacity className='my-2 mx-4 p-3 ' activeOpacity={0.8} onPress={() => router.push('/')}>
      <View className='bg-notwhite w-[227] h-[160] rounded-[10px] overflow-hidden'>
        <Image 
          source={{uri: icon}}
          className='w-[227] h-[160] '
          resizeMode='cover'
        />
      </View>
      <View className='w-[227]'>
        <Text className='text-sm font-inter font-semibold mt-2' numberOfLines={1}>{name}</Text>
        <Text>Opens @ {openT} - {closeT}</Text>
      </View>
      

      {promo? 
        (<View className='bg-promo absolute mt-7 ml-3 w-[109px] h-[23px] justify-center align-center rounded-r-full'>
          <Text className='text-white font-inter font-semibold ml-2 text-xs'>Ongoing Promo</Text>
        </View>) : ('')
      }

      {closed?
        (<>
          <View className='bg-black opacity-50 absolute mt-3 ml-3 w-[227] h-[160] justify-center align-center rounded-[10px]'>
          </View> 
          <Text className=' absolute ml-16 pl-1 mt-20 text-white opacity-100 font-inter font-bold text-sm'>Currently closed</Text>
        </>) : ('')
      }

       
      
    </TouchableOpacity>
  )
}

export default SmallStoreCard