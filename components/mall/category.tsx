import BackFilledIcon from "assets/back-filled";
import SmallStoreCard from "components/smallStoreCard";
import StoreCard from "components/storeCard";
import { StoreCategory } from "context/models";
import { useStoresContext } from "context/shopsProvider";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MallCategoryProps{
    category?: StoreCategory,
    clear?: () => void
}

const MallCategory: React.FC<MallCategoryProps> = ({ category, clear }) => {
    const { stores } = useStoresContext();
    
    return (
        <View className="px-6 pt-2" style={{ flexDirection:"column", gap: 20, paddingBottom: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={clear}>
                    <BackFilledIcon color={"grey"} width={28} height={28}/>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{ `All ${category?.name}` }</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "stretch", gap: 16 }}>
            { stores.filter((store)=> store.store_category === category?.uid).map((item)=>{
                return (
                    <StoreCard store={item} key={item.id}/>
                )
            })}
            </View>
        </View>
    );
}

export default MallCategory;