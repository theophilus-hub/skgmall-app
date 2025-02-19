import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from 'context/GlobalProvider';
import back from '../../assets/images/tabs/profile/backarrow.png';
import dpm from '../../assets/images/tabs/profile/dpm.png';
import plus from '../../assets/images/tabs/profile/plus.png';
import signout from '../../assets/images/tabs/profile/signout.png';
import EditInfo from 'components/profile/editInfo';
import DeleteInfo from 'components/profile/deleteInfo';
import { router } from 'expo-router';
const Info = () => {
  const { user } = useGlobalContext()
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className='bg-white'>
        <View className='w-full h-48 py-4 my-2 flex justify-start items-center'>
          <View className=' px-4 flex flex-row w-full items-center justify-center h-8 my-2'>
            <TouchableOpacity onPress={() => router.push("/(tabs)/profile")} activeOpacity={0.4} className='absolute z-10 left-4'>
              <Image source={back} />
            </TouchableOpacity>
            <Text className='font-bold text-base'>Personal Infomation</Text>
          </View>
          <View className=' flex justify-start items-center space-y-2' >
            <Image source={dpm} />
          </View>
        </View>
        <View className='h-[1px] bg-notwhite w-full' />

        <View>
          <EditInfo id='1' type='text' label='Full Name' value={user?.user_metadata.firstname + ' ' + user?.user_metadata.lastname} />
          <EditInfo id='2' type='numeric' label='Phone Number' value={user?.user_metadata.phone} />
          <EditInfo id='3' type='email' label='Email' value={user?.user_metadata.email} />

          <View className='h-[1px] bg-notwhite w-full' />

          <View className=' my-6'>
            <Text className='font-medium text-lg px-6'>Saved Addressess</Text>
            <View className='my-2'>
              <View>
                <DeleteInfo label='Dorcas Lodge' value='After skills, behind I no know the road' />
              </View>

              <TouchableOpacity onPress={() => router.push("/profile/address")} activeOpacity={0.4} className='px-6 py-2 flex flex-row justify-start items-center space-x-2'>
                <Image source={plus} />
                <Text className='font-semibold text-xs'>Add new Address</Text>
              </TouchableOpacity>

            </View>
          </View>
          <View className='h-[1px] bg-notwhite w-full' />


          <View className='mt-2'>
            <TouchableOpacity className='px-6 py-2 flex flex-row justify-start items-center space-x-2'>
              <Image source={signout} />
              <Text className='font-semibold text-sm'>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Info