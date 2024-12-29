import { View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/formField';
import { useState } from 'react';
import WideButton from '../../components/wideButton';
import Eye from '../../assets/images/auth/eye-slash.png';
import Google from '../../assets/images/auth/google logo.png';
import Apple from '../../assets/images/auth/apple logo.png';
import createUser from '../../lib/appwrite'
import {signUpWithEmail, signInWithEmail} from '../../lib/supabase'
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../../context/GlobalProvider';
const Signup = () => {
 
  const [form, setForm] = useState({
    email: '',
    password: '',
    cpassword: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser, setIsLoggedIn} = useGlobalContext()

  

  const submit =  async () => {
    if (!form.email || !form.password) {
      Alert.alert('notice', 'wrong input')
      
    }
    setIsSubmitting(true)

    try {
      const result = await signUpWithEmail(form.email, form.password)
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/profile')

    } catch (error) {

      //console.log( error)
      if (error.message === 'AuthApiError: User already registered') {
        Alert.alert('Error', 'User Already Exist')
      } else {
        Alert.alert('Error', error.message)
      }
      
      
    } finally{
      setIsSubmitting(false)
    }
    
  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View className='justify-center items-center w-full  px-4 mt-16'>
          <Text className='font-bold font-inter text-center text-base'>Welcome to SKG Mall {'\n'}Sign Up</Text>
         
          <View className='mt-16'>
            <View>
              <FormField 
                placeholder='Email or phone number'
                value={form.email}
                handeChangeText={(e) => setForm({...form, email: e})}
                keyboardType='email-address'
              />
              <FormField 
                placeholder='Create Password'
                value={form.password}
                handeChangeText={(e) => setForm({...form, password: e})}
                inputType= 'Password'
              />
               <FormField 
                placeholder='Confirm Password'
                value={form.cpassword}
                handeChangeText={(e) => setForm({...form, cpassword: e})}
                inputType= 'Password'
              />
            </View>
            <View className='mt-2'>
              <WideButton 
                onPress={submit}
                text='Sign Up'
                bg='primary'
                color='white'
                style="font-semibold font-inter text-sm  text-center justify-center"
                // isLoading = {isSubmitting}
                />

            </View>
            
          </View>
        </View>

        <View className='flex flex-row justify-center items-center space-x-4 mx-0 my-6'>
            <View className='min-h-[1px] h-[1px] min-w-[168px] bg-black opacity-60'></View>
            <Text className='font-bold font-inter text-base'>OR</Text>
            <View className='min-h-[1px] h-[1px] min-w-[168px] bg-black opacity-60 mr-0'></View>
        </View>

        <View className='justify-center items-center w-full  px-4 '>
          <View>
            <TouchableOpacity activeOpacity={0.6} className='flex flex-row space-x-3 justify-center items-center bg-white border border-gray my-2 py-3 px-4 w-[338px] rounded-[10px]'>
              <Image 
                source={Google} 
                />

              <Text>Sign up with Google</Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} className='flex flex-row space-x-3 justify-center items-center bg-white border border-gray my-2 py-3 px-4 w-[338px] rounded-[10px]'>
              <Image 
                source={Apple}
              />
              <Text>Sign up with Apple ID</Text>
            </TouchableOpacity>
          </View>

          <View className='flex flex-row justify-center items-center p-4'>
            <Text className='text-sm font inter font-semibold'>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/signin')} activeOpacity={0.4} className=' ml-4 '>
              <Text className='font-semibold font-inter text-base text-primary'>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View className='mt-4'>
              <Text className='font-normal font-inter text-sm text-center'>By clicking Sign up, you agree to the <Text className='text-secondary'>terms & conditions</Text> and <Text className='text-secondary'>privacy policy</Text>.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup