import Dropdown, { OptionItem } from "components/dropDown";
import { useUserEditContext } from "context/editContext";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface EditDropdownProps {
    label: string;
    enbaled?: boolean;
    data: OptionItem[];
    value: string

    requestUpdate: (label: string, value: string) => Promise<void>
    updateFailed: (label: string, error: any) => void
}


const EditDropdown: React.FC<EditDropdownProps> = ({ label, value, enbaled = true, data, requestUpdate, updateFailed }) =>{
    const { active, makeActive, done } = useUserEditContext();
    const [state, setState] = useState<{ selected?: OptionItem, loading: boolean }>({ selected: undefined, loading: false });

    const isEditing = active === label;
    useEffect(()=>{
        if(!isEditing && state.selected){
            setState({ selected: undefined, loading: false });
        }
    }, [active, isEditing]);
    
    const edit = () => makeActive(label);
    const update = () =>{
        if(state.selected){
            setState(init => { return { ...init, loading: true } });
            requestUpdate(label, state.selected.label).then(()=>{
                done();
            }).catch((error)=>{
                updateFailed(label, error);
            }).finally(()=> setState(init => { return { ...init, loading: false } }));
        }
    }

    const valueChange = (selected: OptionItem) => setState(init => { return { ...init, selected } });
    
    return (
        <View className="my-4">
            { !isEditing && (
                <View>
                    <View className="flex flex-row justify-between px-6">
                        <View>
                            <Text className="font-semibold text-sm">{label}</Text>
                            <Text className="text-notblack text-sm font-normal">{value}</Text>
                        </View>
                        { enbaled && (
                            <TouchableOpacity onPress={edit}>
                                <Text className="text-primary font-semibold text-sm">Edit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
            
            { isEditing && 
                <View>
                    <View className="flex flex-row justify-between items-start px-6">
                        <View className='pr-6'>
                            <Text className="font-semibold text-sm">{label}</Text>
                        </View>
                        { !state.loading  && (
                            <TouchableOpacity onPress={update}>
                                <Text className="text-primary font-semibold text-sm">Update</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                <View className='px-6'>
                    <Dropdown placeholder={value} onChange={valueChange} value={state.selected} data={data} cancel={done}/>
                </View>
          </View>
        }
    </View>
    );
}

export default EditDropdown;