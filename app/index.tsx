import { useSettings } from "context/settingsContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const Spalsh = () =>{
    const { loading, firstVisit } = useSettings();

    useEffect(()=>{
        if(!loading && firstVisit !== undefined){
            router.replace(firstVisit ? '/welcome' : '/signin');
        }
    }, [loading, firstVisit]);

    return (
        <View style={{ flexDirection: "column", height: "100%", alignItems: "center", padding: 10 }}>
            <Text style={{ flex: 1, textAlign: "center", verticalAlign: "middle" }}>Welcome to SKG MAll</Text>
            <Text>Loading.....</Text>
        </View>
    );
}

export default Spalsh;