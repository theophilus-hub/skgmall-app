import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import eye from '../assets/images/auth/eye.png';
import eyeSlash from '../assets/images/auth/eye-slash.png';



const FormField = ({placeholder, value, handeChangeText, inputType, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className='flex flex-row bg-notwhite w-[343px] h-[49]  rounded-[10px]  px-8 my-2 justify-start content-center items-center focus:border focus:border-slate-300 '>
      <TextInput 
        className=' text-black opacity-80 font-inter font-medium text-sm w-full h-8  '
        placeholder={placeholder}
        placeholderTextColor='#2D2D2DCC'
        onChangeText={handeChangeText}
        secureTextEntry = {inputType === 'Password' && !showPassword}
      />

      {inputType === "Password" &&(
        <TouchableOpacity className='' onPress={() => setShowPassword(!showPassword)}>
          <Image 
          source={ showPassword? eye : eyeSlash }
          className='w-4 h-4'
          resizeMode='contain'
          />
        </TouchableOpacity>
      )}
      
    </View>
  )
}

export default FormField