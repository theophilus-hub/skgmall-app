import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Image } from 'react-native'


export interface OptionProps {
    text: string,
    link: string,
    icon: ImageSourcePropType
}

const Options: React.FC<OptionProps> = ({ text, link, icon }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => router.push(link)} activeOpacity={0.4} className='flex flex-row justify-start py-5 px-6 items-center w-full space-x-2 border-y border-notwhite'>
                <Image source={icon} />
                <Text className='font-semibold text-sm '>
                    {text}
                </Text>


            </TouchableOpacity>
        </View>
    )
}

export default Options
