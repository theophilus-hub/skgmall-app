import { View, Text, FlatList } from 'react-native'
import StoreImage1 from '../assets/images/tabs/mall/res/bustling/front.jpg'
import StoreImage2 from '../assets/images/tabs/mall/res/pele/front.jpg'
import StoreImage3 from '../assets/images/tabs/mall/res/theSpot/front.jpg'
import StoreImage4 from '../assets/images/tabs/mall/res/blazers/front.jpg'
import SmallStoreCard from './smallStoreCard'



const StoreSideScroll = ({data, cat}) => {
  return (
    <View>
      <FlatList className=' text-black ' 
        data = {data}
        keyExtractor={(item) => item.$id}
        
        renderItem={({item}) => {
            if(item.storeCat == cat){
              return(
                <View key={item.id}>
                      
                        <SmallStoreCard closed={item.closed} icon={item.icon} name={item.name} openT={item.openT} closeT={item.closeT}/>
                    </View>
              )
            }
          
                    
                    }
                    
                
    }
    
        horizontal
        ListEmptyComponent={() => (
          <>
           
          </>
          
       
        )}
     /> 
    </View>
  )
}

export default StoreSideScroll