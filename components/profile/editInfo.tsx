import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import EditField from 'components/editField';
import { useUserEditContext } from 'context/editContext';

export interface EditInfoProps {
    label: string;
    value: string;
    type: string;
    enbaled?: boolean;

    requestUpdate: (label: string, value: string) => Promise<void>
    updateFailed: (label: string, error: any) => void
}

const EditInfo: React.FC<EditInfoProps> = ({ label, value,type, enbaled = true, requestUpdate, updateFailed }) => {
    const { active, makeActive, done } = useUserEditContext();
    const [state, setState] = useState({ value: "", loading: false });
    
    const isEditing = active === label;
    useEffect(()=>{
        if(!isEditing && state.value.length > 0){
            setState({ value: "", loading: false });
        }
    }, [active, isEditing])
    
    const edit = () => makeActive(label);
    const update = () =>{
        setState(init => { return { ...init, loading: true } });
        requestUpdate(label, state.value).then(()=>{
            done();
        }).catch((error)=>{
            updateFailed(label, error);
        }).finally(()=> setState(init => { return { ...init, loading: false } }));
    }

    const valueChange = (value: string) => setState(init => { return { ...init, value } });

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
                            { !state.loading && <Text className="text-primary font-semibold text-sm">Edit</Text> }
                            { state.loading && <Text>Loading...</Text> }
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
                    <EditField placeholder={value} handeChangeText={valueChange} value={state.value} cancel={done}/>
                </View>
          </View>
        }
    </View>
  );
};

export default EditInfo;
