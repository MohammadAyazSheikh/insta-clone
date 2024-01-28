import React, {} from 'react';
import {View, Text, Image, ViewStyle} from 'react-native';
import {useFunctionalOrientation} from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import {useAppThemeColors} from '../../../utils/functions/responsiveUtils';
import {fontStyle} from '../../../theme/fonts';
import {TouchableRipple} from 'react-native-paper';

export type cardListDataType = {
  icon: any,
  title: string,
  id: any,
  routeName: any
}

type cardType = {
  containerStyles?: ViewStyle;
  title?: string;
  iconCustom?: React.ComponentType;
  imageIconSource?: any | null;
  onPress?: () => void;
};

const CardWithIcon = ({
  containerStyles,
  onPress = () => '',
  iconCustom: Icon,
  imageIconSource,
  title = 'Title',
}: cardType) => {
  const colors = useAppThemeColors();
  const {styles} = useFunctionalOrientation(responsiveStyles);

  return (
    <TouchableRipple
      style={[styles.cardView, containerStyles]}
      rippleColor={'rgb(255, 114, 94,0.5)'}
      borderless
      onPress={onPress}>
      <>
        <View style={styles.imageView}>
          {Icon ? (
            <Icon />
          ) : (
            <Image
              style={styles.imgStyle}
              source={
                imageIconSource
                  ? imageIconSource
                  : require('../../../../assets/icons/white-bread.png')
              }
            />
          )}
        </View>
        <Text
          style={styles.txtTitle}
          numberOfLines={2}
          allowFontScaling={fontStyle.fontScale}>
          {title}
        </Text>
      </>
    </TouchableRipple>
  );
};

export default CardWithIcon;
