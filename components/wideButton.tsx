import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import React from 'react';
import { isLoading } from 'expo-font';

export interface WideButtonProps{
    text: string, isLoading: boolean, bg: string, color: string, onPress: (event: GestureResponderEvent) => void, style: string
}

const WideButton: React.FC<WideButtonProps> = ({text, bg, color, onPress, style, isLoading}) => {
  return (
    <TouchableOpacity disabled={isLoading} onPress={onPress} activeOpacity={0.6} className={`bg-${bg} justify-center items-center my-3 h-[50] py-3 px-4 w-[338px] rounded-[10px]`}>
          <Text className={` text-${color} ${style}`}>{text}</Text>
        </TouchableOpacity>
  )
}

export default WideButton