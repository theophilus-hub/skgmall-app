import { View, Text, FlatList } from 'react-native'
import StoreImage1 from '../assets/images/tabs/mall/res/bustling/front.jpg'
import StoreImage2 from '../assets/images/tabs/mall/res/pele/front.jpg'
import StoreImage3 from '../assets/images/tabs/mall/res/theSpot/front.jpg'
import StoreImage4 from '../assets/images/tabs/mall/res/blazers/front.jpg'
import SmallStoreCard from './smallStoreCard'
import { Store } from 'context/models'

export interface StoreSideScrollProps{
  data: Store[],
  cat: string
}

const StoreSideScroll: React.FC<StoreSideScrollProps> = ({data, cat}) => {
    return (
        <View>
            <FlatList className='text-black'
            showsHorizontalScrollIndicator= {false} 
                data = {data.filter((item)=> item.store_category === cat)}
                keyExtractor={(item) => item.id.toString()}
                
                renderItem={({item}) => (
                        <View key={item.id}>
                            <SmallStoreCard closed={item.closed} icon={item.icon_url} name={item.name} openT={item.open_time} closeT={item.close_time} promo={item.promo}/>
                        </View>
                )}
                horizontal
            /> 
        </View>
    );
}

export default StoreSideScroll