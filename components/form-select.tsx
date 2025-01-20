import CautionIcon from "assets/caution";
import { SelectItem } from "lib/utils"
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

export interface FormSelectProps{
    values: SelectItem[],
    value?: string,
    placeholder?: string, 
    valid?: boolean,
    errorMessage: string,
    handleChange: (text: string) => void
}

const FormSelect: React.FC<FormSelectProps> = ({ values, value, placeholder, valid = true, errorMessage, handleChange }) =>{
    const onChoose = (value: string, index: number) =>{
        if(value){
            console.log(value);
            handleChange(value);
        }
    }
    return (
        <View style={style.root}>
            <View className={'flex bg-notwhite w-[343px] h-[48] rounded-[10px] my-2 pl-6 content-center items-center ' + (valid ? "focus:border-slate-300 focus:border-2" : "border-red-300 border-2")}>
                <RNPickerSelect onValueChange={onChoose}  placeholder={{ label: placeholder, value: null }} items={values} />
            </View>
            { !valid && (
                <View style={style.errorContainer}>
                    <CautionIcon color={"red"}  width={24}/>
                    <Text style={style.errorMessage}>{errorMessage}</Text>
                </View>
            ) }
        </View>
    );
}

const style = StyleSheet.create({
    root: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    errorMessage: {
        fontSize: 14,
        color: "grey"
    },
});

export default FormSelect;