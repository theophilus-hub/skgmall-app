import { View, Text, FlatList } from 'react-native'
import React, { Children } from 'react'
import Cat from './category'

const CatSideScroll = ({data}) => {
  return (
    <FlatList className=' text-black ' 
        data = {data}
        keyExtractor={(item) => item.$id}
        
        renderItem={({item}) => (
                    <View >
                        <Cat
                            name={item.name}
                            icon={item.icon_url}
                        />
                    </View>
                    )
                    
                
    }
    
        horizontal
        ListEmptyComponent={() => (
            
            <View className='justify-center align-center my-2 mx-14 rounded-full bg-notwhite p-2'>
                <Text className='font-inter font-semibold text-sm text-black my-1  '>Sorry, categories are unavailable</Text>
            </View>
        )}
     /> 
  )
}

export default CatSideScroll