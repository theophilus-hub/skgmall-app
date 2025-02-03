import { View, Text, FlatList } from 'react-native'
import React, { Children } from 'react'
import Category from './category';

export interface CatSideScrollProps{
    data: Array<{ id: number, name: string, icon_url?: string }>
}

const CatSideScroll: React.FC<CatSideScrollProps> = ({data}) => {
  return (
    <FlatList className='text-black' 
        showsHorizontalScrollIndicator={false}
        data = {data}
        keyExtractor={(item) => item.id.toString()}
        
        renderItem={({item}) => (
                    <View >
                        <Category name={item.name} icon={item.icon_url} />
                    </View>)
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