import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from 'context/GlobalProvider';
import back from '../../assets/images/tabs/profile/backarrow.png';
import dpm from '../../assets/images/tabs/profile/dpm2.png';
import plus from '../../assets/images/tabs/profile/plus.png';
import signout from '../../assets/images/tabs/profile/signout.png';
import stroke from '../../assets/images/tabs/profile/stroke.png';
import EditInfo from 'components/profile/editInfo';
import DeleteInfo from 'components/profile/deleteInfo';
import { router } from 'expo-router';
import { UserEditProvider } from 'context/editContext';
import EditDropdown from 'components/profile/editDropdown';
import { locations, states } from 'lib/utils';

const Info = () => {
    const { profile, update } = useGlobalContext();
    
    const onUpdate = async (label: string, value: string) =>{
        switch(label){
            case "First Name":
                await update({ firstname: value });
                break
            case "Last Name":
                await update({ lastname: value });
                break;
            case "Phone Number":
                await update({ phone: value });
                break;
            case "State":
                await update({ state: value, location: locations(value)[0].label });
                break;
            case "Location":
                await update({ location: value });
                break;
        }
    }

    const updateFailed = (label: string, erorr: any) =>{
        Alert.alert('Update Failed', `unable to update ${label}`);
    }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className='bg-white'>
        <View className='w-full h-44 py-4 my-2 flex justify-start items-center'>
          <View className=' px-4 flex flex-row w-full items-center justify-center h-8 my-'>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.4} className='absolute z-10 left-4'>
              <Image source={back} />
            </TouchableOpacity>
            <Text className='font-bold text-base'>Personal Infomation</Text>
          </View>
          <View className=' flex justify-start items-center space-y-2 my-4' >
            <Image source={dpm} />
          </View>
        </View>
        <View className='h-[1px] bg-notwhite w-full mb-2' />

        <View>
            <UserEditProvider>
                <EditInfo type='text' label='First Name' value={profile!.firstname} requestUpdate={onUpdate} updateFailed={updateFailed}/>
                <EditInfo type='text' label='Last Name' value={profile!.lastname}  requestUpdate={onUpdate} updateFailed={updateFailed}/>
                <EditInfo type='numeric' label='Phone Number' value={profile!.phone} requestUpdate={onUpdate} updateFailed={updateFailed}/>
                <EditInfo type='email' label='Email' enbaled={false} value={profile!.email} requestUpdate={onUpdate} updateFailed={updateFailed}/>
                <EditDropdown label='State' data={states} value={profile!.state} requestUpdate={onUpdate} updateFailed={updateFailed}/>
                <EditDropdown data={locations(profile!.state)} label='Location' value={profile!.location} requestUpdate={onUpdate} updateFailed={updateFailed}/>
            </UserEditProvider>
            
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


          <View className='my-3'>
            <TouchableOpacity className='px-6 py-2 flex flex-row justify-start items-center space-x-2'>
              <Image source={signout} />
              <Text className='font-semibold text-sm'>Sign out</Text>
            </TouchableOpacity>
          </View>

          <View className='my-3'>
            <TouchableOpacity onPress={() => router.push('profile/delete')} className='px-6 py-2 flex flex-row justify-start items-center space-x-2'>
              <Image source={stroke} />
              <Text className='font-semibold text-sm text-primary'>Delete account</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Info