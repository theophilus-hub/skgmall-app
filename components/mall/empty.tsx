import { useQueryContext } from "context/queryProvider";
import React from "react";
import { Text, View } from "react-native";

const MallEmpty: React.FC = () =>{
    const queryState = useQueryContext();
    
    return (
        <View>
            <Text>Mall Results</Text>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No results found</Text>
            </View>
        </View>
    );
}

export default MallEmpty;