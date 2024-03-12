import React, { useState } from 'react';

import {
    View,
    TextInput,
    TextInputProps,
    ViewStyle
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import ButtonRipple from '../customButton/buttonRipple';



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

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
    const [text, setText] = useState<string>();
    const [focused, setFocused] = useState(false);


    return (
        <View style={[styles.container, containerStyles]}>
            <IconIo
                name='search'
                color={focused ? colors.secondary1 : colors.grey1}
                size={22}
            />
            {/* input text */}
            <TextInput
                {...inputProps}
                value={text}
                placeholder='Search'
                placeholderTextColor={colors.grey1}
                style={[styles.txtInput, inputProps?.style]}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
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
