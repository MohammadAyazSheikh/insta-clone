import React, {useState} from 'react';
import {View, TextInput, TextInputProps, ViewStyle, Text} from 'react-native';
import {useFunctionalOrientation} from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import {useAppThemeColors} from '../../../utils/functions/responsiveUtils';


type inputProps = TextInputProps;

type textBoxProp = {
  iconPosition?: 'left' | 'right';
  inputViewStyle?: ViewStyle;
  inputViewFocusStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  icon?: React.ComponentType;
  error?: string | null;
  label?: string | null;
} & inputProps; // merging textInput props with my own props using &  "and"

const TextBox = ({
  icon: Icon,
  iconPosition = 'left',
  inputViewStyle = {},
  inputViewFocusStyle = {},
  containerStyle = {},
  label,
  error,
  ...inputProps
}: textBoxProp) => {
  const {styles} = useFunctionalOrientation(responsiveStyles);
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
        ]}>
        {iconPosition == 'left' && Icon && <Icon />}
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Enter Value"
          placeholderTextColor={colors.primary2}
          {...inputProps}
          style={[styles.inputStyle, inputProps.style]}
        />
        {iconPosition == 'right' && Icon && <Icon />}
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
