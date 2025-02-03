import { useQueryContext } from "context/queryProvider";
import React from "react";
import { Text, View } from "react-native";

const MallResults: React.FC = () =>{
    const queryState = useQueryContext();
    
    return (
        <View>
            <Text>Mall Results</Text>
            <View style={{ flex: 1 }}>
                { queryState.results }
            </View>
        </View>
    );
}

export default MallResults;