import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacityProps,
  TextProps,
  ActivityIndicatorProps,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { TouchableRipple } from 'react-native-paper';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFn from 'react-native-vector-icons/Fontisto';
import { TextRegular } from '../text/text';
type btnProps = TouchableOpacityProps;

type buttonProps = {
  errorTextProps?: TextProps;
  loadingTextProp?: TextProps;
  isLoading?: boolean;
  isEmpty?: boolean;
  errorText?: string | null,
  loaderText?: string | null,
  loaderPops?: ActivityIndicatorProps;
  iconError?: React.ComponentType;
  iconEmpty?: React.ComponentType;
  iconLoader?: React.ComponentType;
  errorIconSize?: number | null;
  emptyIconSize?: number | null;
} & btnProps; // merging touchableOpacity props with my own props using &  operator

const ApiStatusIndicator = ({
  errorTextProps,
  loadingTextProp,
  errorText = null,
  loaderText = null,
  iconError: IconError,
  iconLoader: IconLoader,
  iconEmpty: IconEmpty,
  isLoading = false,
  isEmpty = false,
  loaderPops,
  errorIconSize,
  emptyIconSize,
  ...touchProps
}: buttonProps) => {
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const colors = useAppThemeColors();

  return (
    errorText || isLoading || isEmpty ?
      <TouchableRipple
        onPress={() => ''}
        {...touchProps}
        disabled={isLoading}
        style={[styles.container, touchProps.style]}
        rippleColor={'rgb(255, 114, 94,0.5)'}
        borderless>
        <>
          {/* loading */}
          {
            isLoading ?
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
              >
                {
                  IconLoader ?
                    <IconLoader />
                    :
                    <ActivityIndicator color={colors.ternary1} size={"large"}
                      {...loaderPops}
                    />
                }
                {
                  loaderText ?
                    <TextRegular
                      {...loadingTextProp}
                      style={[styles.txtLoading, loadingTextProp?.style]}>
                      {loaderText}
                    </TextRegular>
                    :
                    null
                }
              </Animated.View>
              :
              // iff error
              errorText ?
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut}
                >
                  {
                    IconError ?
                      <IconError />
                      :
                      <IconEnt name="warning" color={"tomato"} size={36} />
                  }
                  {
                    <TextRegular
                      {...errorTextProps}
                      style={[styles.txtLoading, errorTextProps?.style]}>
                      {errorText}
                    </TextRegular>
                  }
                </Animated.View>
                :
                // empty
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut}
                >
                  {
                    IconEmpty ?
                      <IconEmpty />
                      :
                      <IconFn name={"wind"} color={colors.ternary1} size={36} />
                  }
                </Animated.View>
          }
        </>
      </TouchableRipple>
      : null
  );
};

export default ApiStatusIndicator;
