import React, { useEffect, useState } from 'react';
import { View, Text, Image, ViewStyle, Switch } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { fontStyle } from '../../../theme/fonts';
import { TouchableRipple } from 'react-native-paper';
import IconFe from 'react-native-vector-icons/Feather';
import ImageBlurLoading from 'react-native-image-blur-loading';
import { baseUrlFile } from '../../../config/url';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';


type cardType = {
  containerStyles?: ViewStyle;
  title?: string;
  subTitle?:string,
  iconCustom?: React.ComponentType;
  imageIconSource?: any | null;
  showSwitch?: boolean,
  showButtons?: boolean,
  showImage?: boolean,
  onPress?: () => void;
  onEdit?: () => void;
  onDlt?: () => void;
};

const ItemListCard = ({
  containerStyles,
  onPress = () => '',
  onEdit = () => '',
  onDlt = () => '',
  iconCustom: Icon,
  imageIconSource,
  title = 'Title',
  subTitle,
  showSwitch = true,
  showImage = true,
  showButtons = true
}: cardType) => {
  const colors = useAppThemeColors();
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Animated.View
      // entering={FadeInUp}
      // exiting={FadeOutLeft}
    >
      <TouchableRipple
        style={[styles.cardView, containerStyles]}
        rippleColor={'rgb(255, 114, 94,0.5)'}
        borderless
        onPress={onPress}>
        <>
          <View style={styles.infoView}>
            {/* icon */}
            {

              <View style={styles.imageView}>
                {Icon ? (
                  <Icon />
                ) : (

                  <ImageBlurLoading
                    style={styles.imgStyle}
                    source={
                      imageIconSource ?
                        { uri: baseUrlFile + imageIconSource }
                        :
                        require('../../../../assets/icons/placeholder-image.png')
                    }
                  />

                )}
              </View>

            }
            <View style = {{flex:1,}}>
              <Text
                style={styles.txtTitle}
                numberOfLines={1}
                allowFontScaling={fontStyle.fontScale}>
                {title}
              </Text>
             {subTitle ? <Text
                style={[styles.txtTitle,{fontWeight:'normal'}]}
                numberOfLines={1}
                allowFontScaling={fontStyle.fontScale}>
              {subTitle}
              </Text>:null}
            </View>
          </View>
          {/* controls list */}
          <View style={styles.buttonsView}>
            {
              // showSwitch ?
              //   <Switch
              //     trackColor={{ false: colors.secondary4, true: colors.primary1 }}
              //     thumbColor={isEnabled ? colors.primary2 : colors.primary3}
              //     ios_backgroundColor="#3e3e3e"
              //     onValueChange={() => setIsEnabled(prev => !prev)}
              //     value={isEnabled}
              //   />
              //   : null
            }
            {
              showButtons ?
                <>
                  <TouchableRipple
                    style={[styles.btnView]}
                    rippleColor={'rgb(255, 114, 94,0.5)'}
                    borderless
                    onPress={onEdit}>
                    <IconFe name="edit" color={colors.primary5} size={22} />
                  </TouchableRipple>
                  <TouchableRipple
                    style={[styles.btnView]}
                    rippleColor={'rgb(255, 114, 94,0.5)'}
                    borderless
                    onPress={onDlt}>
                    <IconFe name="trash-2" color={colors.primary4} size={22} />
                  </TouchableRipple>
                </>
                : null
            }
          </View>
        </>
      </TouchableRipple>
    </Animated.View>
  );
};

export default ItemListCard;
