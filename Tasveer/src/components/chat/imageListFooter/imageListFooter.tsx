import React from 'react';
import { View, Image, ScrollView, } from 'react-native';
import responsiveStyles from './styles/styles';
import { useAppThemeColors, useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import uuid from 'react-native-uuid';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ButtonRipple from '../../general/customButton/buttonRipple';
import {Image as ImageType} from 'react-native-image-crop-picker';

type imageListFooterProps = {
    imageList: ImageType[],
    onClose?: () => void,
    onImageRemove?: (image: ImageType) => void
}
const ImageListFooter = ({
    imageList = [],
    onClose,
    onImageRemove,
}: imageListFooterProps) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();

    return (
        <View style={styles.imageFooterContainer}>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    alignItems: 'center',
                }}>
                {imageList.map(item => (
                    <View key={uuid.v4().toString()} style={styles.footerImageView}>
                        <Image source={{ uri: item.path }} style={styles.imgFooterStyle} />
                        {/* remove image button */}
                        <ButtonRipple
                            onPress={() => onImageRemove && onImageRemove(item)}
                            style={styles.btnRemoveSingleImg}
                        >
                            <IconAnt name="close" size={12} color={'white'} />
                        </ButtonRipple>
                    </View>
                ))}
            </ScrollView>

            {/* close image list button */}
            <ButtonRipple
                onPress={() => onClose && onClose()}
                style={styles.btnCloseImgList}
            >
                <IconAnt name="close" size={18} color={colors.primary1} />
            </ButtonRipple>
        </View>
    );
};

export default ImageListFooter;
