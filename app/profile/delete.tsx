import { View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from 'context/GlobalProvider';
import back from '../../assets/images/tabs/profile/backarrow.png';
import { router } from 'expo-router';
import WideButton from 'components/wideButton';


const Delete = () => {
    const { user } = useGlobalContext()
    const [active, setActive] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className=''>
                <View className='w-full h-16 py-4 my-2 flex justify-start items-center'>
                    <View className=' px-4 flex flex-row w-full items-center justify-center h-8 my-2'>
                        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.4} className='absolute z-10 left-4'>
                            <Image source={back} />
                        </TouchableOpacity>
                        <Text className='font-bold text-base'>Delete account</Text>
                    </View>
                </View>

                <View className='px-6 space-y-6 font-normal mb-16'>
                    <Text className='font-normal text-sm'>We are sad to see you go! 😢 Mind sharing why you're leaving? Your feedback is important and helps us enhance your experience. Please can you tell us your reason for leaving? Your insights mean a lot!</Text>

                    <View className='my-2 space-y-4'>

                        <View className='flex flex-row justify-start items-center space-x-2'>
                            <TouchableOpacity onPress={() => setActive(1)} activeOpacity={0.3} className={`w-5 h-5 flex justify-center items-center  rounded-[4px] ${active == 1 ? '' : 'border-[0.5px] border-notblack'}`}>
                                <Text className={active == 1 ? 'flex' : 'hidden'}>✅</Text>
                            </TouchableOpacity>
                            <Text>The delivery service is poor</Text>
                        </View>

                        <View className='flex flex-row justify-start items-center space-x-2'>
                            <TouchableOpacity onPress={() => setActive(2)} activeOpacity={0.3} className={`w-5 h-5 flex justify-center items-center  rounded-[4px] ${active == 2 ? '' : 'border-[0.5px] border-notblack'}`}>
                                <Text className={active == 2 ? 'flex' : 'hidden'}>✅</Text>
                            </TouchableOpacity>
                            <Text>The app is very confusing</Text>
                        </View>

                        <View className='flex flex-row justify-start items-center space-x-2'>
                            <TouchableOpacity onPress={() => setActive(3)} activeOpacity={0.3} className={`w-5 h-5 flex justify-center items-center  rounded-[4px] ${active == 3 ? '' : 'border-[0.5px] border-notblack'}`}>
                                <Text className={active == 3 ? 'flex' : 'hidden'}>✅</Text>
                            </TouchableOpacity>
                            <Text>I don’t have a reason</Text>
                        </View>

                        <View className='flex flex-row justify-start items-center space-x-2'>
                            <TouchableOpacity onPress={() => setActive(4)} activeOpacity={0.3} className={`w-5 h-5 flex justify-center items-center  rounded-[4px] ${active == 4 ? '' : 'border-[0.5px] border-notblack'}`}>
                                <Text className={active == 4 ? 'flex' : 'hidden'}>✅</Text>
                            </TouchableOpacity>
                            <Text>Other</Text>
                        </View>

                        <View className={`${active == 4 ? 'flex' : 'hidden'} my-2 flex-row w-full bg-notwhite  h-[38] rounded-[10px] px-2 py-2 justify-start content-center items-center `}>
                            <TextInput
                                className=' text-black opacity-80 font-inter font-medium text-sm w-[100%] h-8 px-4'
                                placeholder={'Your reason'}
                                placeholderTextColor='#2D2D2DCC'
                                keyboardType={'default'}
                            />
                        </View>


                    </View>
                </View>

                <View className='flex justify-center items-center'>
                    <WideButton color='white' text='Continue' bg='primary' isLoading={false} onPress={() => setModalVisible(true)} style='font-semibold text-sm' />
                </View>

                 {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 w-full px-6">
          <View className="bg-white w-full py-10 px-6 rounded-lg shadow-lg">
            <Text className="text-sm font-semibold text-center">We have received your feedback and we will ensure your issue is resolved. But do you still want to delete your account?</Text>

            {/* Close Button */}
            
            <TouchableOpacity 
              className="bg-primary justify-center items-center mt-6 mb-2 h-[50] py-3 px-4 w-full rounded-[10px]"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-semibold">No, Keep my account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="border-primary border  justify-center items-center my-1 h-[50] py-3 px-4 w-full rounded-[10px]"
            >
              <Text className="font-semibold text-primary">Yes, delete my account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Delete