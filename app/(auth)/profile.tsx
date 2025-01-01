import { View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import { Link, router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/formField';
import { useState } from 'react';
import WideButton from '../../components/wideButton';
import Eye from '../../assets/images/auth/eye-slash.png';
import Google from '../../assets/images/auth/google logo.png';
import Apple from '../../assets/images/auth/apple logo.png';
import {supabase} from '../../lib/supabase'
import { updateUserProfile } from '../../lib/supabase';


const Profile = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  })


  const submit = async () => {
    const userJson = await supabase.auth.getUser()
    const user = userJson.data.user;
    const userId = user!.id;

    try {
        const result = await updateUserProfile(
            userId, 
            form.firstName, 
            form.lastName, 
            form.phoneNumber
        );
        router.replace('../(tabs)/mall');
  
    } catch (error) {
        Alert.alert('Error', 'coulnt update the account')
      } 
  }



  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View className='justify-center items-center w-full  px-4 mt-16'>
          <Text className='font-bold font-inter text-center text-base'>Complete Profile</Text>
         
          <View className='mt-16'>
            <View>
                <FormField 
                    placeholder='First Name'
                    value={form.firstName}
                    handeChangeText={(e) => setForm({...form, firstName: e})}
                    inputType='first-name'
                />

                <FormField 
                    placeholder='Last Name'
                    value={form.lastName}
                    handeChangeText={(e) => setForm({...form, lastName: e})}
                    inputType='first-name'
                />
                <FormField 
                    placeholder='Phone Number'
                    value={form.phoneNumber}
                    handeChangeText={(e) => setForm({...form, phoneNumber: e.replace(/[^0-9]/g, '')})}
                    inputType='numeric'
                />
            </View>
            <View className='mt-4'>
              <WideButton 
                text='Continue to Mall'
                bg='primary'
                color='white'
                style="font-semibold font-inter text-sm  text-center justify-center"
                onPress={submit}
                />
            </View>
            
          </View>
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile