import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from 'context/GlobalProvider';
import back from '../../assets/images/tabs/profile/backarrow.png';
import { router } from 'expo-router';


const Privacy = () => {
  const { user } = useGlobalContext()
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className='bg-white'>
        <View className='w-full h-16 py-4 my-2 flex justify-start items-center'>
          <View className=' px-4 flex flex-row w-full items-center justify-center h-8 my-2'>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.4} className='absolute z-10 left-4'>
              <Image source={back} />
            </TouchableOpacity>
            <Text className='font-bold text-base'>Privacy Policy</Text>
          </View>
        </View>
        <View className='px-6 space-y-2 font-normal mb-16'>
          <Text className='font-semibold text-sm'>Last updated: 20th Feb, 2025</Text>
          <Text className='font-normal text-sm'>At SKG Mall, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application. By using the App, you agree to the collection and use of information in accordance with this policy.</Text>
          
          <View className='my-2'>
            <Text className='font-normal text-sm'>1. Information We Collect:</Text>
          <Text>Personal Data:</Text>
          <Text className='px-2  text-sm'>{'\u2022'} When you register on the App, we may collect personally identifiable information, such as your name, email address, phone number, and payment information. </Text>
          <Text className='px-2  text-sm'>{'\u2022'} Usage Data: We may collect information about your interactions with the App, including the pages you visit, the links you click, and other actions you take. </Text>
          <Text className='px-2 text-sm'>{'\u2022'} Device Data: Information about your device, such as IP address, device type, operating system, and unique device identifiers.</Text>
          </View>
          
          <View className='my-2'>
            <Text className='text-sm '>2. How We Use Your Information We may use the information we collect in various ways, including to:</Text>
          <Text className='px-2  text-sm'>{'\u2022'} Provide, operate, and maintain our App</Text>
          <Text className='px-2  text-sm'>{'\u2022'} Improve, personalize, and expand our App </Text>
          <Text className='px-2 text-sm'>{'\u2022'} Understand and analyze how you use our App </Text>
          <Text className='px-2  text-sm'>{'\u2022'} Process your transactions and manage your orders</Text>
          <Text className='px-2  text-sm'>{'\u2022'} Communicate with you, including for customer service, updates, and promotional purposes </Text>
          <Text className='px-2 text-sm'>{'\u2022'} Detect and prevent fraudulent activity and ensure security </Text>
          </View>

          <View className='my-2'>
            <Text className='text-sm '>3. Sharing Your Information We may share your information with third parties in the following situations:</Text>
          <Text className='px-2  text-sm'>{'\u2022'} With vendors and service providers who assist us in operating our App and providing our services </Text>
          <Text className='px-2  text-sm'>{'\u2022'} To comply with legal obligations, enforce our terms and conditions, or protect our rights With your consent, or at your direction</Text>
          </View>
          
          <View className='my-2'>
            <Text className='text-sm '>4. Data Security We use administrative, technical, and physical security measures to protect your personal information. However, no electronic transmission or storage of information can be 100% secure.</Text>
          </View>

          <View className='my-2'>
            <Text className='text-sm '>5. Your Data Protection Rights Depending on your location, you may have the following rights regarding your personal data:</Text>
          <Text className='px-2  text-sm'>{'\u2022'} The right to access – You have the right to request copies of your personal data.</Text>
          <Text className='px-2  text-sm'>{'\u2022'} The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe.</Text>
          </View>
        </View>
       
      </ScrollView>

    </SafeAreaView>
  )
}

export default Privacy