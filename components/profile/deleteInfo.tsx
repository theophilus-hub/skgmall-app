import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export interface DeleteInfoProps {
label: string,
value: string,

}


const DeleteInfo: React.FC<DeleteInfoProps> = ({label, value}) => {
    const [editState, setEditState] = useState(false)

  return (
    <View className='my-4'>
      <View className={editState? 'hidden': 'flex'}>
        <View className='flex flex-row justify-between px-6'>
            <View className=''>
                <Text className='font-semibold text-sm'>{label}</Text>
                <Text className='text-notblack text-sm font-normal'>{value}</Text>
            </View>
            <View>
                <TouchableOpacity className=''>
                    <Text className='text-primary font-semibold text-sm'>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      <View className='w-full flex items-center justify-center mt-4 px-6'>
        <View className='w-full h-[1px] bg-notwhite'/>
      </View>
      
    </View>
  )
}

export default DeleteInfo