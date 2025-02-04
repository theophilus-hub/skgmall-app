import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const Store = () => {
    const params = useLocalSearchParams();
    
    return (
        <View>
            <Text>Store: {params.id}</Text>
        </View>
    )
}

export default Store