import React, { useState } from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { fontStyle } from '../../../theme/fonts';
// import {useAppSelector} from '../../../redux/hooks';
// import {Rating} from 'react-native-ratings';
import { TouchableRipple } from 'react-native-paper';
import TextBox from '../../general/textBox/textBox';
import { TextInput } from 'react-native-gesture-handler';
import ImageBlurLoading from 'react-native-image-blur-loading';
import { baseUrl } from '../../../config/url';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';

type cardType = {
  containerStyles?: ViewStyle;
  title?: string,
  subTile?: string,
  code?: string,
  quantity?: number,
  price?: number,
  supplierName?: string,
  image?: string,
  showContent?: boolean,
  onPress?: () => void,
  onInc?: () => void,
  onDec?: () => void,
};

const StockCard = ({
  image,
  title = 'title',
  subTile = 'subtitle',
  quantity = 0,
  code = '900133',
  price = 0,
  showContent = true,
  supplierName = 'Fugen Logistics',
  onDec = () => '',
  onInc = () => '',
  containerStyles, onPress = () => '' }: cardType) => {
  //   const user = useAppSelector(state => state.user.user);
  const colors = useAppThemeColors();
  const { styles } = useFunctionalOrientation(responsiveStyles);
  //   const [isFav, setIsFav] = useState(false);
  const [qty, setQty] = useState<number>(0);

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutLeft}
    >
      <TouchableRipple
        style={[styles.cardView, containerStyles]}
        rippleColor={'rgb(255, 114, 94,0.5)'}
        borderless
        onPress={onPress}>
        <View style={[styles.cardView, containerStyles]}>
          {/* top View */}
          <View style={styles.topView}>
            {/* image info row */}
            <View style={styles.imageInfoRow}>
              <View style={styles.imageView}>
                {
                  image ?
                    <ImageBlurLoading
                      style={styles.imgStyle}
                      source={{ uri: `${baseUrl}assets/uploads/${image}` }}
                    />
                    :
                    <Image
                      style={styles.imgStyle}
                      source={require('../../../../assets/icons/white-bread.png')}
                    />
                }
                {/* btn fav */}
                {/* <TouchableRipple style={styles.btnFav}
                        onPress={() => setIsFav(isFav => !isFav)}
                        rippleColor={"rgb(255, 114, 94,0.5)"}
                    >
                        <IconAnt
                            name={isFav ? 'heart' : 'hearto'}
                            size={18}
                            color={colors.tomato}
                        />
                    </TouchableRipple> */}
              </View>
              <View style={styles.imageTextView}>
                <Text
                  style={styles.txtTitle}
                  numberOfLines={2}
                  allowFontScaling={fontStyle.fontScale}>
                  {title}
                </Text>
                <Text
                  style={[styles.txtDesc, { color: colors.primary1 }]}
                  numberOfLines={1}
                  allowFontScaling={fontStyle.fontScale}>
                  {subTile}
                </Text>
              </View>
            </View>
            {/* quantity row */}
            <View style={styles.qtyRow}>
              {/* plus button */}
              <TouchableRipple
                style={{ borderRadius: 100, padding: 4 }}
                rippleColor={'rgb(255, 114, 94,0.5)'}
                borderless
                onPress={onInc}>
                <IconAnt name="pluscircle" color={colors.primary4} size={20} />
              </TouchableRipple>

              {/* text box */}
              <TextBox
                editable={false}
                inputViewStyle={styles.inputStyle}
                containerStyle={styles.inputContainer}
                placeholder="Ex: 20"
                style={{ color: colors.secondary2 }}
                inputViewFocusStyle={{ borderColor: colors.primary4 }}
                keyboardType="numeric"
                value={String(quantity)}
                onChangeText={val => {
                  // if (parseInt(val) > -1) {
                  //   setQty(parseInt(val));
                  // }
                  // if (val == '') {
                  //   setQty(0);
                  // }
                }}
              />
              {/* minus button */}
              <TouchableRipple
                style={{ borderRadius: 100, padding: 4 }}
                rippleColor={'rgb(255, 114, 94,0.5)'}
                borderless
                onPress={onDec}>
                <IconAnt name="minuscircle" color={colors.primary4} size={20} />
              </TouchableRipple>
            </View>
          </View>
          {showContent && <View style={styles.content}>
            {<View style={styles.txtTitleView}>
              <Text
                style={styles.txtTitle}
                numberOfLines={1}
                allowFontScaling={fontStyle.fontScale}>
                Purchase Price: $ {price}
              </Text>
            </View>}
            <View style={styles.txtTitleView}>
              <Text
                style={[styles.txtTitle, { color: colors.primary1 }]}
                numberOfLines={2}
                allowFontScaling={fontStyle.fontScale}>
                {supplierName}
              </Text>
            </View>
            <View style={styles.txtTitleView}>
              <Text
                style={styles.txtDesc}
                numberOfLines={2}
                allowFontScaling={fontStyle.fontScale}>
                {code}
              </Text>
            </View>

            {/* <View style={styles.row}>
            <Rating
              type="star"
              imageSize={14}
              ratingCount={5}
              startingValue={4}
              readonly
              tintColor={colors.secondary3}
              onFinishRating={() => ''}
            />
            <Text
              style={[styles.txtDesc, {color: '#f1c40e', marginLeft: 5}]}
              numberOfLines={2}
              allowFontScaling={fontStyle.fontScale}>
              4.0
            </Text>
          </View> */}
          </View>}
        </View>
      </TouchableRipple>
    </Animated.View>
  );
};

export default StockCard;
