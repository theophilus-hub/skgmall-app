import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import NextArrow from '../assets/images/tabs/mall/next.png'
import StoreSideScroll from './storeSideScroll';
import { Store, StoreCategory } from 'context/models';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export interface MallProps{
    data: Store[],
    catData: StoreCategory[],
    choose?: (category: StoreCategory) => void
}

const Mall: React.FC<MallProps> = ({data, catData, choose}) => {
  return (
    <View>
        { catData.map((item)=>{
            return <View className='my-6' key={item.id}>
                <View className='flex flex-row justify-between mx-6'>
                    <Text className='font-inter font-bold text-black text-base my-2'>{item.name}</Text>
                    <View>
                        <TouchableOpacity className='flex flex-row' onPress={() =>{ choose && choose(item); }}>
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
        }) }
    </View>)
}

export default Mall