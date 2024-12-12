import React, { useState } from 'react';
import { View, TextInput, TextInputProps, ViewStyle, Text, TextStyle } from 'react-native';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import styles from './styles/styles';


type inputProps = TextInputProps;

export type textBoxProp = {
  inputViewStyle?: ViewStyle | ViewStyle[];
  inputViewFocusStyle?: ViewStyle | ViewStyle[];
  inputViewErrStyle?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle | TextStyle[];
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode //React.ComponentType;
  error?: string | null;
  label?: string | null;
} & inputProps; // merging textInput props with my own props using &  "and"

const TextBox = ({
  iconLeft: IconLeft,
  iconRight: IconRight,
  inputViewStyle = {},
  inputViewFocusStyle = {},
  inputViewErrStyle = {},
  containerStyle = {},
  labelStyle,
  label,
  error,
  ...inputProps
}: textBoxProp) => {

  const colors = useAppThemeColors();
  const [isFocused, setFocus] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text allowFontScaling={false} style={[styles.txtLabel, labelStyle]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputView,
          inputViewStyle,
          isFocused && styles.inputViewFocus,
          isFocused && inputViewFocusStyle,
          error ? styles.inputViewErrStyle : null,
          error ? inputViewErrStyle : null
        ]}>
        {IconLeft && IconLeft}
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Enter Value"
          placeholderTextColor={colors.grey1}
          {...inputProps}
          style={[styles.inputStyle, inputProps.style]}
        />
        {IconRight && IconRight}
      </View>
      {error && (
        <Text allowFontScaling={false} style={styles.txtErr}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default TextBox;
