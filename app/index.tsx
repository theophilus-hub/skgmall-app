import { useGlobalContext } from "context/GlobalProvider";
import { useSettings } from "context/settingsContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const Spalsh = () =>{
    const { loading, firstVisit, credentials, autoLogin } = useSettings();
    const globalState = useGlobalContext();

    useEffect(()=>{
        if(!loading){
            if(credentials && autoLogin){
                globalState.login(credentials).then((_)=>{
                   
                    router.replace('/(tabs)/mall');
                }).catch((error)=>{
                    console.error(`Failed to signin because of ${error}`);
                    router.replace('/signin');
                });
            }else{
                router.replace(firstVisit ? '/welcome' : '/signin');
            }
        }
    }, [loading, firstVisit]);

    return (
        <View style={{ flexDirection: "column", height: "100%", alignItems: "center", padding: 10 }}>
            <Text style={{ flex: 1, textAlign: "center", verticalAlign: "middle" }}>Welcome to SKG MAll</Text>
        </View>
    );
}

export default Spalsh;