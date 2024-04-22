import React from 'react';
import { View, Text, TextProps, TouchableOpacity, ViewProps } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../../routes/rootStack/rootNavigation';
import { TextBold } from '../text/text';
import SearchBarAnimated from './searchBarAnimated';
import { TouchableRipple } from 'react-native-paper';
import ButtonRipple from '../customButton/buttonRipple';
type props = {
  showSearchBar?: boolean,
  containerProps?: ViewProps;
  headingPosition?: 'center' | 'left' | 'right';
  title?: string;
  titleProps?: TextProps;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: React.ComponentType;
  rightIcon?: React.ComponentType;
  centerIcon?: React.ComponentType;
  onPressRight?: () => void;
  onPressLeft?: () => void;
  onSearchClose?: () => void;
  onChangeText?: (text: string) => void;
  iconLeftColor?: string;
  iconRightColor?: string;
};



const Header = ({
  showSearchBar = false,
  containerProps,
  headingPosition = 'center',
  title = 'Screen',
  titleProps,
  showLeftIcon = true,
  showRightIcon = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  centerIcon: CenterIcon,
  onPressRight,
  onPressLeft,
  onSearchClose,
  onChangeText,
  iconLeftColor,
  iconRightColor,
}: props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
  const { styles, isPortrait, heightToDp, widthToDp } =
    useFunctionalOrientation(responsiveStyles);
  const colors = useAppThemeColors();

  if (showSearchBar)
    return (
      <SearchBarAnimated
        onBack={onSearchClose}
        onChangeText={onChangeText}
      />
    );

  return (

    <View {...containerProps} style={[styles.container, containerProps?.style]}>
      <View style={styles.btnLeftContainer}>
        {/* left icon */}
        <ButtonRipple
          onPress={onPressLeft ? onPressLeft : () => navigation.goBack()}>
          {showLeftIcon ? (
            LeftIcon ? (
              <LeftIcon />
            ) : (
              <IconAnt
                name="left"
                size={26}
                color={iconLeftColor ?? colors.secondary1}
              />
            )
          ) : null}


        </ButtonRipple>
        {headingPosition == 'left' ? (
          <TextBold
            numberOfLines={1}
            {...titleProps}
            style={[styles.txtHeader,{marginLeft:10}, titleProps?.style]}>
            {title}
          </TextBold>
        ) : null}
      </View>
      {/* center icon */}
      {CenterIcon ? <CenterIcon /> : null}
      {/* title */}
      {headingPosition == 'center' ? (
        <TextBold
          numberOfLines={1}
          {...titleProps}
          style={[styles.txtHeader, titleProps?.style]}>
          {title}
        </TextBold>
      ) : null}
      {/* right icon */}
      <View style={styles.btnRightContainer}>
        <ButtonRipple
          onPress={onPressRight && onPressRight}>
          {showRightIcon ? (
            RightIcon ? (
              <RightIcon />
            ) : (
              <IconAnt
                name="right"
                size={26}
                color={iconRightColor ?? colors.secondary1}
              />
            )
          ) : null}
        </ButtonRipple>
        {headingPosition == 'right' ? (
          <TextBold
            numberOfLines={1}
            {...titleProps}
            style={[styles.txtHeader, titleProps?.style]}>
            {title}
          </TextBold>
        ) : null}
      </View>
    </View>
  );
};
export default Header;
