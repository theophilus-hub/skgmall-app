import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export interface EditInfoProps {
label: string,
value: string,

}


const EditInfo: React.FC<EditInfoProps> = ({label, value}) => {
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
                    <Text className='text-primary font-semibold text-sm'>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

export default EditInfo