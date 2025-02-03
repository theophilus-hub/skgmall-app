import CatSideScroll from "components/catSideScroll";
import React from "react";
import { Text, View } from "react-native";
import MainMall from "../mall";
import { useStoresContext } from "context/shopsProvider";
import { StoreCategory } from "context/models";

interface MallDefaultProps{
    chosenCategory: (cat: StoreCategory) => void
}

const MallDefault: React.FC<MallDefaultProps> = ({ chosenCategory }) =>{
    const { refresh, loading, storeCats, stores } = useStoresContext();
    
    return (
        <View>
            <View className="my-2 ml-6">
                <Text className="font-inter font-bold text-black text-base mb-2">Food categories</Text>
                <View className="">
                    <CatSideScroll data={storeCats} />
                </View>
            </View>
            <MainMall data={stores} catData={storeCats} choose={chosenCategory} />
        </View>
    );
}

export default MallDefault;