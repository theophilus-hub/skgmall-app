import { View, Text, TextInput, TouchableOpacity, Image, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import React, { useRef, useState } from 'react';
import search from '../assets/images/tabs/mall/search.png';
import CancelIcon from 'assets/cancel';
import BackIcon from 'assets/back';

export interface SearchProps{
    placeholder?: string,
    value: string,
    handleChangeText?: (text: string) => void
    onFocus?: (focus: boolean) => void
}


const Search: React.FC<SearchProps> = ({placeholder, value, handleChangeText, onFocus}) => {
    const input = useRef<TextInput>(null);
    const [inFocus, setFocus] = useState(false);

    const enter = () => {
        onFocus && onFocus(true);
        setFocus(true);
    }
    const leave = () => {
        onFocus && onFocus(false);
        setFocus(false);
    }

    const cancel = () =>{
        if(input.current !== null){
            input.current.clear();
            input.current.blur();
        }
    }

    return (
        <View className='flex flex-row bg-notwhite rounded-[10px] px-3 py-1 my-2 items-center focus:border focus:border-slate-300 '>
            { !inFocus && <Image source={search} /> }
            { inFocus && <TouchableOpacity onPress={cancel}>
                <BackIcon color={"grey"} />
            </TouchableOpacity> }    
            <TextInput ref={input} onFocus={enter} onBlur={leave}
                className='text-black opacity-80 font-inter font-medium text-sm px-2' style={{ flex: 1 }}
                placeholder='Search SKG Mall'
                placeholderTextColor='#606060'
                onChangeText={handleChangeText} /> 
      </View>
    )
}

export default Search