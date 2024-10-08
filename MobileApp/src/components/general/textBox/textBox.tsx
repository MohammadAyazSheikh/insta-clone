import React, { useState } from 'react';
import { View, TextInput, TextInputProps, ViewStyle, Text } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';


type inputProps = TextInputProps;

type textBoxProp = {
  inputViewStyle?: ViewStyle;
  inputViewFocusStyle?: ViewStyle;
  inputViewErrStyle?: ViewStyle;
  containerStyle?: ViewStyle;
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
  label,
  error,
  ...inputProps
}: textBoxProp) => {
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const colors = useAppThemeColors();
  const [isFocused, setFocus] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text allowFontScaling={false} style={styles.txtLabel}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputView,
          inputViewStyle,
          isFocused && styles.inputViewFocus,
          isFocused && inputViewFocusStyle,
          error && styles.inputViewErrStyle,
          error && inputViewErrStyle
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
