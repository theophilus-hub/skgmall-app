import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import React from 'react';

export interface WideButtonProps{
    text: string, bg: string, color: string, onPress: (event: GestureResponderEvent) => void, style: string
}

const WideButton: React.FC<WideButtonProps> = ({text, bg, color, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} className={`bg-${bg} justify-center items-center my-3 py-3 px-4 w-[338px] rounded-[10px]`}>
          <Text className={` text-${color} ${style}`}>{text}</Text>
        </TouchableOpacity>
  )
}

export default WideButton