import { View, Text, TextInput, TouchableOpacity, Image, NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import React, { PropsWithRef, useEffect, useRef, useState } from 'react';
import search from '../assets/images/tabs/mall/search.png';
import BackIcon from 'assets/back';
interface SearchProps extends TextInputProps{
    onFocusChange?: (focus: boolean) => void
}

export interface SearchInputRef {
    focus: () => void;
    clear: () => void;
}

const Search = React.forwardRef<SearchInputRef, PropsWithRef<SearchProps>>((props, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [inFocus, setFocus] = useState(false);

    // Expose methods to the parent component via ref
    React.useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        clear: () => {
            inputRef.current?.clear();
            inputRef.current?.blur();
        },
    }));
    
    const enter = () => {
        props.onFocusChange && props.onFocusChange(true);
        setFocus(true);
    }
    const leave = () => {
        props.onFocusChange && props.onFocusChange(false);
        setFocus(false);
    }

    const cancel = () =>{
        if(inputRef.current !== null){
            inputRef.current.clear();
            inputRef.current.blur();
        }
    }

    return (
        <View className='flex flex-row bg-notwhite rounded-[10px] px-3 py-1 my-2 items-center focus:border focus:border-slate-300 '>
            { !inFocus && <Image source={search} /> }
            { inFocus && <TouchableOpacity onPress={cancel}>
                <BackIcon color={"grey"} />
            </TouchableOpacity> }    
            <TextInput ref={inputRef} onFocus={enter} onBlur={leave}
                className='text-black opacity-80 font-inter font-medium text-sm px-2' style={{ flex: 1 }}
                placeholder='Search SKG Mall'
                placeholderTextColor='#606060'
                onChangeText={props.onChangeText} /> 
      </View>
    )
});

export default Search