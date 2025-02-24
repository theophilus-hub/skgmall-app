import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { useEditContext } from 'context/editContext';
import EditField from 'components/editField';

export interface EditInfoProps {
  label: string;
  value: string;
  id: string;
  type: string;
}

const EditInfo: React.FC<EditInfoProps> = ({ label, value, id,type }) => {
  const { activeEdit, setActiveEdit } = useEditContext();
  const isEditing = activeEdit === id;

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setActiveEdit(null); // Reset active edit on navigation
      };
    }, [])
  );

  useEffect(() => {
    if (!isEditing) {
      setActiveEdit(null); // Reset when another component is clicked
    }
  }, [isEditing]);

  const edit = () => {
    setActiveEdit(isEditing ? null : id);
  };

  return (
    <View className="my-4">
      <View className={!isEditing ? 'flex' : 'hidden'}>
        <View className="flex flex-row justify-between px-6">
        
             <View>
            <Text className="font-semibold text-sm">{label}</Text>
            <Text className="text-notblack text-sm font-normal">{value}</Text>
          </View>
  
         
          <TouchableOpacity onPress={edit}>
            <Text className="text-primary font-semibold text-sm">Edit</Text>
          </TouchableOpacity>
        </View>


       
      </View>

      <View className={isEditing ? 'flex' : 'hidden'}>
        <View className="flex flex-row justify-between items-start px-6">
          <View className='pr-6'>
          <Text className="font-semibold text-sm">{label}</Text>
          </View>
          <TouchableOpacity onPress={edit}>
            <Text className="text-primary font-semibold text-sm">Update</Text>
          </TouchableOpacity>
        </View>
        <View className='px-6'>
        <EditField placeholder={value} value=''/>
        </View>
      </View>
    </View>
  );
};

export default EditInfo;
