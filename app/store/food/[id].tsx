import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const Food = () => {
    const params = useLocalSearchParams();
    
    return (
        <View>
            <Text>Food: {params.id}</Text>
        </View>
    );
}

export default Food;