import React, { useState } from 'react';
import { View, Text, Image, TextInputProps, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppSelector } from '../../../redux/hooks';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { fontStyle } from '../../../theme/fonts';
import { Rating } from 'react-native-ratings';
import { TouchableRipple } from 'react-native-paper'
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';


const ProductTrendingCard = ({ }) => {

    const user = useAppSelector(state => state.user.user);
    const colors = useAppThemeColors();
    const { styles } = useFunctionalOrientation(responsiveStyles);
    const [isFav, setIsFav] = useState(false);


    return (
        <View style={styles.cardView}>
            <View style={styles.imageView}>
                <Image
                    style={styles.imgStyle}
                    source={require('../../../../assets/images/hardcodeImages/mouse.jpg')}
                />
                {/* btn fav */}
                <TouchableRipple style={styles.btnFav}
                    onPress={() => setIsFav(isFav => !isFav)}
                    rippleColor={"rgb(255, 114, 94,0.5)"}
                >
                    <IconAnt
                        name={isFav ? 'heart' : 'hearto'}
                        size={18}
                        color={colors.tomato}
                    />
                </TouchableRipple>
            </View>
            <View style={styles.content}>
                <View style={styles.txtTitleView}>
                    <Text style={styles.txtTitle}
                        numberOfLines={1}
                        allowFontScaling={fontStyle.fontScale}
                    >
                        Item Title
                    </Text>
                </View>
                <View style={styles.txtTitleView}>
                    <Text style={styles.txtDesc}
                        numberOfLines={2}
                        allowFontScaling={fontStyle.fontScale}
                    >
                        In publishing and graphic design, Lorem ipsum is a
                    </Text>
                </View>
                <View style={styles.txtTitleView}>
                    <Text style={[styles.txtTitle, { color: colors.primary1 }]}
                        numberOfLines={2}
                        allowFontScaling={fontStyle.fontScale}
                    >
                        $600  <Text style={styles.txtPriceOld}>$ 650</Text>
                    </Text>
                </View>
                <View style={styles.row}>
                    <Rating
                        type='star'
                        imageSize={14}
                        ratingCount={5}
                        startingValue={4}
                        readonly
                        tintColor={colors.secondary3}
                        onFinishRating={() => ""}
                    />
                    <Text style={[styles.txtDesc,
                    { color: '#f1c40e', marginLeft: 5 }]}
                        numberOfLines={2}
                        allowFontScaling={fontStyle.fontScale}
                    >
                        4.0
                    </Text>
                </View>
            </View>

        </View>
    );

}

export default ProductTrendingCard;