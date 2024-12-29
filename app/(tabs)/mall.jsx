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
import StoreSideScroll from "../../components/storeSideScroll";
import MainMall from "../../components/mall";

import { getData } from "../../lib/supabase";
import useSupabase from "../../lib/useSupabase";
import { data, storeCat } from "../../lib/data";

const Mall = () => {
  const { data: cat, refetch } = useSupabase(getData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // console.log(typeof cat.data.length / 3)

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <View className="">
            <View className="my-4 mx-6 flex flex-row items-center justify-between">
              <Text className="font-inter font-semibold text-black text-sm">
                Hi Theophilus Tarri, {"\n"}Where will you order from today?
              </Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Image source={Bell} className="justify-self-end" />
              </TouchableOpacity>
            </View>
            <View className="mx-6">
              <Search />
            </View>
            <View className="my-2 ml-6">
              <Text className="font-inter font-bold text-black text-base mb-2">
                Food categories
              </Text>
              <View className="">
                <CatSideScroll data={cat.data} />
              </View>
            </View>
            <MainMall data={data} catData={storeCat} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Mall;
