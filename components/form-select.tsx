import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CautionIcon from "assets/caution";
import { SelectItem } from "lib/utils";
import { red200 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export interface FormSelectProps {
  values: SelectItem[];
  value?: string;
  placeholder?: string;
  valid?: boolean;
  errorMessage: string;
  handleChange: (text: string) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
  values,
  value,
  placeholder,
  valid = true,
  errorMessage,
  handleChange,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  const onChoose = (val: string) => {
    setSelectedValue(val);
    handleChange(val);
  };

  return (
    <View className="flex-col items-start justify-start w-full border">
      <View
        className={`${
          valid ? "border-gray-300" : "border-red-500"
        } bg-gray-100 rounded-lg  h-12 w-[343px] justify-center overflow-hidden`}
      >
        <ScrollView>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onChoose}
            // Removed fixed height to avoid offset
            mode="dropdown" // Enables iOS native dropdown
          >
            <Picker.Item label={placeholder || "Select an option"} value="" />
            {values.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
                style={{color: '#ffffff'}}
              />
            ))}
          </Picker>
        </ScrollView>
      </View>
      {!valid && (
        <View className="flex-row items-center mt-1 gap-1">
          <CautionIcon color="red" width={24} />
          <Text className="text-sm text-gray-500">{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default FormSelect;
