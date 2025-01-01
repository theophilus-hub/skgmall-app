import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export interface CategoryProps{
    name: string,
    icon: string
}

const Category: React.FC<CategoryProps> = ({name, icon}) => {
   
  return (
    <TouchableOpacity activeOpacity={0.6} className='flex flex-row space-x-2 justify-center items-center bg-notwhite min-w-5 px-2 py-2 mx-1 h-10 rounded-[20px]'>
      <Image  
        source={{uri: icon}}
        className='w-6 h-6'
        resizeMode='contain'
      />
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

export default Category