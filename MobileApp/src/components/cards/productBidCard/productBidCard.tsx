import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInputProps, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { fontStyle } from '../../../theme/fonts';
import { useAppSelector } from '../../../redux/hooks';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { TouchableRipple } from 'react-native-paper';

type cardType = {
    onPress?: () => void
}

const ProductBidCard = ({ onPress }: cardType) => {

    const user = useAppSelector(state => state.user.user);
    const colors = useAppThemeColors();
    const { styles } = useFunctionalOrientation(responsiveStyles);


    return (
        <TouchableRipple
            style={styles.cardView}
            onPress={onPress}
            rippleColor="rgb(255, 114, 94,0.5)"
            borderless
        >
            <>
                <View style={styles.imageView}>
                    <Image
                        style={styles.imgStyle}
                        source={require('../../../../assets/images/hardcodeImages/mouse.jpg')}
                    />
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
                        <IconAnt
                            name='clockcircleo'
                            color={colors.primary1}
                            size={18}
                            style={{ marginRight: 5 }}
                        />
                        <Text style={styles.txtDesc}
                            numberOfLines={2}
                            allowFontScaling={fontStyle.fontScale}
                        >
                            Ends at 12:30 PM
                        </Text>
                    </View>
                </View>
            </>
        </TouchableRipple>
    );

}

export default ProductBidCard;