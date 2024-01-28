import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  TextProps,
  ActivityIndicatorProps,
  Image,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { TouchableRipple } from 'react-native-paper';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type btnProps = TouchableOpacityProps;

type buttonProps = {
  errorTextProps?: TextProps;
  loadingTextProp?: TextProps;
  isLoading?: boolean;
  isEmpty?: boolean;
  errorText?: string | null,
  loaderText?: string,
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
  loaderText = 'Loading...',
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
                    <ActivityIndicator color={colors.primary4} size={"large"}
                      {...loaderPops}
                    />
                }
                <Text
                  {...loadingTextProp}
                  style={[styles.txtLoading, loadingTextProp?.style]}>
                  {loaderText}
                </Text>
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
                      <Image
                        source={require('../../../../assets/icons/errorPage.png')}
                        style={[styles.imgError, errorIconSize ? { width: errorIconSize, height: errorIconSize } : {}]}
                      />
                  }
                  <Text
                    {...errorTextProps}
                    style={[styles.txtLoading, errorTextProps?.style]}>
                    {errorText}</Text>
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
                      <Image
                        source={require('../../../../assets/icons/empty-cart.png')}
                        style={[styles.imgError, emptyIconSize ? { width: emptyIconSize, height: emptyIconSize } : {}]}
                      />
                  }
                </Animated.View>
          }
        </>
      </TouchableRipple>
      : null
  );
};

export default ApiStatusIndicator;
