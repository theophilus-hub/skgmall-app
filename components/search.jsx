import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import search from '../assets/images/tabs/mall/search.png';




const Search = ({placeholder, value, handeChangeText, inputType, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <View className='flex flex-row space-x-2 bg-notwhite w-[343px] h-[49]  rounded-[10px] py-2 px-8 my-2 justify-start items-center focus:border focus:border-slate-300 '>
        
        <Image 
            source={search}
        />
        
        
        <TextInput 
          className=' pb-1  text-black opacity-80 font-inter font-medium text-sm h-8 w-full'
          placeholder='Search SKG Mall'
          placeholderTextColor='#606060'
          onChangeText={handeChangeText}
          secureTextEntry = {inputType === 'Password' && !showPassword}
        />
        
      </View>
    )
}

export default Search