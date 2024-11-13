import React from 'react';
import {
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  TextProps,
  ActivityIndicatorProps,
  ViewStyle,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import styleSheet from './styles';
import { useStyles } from 'react-native-unistyles';
import { UnistylesRuntime } from 'react-native-unistyles'

type btnProps = TouchableOpacityProps;

type buttonProps = {
  iconPosition?: 'left' | 'right';
  textProps?: TextProps;
  buttonText?: string;
  isLoading?: boolean;
  loaderPops?: ActivityIndicatorProps;
  disableStyles?: ViewStyle,
  icon?: React.ComponentType;
} & btnProps; // merging touchableOpacity props with my own props using &  operator

const CustomButton = ({
  textProps,
  buttonText = 'Submit',
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  loaderPops,
  disableStyles = {},
  ...touchProps
}: buttonProps) => {

  const { styles, theme: { colors } } = useStyles(styleSheet);

  const isDark = UnistylesRuntime.themeName == "dark";
 

  return (
    <TouchableRipple
      onPress={() => ''}
      {...touchProps}
      style={[styles.btnView, touchProps.style,
      touchProps.disabled ? { ...styles.disableStyle, ...disableStyles } : {}
      ]}
      rippleColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(000,000,000,0.2)'}
      borderless
    >
      <>
        {Icon && iconPosition == 'left' && <Icon />}
        <Text
          numberOfLines={1}
          {...textProps}
          style={[styles.txtBtn, textProps?.style]}>
          {buttonText}
        </Text>
        {Icon && iconPosition == 'right' && <Icon />}
        {isLoading && (
          <ActivityIndicator
            color={colors.secondary1}
            size={'small'}
            style={{ marginLeft: 5 }}
            {...loaderPops}
          />
        )}
      </>
    </TouchableRipple>
  );
};

export default CustomButton;
