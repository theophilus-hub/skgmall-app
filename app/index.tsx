import { useGlobalContext } from "context/GlobalProvider";
import { useSettings } from "context/settingsContext";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { Text, View } from "react-native";

const Spalsh = () =>{
    const { loading, firstVisit, credentials, autoLogin } = useSettings();
    const globalState = useGlobalContext();

    const init = useCallback(()=>{
        if(!loading){
            if(credentials && autoLogin){
                globalState.login(credentials).then(()=>{
                    router.replace('/(tabs)/mall');
                }).catch((error)=>{
                    console.error(`Failed to signin because of ${error}`);
                    router.replace('/signin');
                });
            }else{
                if(firstVisit){
                    console.log("this is my first time")
                }
                console.log(`here we go again ${firstVisit ? '/welcome' : '/signin'}`)
                router.replace(firstVisit ? '/welcome' : '/(auth)/signin');
            }
        }
    }, [loading]);

    useEffect(init, [loading, init]);

    return (
        <View style={{ flexDirection: "column", height: "100%", alignItems: "center", padding: 10 }}>
            <Text style={{ flex: 1, textAlign: "center", verticalAlign: "middle" }}>Welcome to SKG MAll</Text>
        </View>
    );
}

export default Spalsh;