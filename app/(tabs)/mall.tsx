import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Bell from "../../assets/images/tabs/mall/bell.png";

import Search from "../../components/search";
import CatSideScroll from "../../components/catSideScroll";
//import StoreSideScroll from "../../components/storeSideScroll";
import MainMall from "../../components/mall";

//import { getData } from "../../lib/supabase";
//import useSupabase from "../../lib/useSupabase";
import { useStoresContext } from "context/shopsProvider";
import { useGlobalContext } from "context/GlobalProvider";
//import { data, storeCat } from "../../lib/data";

const Mall = () => {
  //const { data: cat, refetch } = useSupabase(getData);
  const [refreshing, setRefreshing] = useState(false);
  const { refresh, loading, storeCats, stores } = useStoresContext();
  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  // console.log(typeof cat.data.length / 3)

  return (
    <SafeAreaView className="bg-white h-full">
        <ScrollView refreshControl={ <RefreshControl refreshing={loading} onRefresh={onRefresh} /> }>
            <View className="my-4 mx-6 flex flex-row items-center justify-between">
                <Text className="font-inter font-semibold text-black text-sm">
                    { `Hi ${user?.user_metadata.firstname} ${user?.user_metadata.lastname}, \nWhere will you order from today?` }
                </Text>
                <TouchableOpacity activeOpacity={0.6}>
                    <Image source={Bell} className="justify-self-end" />
                </TouchableOpacity>
            </View>
            <View className="mx-6">
                <Search value={""} />
            </View>
            <View className="my-2 ml-6">
                <Text className="font-inter font-bold text-black text-base mb-2">Food categories</Text>
                <View className="">
                    <CatSideScroll data={storeCats} />
                </View>
            </View>
            <MainMall data={stores} catData={storeCats} />
        </ScrollView>
    </SafeAreaView>
  );
};

export default Mall;
