import { View, Text, ScrollView, RefreshControl, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useSettings } from 'context/settingsContext';
import { useGlobalContext } from 'context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import dpm from '../../assets/images/tabs/profile/dpm.png';
import Options from 'components/profile/options';
import userIcon from '../../assets/images/tabs/profile/user.png'
import card from '../../assets/images/tabs/profile/card.png'
import shield from '../../assets/images/tabs/profile/shield.png'
import settings from '../../assets/images/tabs/profile/settings.png'
import group from '../../assets/images/tabs/profile/group.png'
import terms from '../../assets/images/tabs/profile/terms.png'

const Profile = () => {
    const { autoLogin, themeMode, setThemeMode, toggleAutoLogin } = useSettings();
    const { user } = useGlobalContext()
    const [refreshing, setRefreshing] = useState(false);
    
    
    // const onRefresh = async () => {
    //     setRefreshing(true);
    //     await refresh();
    //     setRefreshing(false);
    //   };
    
    return (
        <SafeAreaView className="bg-white h-full">
               <ScrollView className='bg-white'>
                <View className='w-full  h-48 my-2 flex justify-center items-center'>
                    <View className='p-2 h-36 flex justify-start items-center space-y-2' >
                        <Image source={dpm} className='' />
                        <View className='flex justify-center items-center text-center'>
                            <Text className='font-normal text-sm'>{user?.user_metadata.firstname.replace(/\b\w/g,  (char: string)=> char.toUpperCase())} {user?.user_metadata.lastname.replace(/\b\w/g,  (char: string)=> char.toUpperCase())}</Text>
                        <Text className='font-normal text-sm'>{user?.user_metadata.phone}</Text>
                        <Text className='font-normal text-sm'>{user?.email}</Text>
                        </View>
                        
                    </View>
                </View>
               
               <View className='w-full flex-1'>
                <Options text='Personal information' link='profile/info' icon={userIcon}/>
                <Options text='Payment information' link='store' icon={card}/>
                <Options text='Support' link='store' icon={group}/>
                <Options text='Settings' link='store' icon={settings}/>
                <Options text='Terms & Conditions' link='store' icon={terms}/>
                <Options text='Privacy Policy' link='store' icon={shield}/>
               </View>
               </ScrollView>

        </SafeAreaView>
    )
}

export default Profile