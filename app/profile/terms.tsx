import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from 'context/GlobalProvider';
import back from '../../assets/images/tabs/profile/backarrow.png';
import { router } from 'expo-router';


const Terms = () => {
  const { user } = useGlobalContext()
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className='bg-white'>
        <View className='w-full h-16 py-4 my-2 flex justify-start items-center'>
          <View className=' px-4 flex flex-row w-full items-center justify-center h-8 my-2'>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.4} className='absolute z-10 left-4'>
              <Image source={back} />
            </TouchableOpacity>
            <Text className='font-bold text-base'>Terms and Conditions</Text>
          </View>
        </View>
        <View className='px-6 space-y-2 font-normal mb-16'>
          <Text className='font-semibold text-sm'>Last updated: 20th Feb, 2025</Text>
          <Text className='font-normal text-sm'>Welcome to SKG Mall! These Terms and Conditions ("Terms") govern your use of our mobile application. By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the App.</Text>
          
          <View className='my-2'>
            <Text className='font-normal text-sm'>1. Acceptance of Terms</Text>
          <Text className='px-2 text-sm'>By using the App, you confirm that you accept these Terms and agree to comply with them. If you do not agree to these Terms, you must not use the App.</Text>
          </View>
          
          <View className='my-2'>
            <Text className='text-sm '>2. User Responsibilities</Text>
          <Text className='px-2  text-sm'>{'\u2022'} You agree to use the App only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the App.</Text>
          <Text className='px-2  text-sm'>{'\u2022'} You agree not to engage in any behavior that could damage, disable, overburden, or impair the App or interfere with any other party's use of the App.</Text>
          </View>

          <View className='my-2'>
            <Text className='text-sm '>3. Intellectual Property</Text>
          <Text className='px-2  text-sm'>All content, trademarks, and data on the App, including but not limited to software, databases, text, graphics, icons, hyperlinks, private information, designs, and agreements, are the property of or licensed to SKG Mall and as such are protected from infringement by local and international legislation and treaties.</Text>
          </View>
          
          <View className='my-2'>
            <Text className='text-sm '>4. Limitation of Liability</Text>
            <Text className='px-2  text-sm'>SKG Mall will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the App, including but not limited to damages for loss of profits, use, data, or other intangibles.</Text>
          </View>

          <View className='my-2'>
            <Text className='text-sm '>5.  Dispute Resolution</Text>
          <Text className='px-2  text-sm'>Any disputes arising out of or relating to these Terms shall be resolved through binding arbitration .</Text>
          </View>

          <View className='my-2'>
            <Text className='text-sm '>6. Termination</Text>
            <Text className='px-2  text-sm'>We may terminate or suspend your access to the App immediately, without prior notice or liability, if you breach any of the Terms.
            </Text>
          </View>

          <View className='my-2'>
            <Text className='text-sm '>7. Changes to Terms</Text>
            <Text className='px-2  text-sm'>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on the App. You are advised to review these Terms periodically for any changes.</Text>
          </View>

          <View className='my-2'>
            <Text className='text-sm '>8. Contact Us</Text>
            <Text className='px-2  text-sm'>If you have any questions about these Terms, please contact us at info@skgmall.com. These examples should give you a good starting point. Make sure to customize them to fit the specific needs and legal requirements of your business and consult with a legal professional if necessary.</Text>
          </View>
        </View>
       
      </ScrollView>

    </SafeAreaView>
  )
}

export default Terms