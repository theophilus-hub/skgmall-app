import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import StoreImage from '../assets/images/tabs/mall/res/bustling/front.jpg'
import { router } from 'expo-router';
import { Store } from 'context/models';

export interface SmallStoreCardProps{
    store: Store
}

const SmallStoreCard: React.FC<SmallStoreCardProps> = ({ store }) => {
  return (
    <TouchableOpacity className='my-2 p-3 mx-4' activeOpacity={0.8} onPress={() => router.push(`/store/${store.id}`)}>
      <View className='bg-notwhite w-[227] h-[160] rounded-[10px] overflow-hidden'>
        <Image 
          source={{uri: store.icon_url}}
          className='w-[227] h-[160] '
          resizeMode='cover'
        />
      </View>
      <View className='w-[227]'>
        <Text className='text-sm font-inter font-semibold mt-2' numberOfLines={1}>{store.name}</Text>
        <Text>Opens @ {store.open_time} - {store.close_time}</Text>
      </View>
      

      {store.promo &&
        (<View className='bg-promo absolute mt-7 ml-3 w-[109px] h-[23px] justify-center align-center rounded-r-full'>
          <Text className='text-white font-inter font-semibold ml-2 text-xs'>Ongoing Promo</Text>
        </View>)
      }

      {store.closed &&
        (<>
          <View className='bg-black opacity-50 absolute mt-3 ml-3 w-[227] h-[160] justify-center align-center rounded-[10px]'>
          </View> 
          <Text className=' absolute ml-16 pl-1 mt-20 text-white opacity-100 font-inter font-bold text-sm'>Currently closed</Text>
        </>)
      }      

    </TouchableOpacity>
  )
}

export default SmallStoreCard