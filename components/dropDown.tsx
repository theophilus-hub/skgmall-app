import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform,
  } from "react-native";
  import React, { useCallback, useRef, useState } from "react";
  import { AntDesign } from "@expo/vector-icons";
  
  export type OptionItem = {
    value: string;
    label: string;
  };
  
  interface DropDownProps {
    data: OptionItem[];
    onChange: (item: OptionItem) => void;
    placeholder: string;
    value?: OptionItem
  }
  
  export default function Dropdown({ data, onChange, placeholder, value }: DropDownProps) {
    const [state, setState] = useState<{ expanded: boolean, value?: OptionItem, top: number }>({ expanded: false, value, top: 0 });
    const buttonRef = useRef<View>(null);

    const toggleExpanded = () => setState((init)=> {
        console.log(init.expanded);
        return { ...init, expanded: !init.expanded }
    });

    const close = () => setState((init)=> {
        return { ...init, expanded: false }
    });
  
    const onSelect = (item: OptionItem) => {
        setState((init)=> {
            return { ...init, expanded: false, value: item }
        });
        onChange(item);
    };

    return (
        <View className="my-2" ref={buttonRef}
            onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const topOffset = layout.y;
                const heightOfComponent = layout.height;
                const finalValue = topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);

                setState((init)=> {
                    return { ...init, top: finalValue }
                });
        }}>
        <TouchableOpacity className="bg-notwhite h-[48px] flex flex-row justify-between items-center rounded-lg pl-8 pr-4 text-notblack font-semibold"
            activeOpacity={0.8}
            onPress={toggleExpanded}>
            <Text className=" text-black font-medium text-sm">{state.value?.value || placeholder}</Text>
            <AntDesign className=""  name={state.expanded ? "caretup" : "caretdown"} />
        </TouchableOpacity>
        {state.expanded ? (
            <Modal visible={state.expanded} transparent>
                <TouchableWithoutFeedback onPress={close}>
                    <View className="relative justify-center flex flex-1 items-center p-[25px] w-full">
                        <View className="bg-white   py-2 max-h-[250px] w-3/4 px-6 rounded-lg absolute">
                            <FlatList keyExtractor={(item) => item.value} data={data}
                                renderItem={({ item }) => (
                                    <TouchableOpacity activeOpacity={0.8} className="h-[40px]  px-4 font-medium text-sm flex flex-row justify-between items-center" onPress={() => onSelect(item)}>
                        <View className="flex justify-start space-x-2 items-center flex-row">
                            <View className={`h-2 w-2 ${item.label == "Bayelsa" ? 'bg-green-600' : 'bg-notblack'} rounded-full`}></View>
                        <Text className={`font-medium  text-notblack`}>{item.label}</Text>
                        </View>
                        {item.label == "Bayelsa" ? (
                            <View className="border border-green-500 py-1 px-2 rounded-full">
                            <Text className="text-xs text-green-700 font-medium">In Service</Text> 
                        </View>
                    ) : <></>}
                        
                        
                      </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={true}
                    ItemSeparatorComponent={() => (
                      <View className="h-2" />
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        ) : null}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    backdrop: {
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      position: "relative"
    },
    optionItem: {
      height: 40,
      justifyContent: "center",
    },
    separator: {
      height: 4,
    },
    options: {
      position: "absolute",
      //top: 53,
      backgroundColor: "white",
      width: "100%",
      padding: 10,
      borderRadius: 6,
      maxHeight: 250,
    },
    text: {
      fontSize: 15,
      opacity: 0.8,
    },
    button: {
      height: 50,
      justifyContent: "space-between",
      backgroundColor: "#fff",
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 15,
      borderRadius: 8,
    },
  });