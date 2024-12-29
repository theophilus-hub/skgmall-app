import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import NextArrow from '../assets/images/tabs/mall/next.png'
import StoreSideScroll from './storeSideScroll'


const Mall = ({data, catData}) => {
  return (
    <View>
      <FlatList className=' text-black ' 
        data = {catData}
        keyExtractor={(item) => item.$id}
        
        renderItem={({item}) => (
        <View className='my-2' key={item.id}>
            <View className='flex flex-row justify-between mx-6'>
            <Text className='font-inter font-bold text-black text-base my-2'>{item.name}</Text>
            <View>
                <TouchableOpacity className='flex flex-row'>
                <Text className='font-inter font-semibold text-black text-base my-2'>See all</Text>
                <Image 
                    source={NextArrow}
                    className='my-2.5 mx-1'
                />
                </TouchableOpacity>
            </View>
            </View>
            <StoreSideScroll data={data} cat={item.uid} />
        </View>
                    
                
    )
}
        
        ListEmptyComponent={() => (
          <>
           
          </>
          
       
        )}
     /> 
    </View>

    
  )
}

export default Mall