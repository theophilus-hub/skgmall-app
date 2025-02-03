import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl, Animated, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Bell from "../../assets/images/tabs/mall/bell.png";

import Search from "../../components/search";
import { useStoresContext } from "context/shopsProvider";
import { useGlobalContext } from "context/GlobalProvider";
import MallDefault from "components/mall/default";
import MallResults from "components/mall/results";
import QueryContextProvider, { useQueryContext } from "context/queryProvider";
import MallEmpty from "components/mall/empty";
import MallCategory from "components/mall/category";
import { StoreCategory } from "context/models";

const Init = () => {
    const [refreshing, setRefreshing] = useState(false);
    const queryState = useQueryContext();
    const { refresh, loading } = useStoresContext();
    const { user } = useGlobalContext();
    const [category, setCategory] = useState<StoreCategory>();
    
    const scrollY = useRef(new Animated.Value(0)).current;
    
    const searchBarTranslateY = scrollY.interpolate({
        inputRange: [0, 70], // Adjust the range based on your header height
        outputRange: [0, -70],
        extrapolate: 'clamp',
    });

    const clearCategory = () => setCategory(undefined);
    
    const onRefresh = async () => {
        setRefreshing(true);
        await refresh();
        setRefreshing(false);
    };

    const scrolling = (event: NativeSyntheticEvent<NativeScrollEvent>) =>{
        scrollY.setValue(event.nativeEvent.contentOffset.y);
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
        )
    }

    const content = () =>{
        if(queryState.inFocus){
            return <MallResults />;
        }else if(category){
            return <MallCategory category={category} clear={clearCategory}/>
        }else if(queryState.inFocus && !queryState.loading && queryState.results.length === 0){
            return <MallEmpty />
        }
        return <MallDefault chosenCategory={setCategory}/>;
    }
    
    return (
        <SafeAreaView className="bg-white h-full">
            <View style={styles.container}>
                <Animated.View style={[styles.header, { transform: [{ translateY: searchBarTranslateY }] }]}>
                    <View className="my-4 mx-6 flex flex-row items-center justify-between">
                        <Text className="font-inter font-semibold text-black text-sm">
                            { `Hi ${user?.user_metadata.firstname} ${user?.user_metadata.lastname}, \nWhere will you order from today?` }
                        </Text>
                        <TouchableOpacity activeOpacity={0.6}>
                            <Image source={Bell} className="justify-self-end" />
                        </TouchableOpacity>
                    </View>
                    <View className="mx-6">
                        <Search value={queryState.value} handleChangeText={queryState.onQueryChange} onFocus={queryState.setFocus} />
                    </View>
                </Animated.View>
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    onScroll={scrolling}
                      scrollEventThrottle={16}
                    refreshControl={ <RefreshControl refreshing={loading} onRefresh={onRefresh} /> }>
                    { content() }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingTop: 140, // Adjust this based on your header height
        paddingBottom: 70
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

const Mall: React.FC = () =>{
    return (
        <QueryContextProvider>
            <Init />
        </QueryContextProvider>
    );
}

export default Mall;
