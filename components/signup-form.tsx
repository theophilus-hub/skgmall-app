import { StyleSheet, Text, View } from "react-native";
import FormField from "./formField";
import CautionIcon from "assets/caution";


export interface SignUpFormProps{
    placeholder: string,
    inputType: string,
    value: string,
    isValid?: boolean,
    errorMessage: string,
    handleChange: (text: string) => void
}

const SignUpForm: React.FC<SignUpFormProps> = ({ placeholder, inputType, value, errorMessage, isValid = true, handleChange }) =>{
    return (
        <View style={style.root}>
            <FormField  placeholder={placeholder} value={value} handeChangeText={handleChange} inputType={ inputType } isvalid={isValid} />
            { !isValid && (
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
    errorIcon: {
        fontSize: 16,
        color: "red"
    }
});

export default SignUpForm;