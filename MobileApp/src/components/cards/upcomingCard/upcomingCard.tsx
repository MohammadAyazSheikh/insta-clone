import React, { useState } from 'react';
import { View, Text, Image, StyleSheetProperties } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { fontStyle } from '../../../theme/fonts';
import { useAppSelector } from '../../../redux/hooks';
import { Rating } from 'react-native-ratings';
import { TouchableRipple } from 'react-native-paper';
import {  baseUrlFile } from '../../../config/url';
import ImageBlurLoading from 'react-native-image-blur-loading';
type cardType = {
    containerStyles?: StyleSheetProperties,
    title?: string,
    description?: string,
    rating?: number,
    price?: number,
    image?: string,
    onPress?: () => void,
    onEdit?: () => void,
    onDlt?: () => void
}



const UpcomingCard = ({
    title = "Title",
    description = "Description",
    rating = 0,
    price = 0,
    image,
    containerStyles,
    onPress = () => "",
    onEdit = () => "",
    onDlt = () => "",
}: cardType) => {

    const user = useAppSelector(state => state.user.user);
    const colors = useAppThemeColors();
    const { styles } = useFunctionalOrientation(responsiveStyles);
    const [isFav, setIsFav] = useState(false);


    return (
        <TouchableRipple
            style={[styles.cardView, containerStyles]}
            rippleColor={"rgb(255, 114, 94,0.5)"}
            borderless
            onPress={onPress}
        >
            <View
                style={[styles.cardView, containerStyles]}
            >
                <View style={styles.imageView}>
                    {
                        image ?
                            <ImageBlurLoading
                                style={styles.imgStyle}
                                source={{ uri: `${baseUrlFile}${image}` }}
                                defaultSource={require('../../../../assets/icons/placeholder-image.png')}
                            />
                            :
                            <Image
                                style={styles.imgStyle}
                                source={require('../../../../assets/icons/white-bread.png')}
                            />
                    }
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
                            {title}
                        </Text>
                    </View>
                    <View style={styles.txtTitleView}>
                        <Text style={styles.txtDesc}
                            numberOfLines={2}
                            allowFontScaling={fontStyle.fontScale}
                        >
                            {description}
                        </Text>
                    </View>
                    <View style={styles.txtTitleView}>
                        <Text style={[styles.txtTitle, { color: colors.primary1 }]}
                            numberOfLines={2}
                            allowFontScaling={fontStyle.fontScale}
                        >
                            $ {price}
                            {/* <Text style={styles.txtPriceOld}>$ 650</Text> */}
                        </Text>
                    </View>
                    <View style={styles.row}>

                        {/* rating */}
                        <Rating
                            type='star'
                            imageSize={14}
                            ratingCount={5}
                            startingValue={rating}
                            readonly
                            tintColor={colors.secondary2}
                            onFinishRating={() => ""}
                        />
                        <Text style={[styles.txtDesc,
                        { color: '#f1c40e', marginLeft: 5 }]}
                            numberOfLines={2}
                            allowFontScaling={fontStyle.fontScale}
                        >
                            {rating}
                        </Text>
                    </View>


                </View>
                <View style = {styles.btnRow}>
                    {/* Edit button*/}
                    <TouchableRipple style={styles.btnStyle}
                        onPress={onEdit}
                        rippleColor={"rgb(255, 114, 94,0.5)"}
                    >
                        <IconAnt
                            name={'edit'}
                            size={18}
                            color={colors.primary4}
                        />
                    </TouchableRipple>
                    {/* delete button */}
                    <TouchableRipple style={styles.btnStyle}
                        onPress={()=>{
                          onDlt && onDlt();
                        }}
                        rippleColor={"rgb(255, 114, 94,0.5)"}
                    >
                        <IconAnt
                            name={'delete'}
                            size={18}
                            color={colors.tomato}
                        />
                    </TouchableRipple>
                </View>
            </View>
        </TouchableRipple>
    );

}

export default UpcomingCard;