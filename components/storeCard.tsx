import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { router } from 'expo-router';
import { Store } from 'context/models';

export interface StoreCardProps{ store: Store }

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/store/${store.id}`) }>
        <View className='bg-notwhite w-full h-[160] rounded-[10px] overflow-hidden'>
            <Image source={{uri: store.icon_url}} resizeMode='cover' className='w-full' />
        </View>
        <View className='w-full p-2'>
            <Text className='text-sm font-inter font-semibold' numberOfLines={1}>{store.name}</Text>
            <Text>Opens @ {store.close_time} - {store.close_time}</Text>
        </View>
        
        {store.promo &&
            (<View className='bg-promo absolute mt-7 ml-3 w-[109px] h-[23px] justify-center align-center rounded-r-full'>
                <Text className='text-white font-inter font-semibold ml-2 text-xs'>Ongoing Promo</Text>
            </View>)
        }
        
        { store.closed &&
            (<>
                <View className='absolute w-full h-[160] justify-center align-center rounded-[10px]' style={{ backgroundColor:"#00000067" }}>
                    <Text className='text-white font-inter font-bold text-sm' style={{ textAlign:"center", }}>Currently closed</Text>
                </View>
            </>)
    }
    </TouchableOpacity>
  )
}

export default StoreCard;