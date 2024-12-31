import { View, Text, FlatList } from 'react-native'
import StoreImage1 from '../assets/images/tabs/mall/res/bustling/front.jpg'
import StoreImage2 from '../assets/images/tabs/mall/res/pele/front.jpg'
import StoreImage3 from '../assets/images/tabs/mall/res/theSpot/front.jpg'
import StoreImage4 from '../assets/images/tabs/mall/res/blazers/front.jpg'
import SmallStoreCard from './smallStoreCard'

export interface StoreSideScrollProps{
  data: { id: number, storeCat: number, promo: string, closed: string, icon: string, name: string, openT: String, closeT: String }[],
  cat: number
}

const StoreSideScroll: React.FC<StoreSideScrollProps> = ({data, cat}) => {
    return (
        <View>
            <FlatList className='text-black' 
                data = {data.filter((item)=> item.storeCat == cat)}
                keyExtractor={(item) => item.id.toString()}
                
                renderItem={({item}) => (
                        <View key={item.id}>
                            <SmallStoreCard closed={item.closed} icon={item.icon} name={item.name} openT={item.openT} closeT={item.closeT} promo={''}/>
                        </View>
                )}
                horizontal
            /> 
        </View>
    );
}

export default StoreSideScroll