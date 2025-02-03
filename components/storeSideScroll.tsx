import { View, Text, FlatList } from 'react-native'
import SmallStoreCard from './smallStoreCard'
import { Store } from 'context/models'

export interface StoreSideScrollProps{
  data: Store[],
  cat: string
}

const StoreSideScroll: React.FC<StoreSideScrollProps> = ({data, cat}) => {
    return (
        <FlatList className='text-black'
            showsHorizontalScrollIndicator= {false} 
                data = {data.filter((item)=> item.store_category === cat)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <SmallStoreCard key={item.id} store={item}/>
                )}
                horizontal
            /> 
    );
}

export default StoreSideScroll