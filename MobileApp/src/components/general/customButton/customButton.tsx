import React from 'react';
import {
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  TextProps,
  ActivityIndicatorProps,
  ViewStyle,
  StyleSheetProperties,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { TouchableRipple } from 'react-native-paper';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';


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
  buttonText = 'Button Text',
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  loaderPops,
  disableStyles = {},
  ...touchProps
}: buttonProps) => {
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const colors = useAppThemeColors();

  return (
    <TouchableRipple
      onPress={() => ''}
      {...touchProps}
      style={[styles.btnView, touchProps.style,
      touchProps.disabled ? { ...styles.disableStyle, ...disableStyles } : {}
      ]}
      rippleColor={'rgb(255, 114, 94,0.5)'}
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
