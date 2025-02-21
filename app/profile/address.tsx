import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from 'context/GlobalProvider';
import back from '../../assets/images/tabs/profile/backarrow.png';
import dpm from '../../assets/images/tabs/profile/dpm.png';
import plus from '../../assets/images/tabs/profile/plus.png';
import signout from '../../assets/images/tabs/profile/signout.png';
import EditInfo from 'components/profile/editInfo';
import DeleteInfo from 'components/profile/deleteInfo';
import { router } from 'expo-router';
import WideButton from 'components/wideButton';


const Address = () => {
    const { user } = useGlobalContext()
    const [defaultAddr, setDefaultAddr] = useState(false);
    const [address, setAddress] = useState('')
    const inputRef = useRef<TextInput>(null);

    useFocusEffect(
        useCallback(() => {
          const timer = setTimeout(() => {
            inputRef.current?.focus();
          }, 1);
          
          return () => clearTimeout(timer);
        }, [])
      );
    

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className='bg-white'>
                <View className='w-full h-16 py-4 my-2 flex justify-start items-center'>
                    <View className=' px-4 flex flex-row w-full items-center justify-center h-8 my-2'>
                        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.4} className='absolute z-10 left-4'>
                            <Image source={back} />
                        </TouchableOpacity>
                        <Text className='font-bold text-base'>Add address</Text>
                    </View>

                </View>
                <View className='w-full flex justify-center items-center px-6'>
                    <View className={'flex my-2 flex-row w-full bg-notwhite  h-[38] rounded-[100px] px-2 py-2 justify-start content-center items-center focus:border-slate-300 focus:border-2'}>
                        <TextInput
                            className=' text-black opacity-80 font-inter font-medium text-sm w-[100%] h-10 px-2'
                            placeholder='Input new address'
                            placeholderTextColor='#2D2D2DCC'
                            ref={inputRef}
                        />
                    </View>
                </View>

                <View className='w-full px-6 space-y-4 my-4'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='font-normal text-sm'>Save as default address</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => setDefaultAddr(!defaultAddr)} className={`w-10 h-5 ${defaultAddr? 'bg-green-300 items-end' : 'bg-notwhite items-start'} rounded-[50px] flex  justify-center px-[2.5px] py-[2.5px]`}>
                            <View className='w-[15px] h-[15px] rounded-full bg-white'></View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View className='flex justify-center items-center mt-4'>
                    <WideButton color='white' text='Continue' bg='primary' isLoading={false} onPress={() => null} style='font-semibold text-sm' />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Address