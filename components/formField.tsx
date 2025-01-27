import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import eye from '../assets/images/auth/eye.png';
import eyeSlash from '../assets/images/auth/eye-slash.png';

export interface FormFieldProps{
    placeholder?: string, value: string, 
    handeChangeText?: (text: string) => void,
    inputType?: String
    isvalid?: boolean
}

const FormField: React.FC<FormFieldProps>  = ({placeholder, value, handeChangeText, inputType, isvalid = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  //const borderColor = isvalid ? undefined : "red";

  return (
    <View className={'flex my-2 flex-row bg-notwhite w-[343px] h-[48] rounded-[10px] px-8 justify-start content-center items-center ' + (isvalid ? "focus:border-slate-300 focus:border-2" : "border-red-300 border-2")}>
      <TextInput
        className=' text-black opacity-80 font-inter font-medium text-sm w-full h-8 pb-1 '
        placeholder={placeholder}
        value={value}
        placeholderTextColor='#2D2D2DCC'
        onChangeText={handeChangeText}
        secureTextEntry = {inputType === 'Password' && !showPassword}
        keyboardType={inputType === "numeric"? 'numeric' : inputType === "email"? 'email-address' :'default'}
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