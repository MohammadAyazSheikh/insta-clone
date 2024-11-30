import React, { useState } from 'react';

import {
    View,
    TextInput,
    TextInputProps,
    ViewStyle
} from 'react-native';
import IconIo from '@expo/vector-icons/Ionicons';
import IconEnt from '@expo/vector-icons/Entypo';
import ButtonRipple from '../customButton/buttonRipple';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';



type barProps = {
    rightIcon?: React.ReactNode,
    containerStyles?: ViewStyle,
    onChangeText?: (text: string) => void,
    onClear?: () => void
} & TextInputProps

const SearchBar = ({
    rightIcon,
    containerStyles,
    onChangeText,
    onClear,
    ...inputProps
}: barProps) => {

    const { styles, theme: { colors } } = useStyles(styleSheet);
    const [text, setText] = useState<string>();
    const [focused, setFocused] = useState(false);


    return (
        <View style={[styles.container, containerStyles]}>
            <IconIo
                name='search'
                color={focused ? colors.secondary1 : colors.common.grey1}
                size={22}
            />
            {/* input text */}
            <TextInput
                {...inputProps}
                value={text}
                placeholder='Search'
                placeholderTextColor={colors.common.grey1}
                style={[styles.txtInput, inputProps?.style]}
                onBlur={(e) => {
                    setFocused(false);
                    inputProps?.onBlur && inputProps.onBlur(e)
                }}
                onFocus={(e) => {
                    setFocused(true),
                        inputProps?.onFocus && inputProps.onFocus(e);
                }}
                onChangeText={
                    (val) => {
                        setText(val);
                        onChangeText && onChangeText(val)
                    }}
            />
            {/* clear button */}
            {
                text ?
                    <ButtonRipple
                        onPress={() => {
                            setText(undefined);
                            onClear && onClear()
                        }}
                    >
                        <IconEnt
                            name='cross'
                            color={colors.secondary1}
                            size={22}
                        />
                    </ButtonRipple>
                    :
                    rightIcon
            }
        </View>
    )
};

export default SearchBar;
