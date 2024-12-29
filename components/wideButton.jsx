import { View, Text, TouchableOpacity } from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import React from 'react';

const WideButton = ({text, bg, color, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} className={`bg-${bg} justify-center items-center my-3 py-3 px-4 w-[338px] rounded-[10px]`}>
          <Text className={` text-${color} ${style}`}>{text}</Text>
        </TouchableOpacity>
  )
}

export default WideButton