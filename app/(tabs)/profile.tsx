import { View, Text } from 'react-native'
import React from 'react'
import { useSettings } from 'context/settingsContext';
import { useGlobalContext } from 'context/GlobalProvider';

const Profile = () => {
    const { autoLogin, themeMode, setThemeMode, toggleAutoLogin } = useSettings();
    const { user } = useGlobalContext()
    
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile