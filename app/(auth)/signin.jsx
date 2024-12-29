import { View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/formField';
import { useState } from 'react';
import WideButton from '../../components/wideButton';
import Eye from '../../assets/images/auth/eye-slash.png';
import Google from '../../assets/images/auth/google logo.png';
import Apple from '../../assets/images/auth/apple logo.png';
import { getUser, supabase } from '../../lib/supabase';
import { signInWithEmail } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const {setUser, setIsLoggedIn} = useGlobalContext()

  const submit =  async () => {
    
    if (!form.email || !form.password) {
      Alert.alert('notice', 'wrong input')
      
    }else{
        try {
          
          await signInWithEmail(form.email, form.password)
          const result = await getUser();
          setUser(result);
          setIsLoggedIn(true)
          router.replace('/(tabs)/mall')

        } catch (error) {
          Alert.alert('Error', 'wrong credentials')
        } 
    }
    
  }


  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View className='justify-center items-center w-full  px-4 mt-16'>
          <Text className='font-bold font-inter text-center text-base'>Welcome to SKG Mall {'\n'}Sign In</Text>
         
          <View className='mt-16'>
            <View>
              <FormField 
                placeholder='Email or phone number'
                value={form.email}
                handeChangeText={(e) => setForm({...form, email: e})}
                KeyboardType='email-address'
              />
              <FormField 
                placeholder='Password'
                value={form.password}
                handeChangeText={(e) => setForm({...form, password: e})}
                inputType= 'Password'
              />
            </View>
            <View className='mt-4'>
              <WideButton 
              onPress={submit}
                text='Sign In'
                bg='primary'
                color='white'
                style="font-semibold font-inter text-sm  text-center justify-center"
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
            <TouchableOpacity activeOpacity={0.6} className='flex flex-row space-x-3 justify-center items-center bg-white border border-slate-400 my-2 py-3 px-4 w-[338px] rounded-[10px]'>
              <Image 
                source={Google} 
                />

              <Text>Sign in with Google</Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} className='flex flex-row space-x-3 justify-center items-center bg-white border border-slate-400 my-2 py-3 px-4 w-[338px] rounded-[10px]'>
              <Image 
                source={Apple}
              />
              <Text>Sign in with Apple ID</Text>
            </TouchableOpacity>
          </View>

          <View className='flex flex-row justify-center items-center p-4'>
            <Text className='text-sm font inter font-semibold'>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/signup')} activeOpacity={0.4} className=' ml-4 '>
              <Text className='font-semibold font-inter text-base text-primary'>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View className='mt-6'>
              <WideButton 
                text='Just Order'
                bg='primary'
                color='white'
                style="font-semibold font-inter text-sm  text-center justify-center"
                />
            </View>
          
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn