import React from 'react';
import { View, Image, ScrollView, } from 'react-native';
import styleSheet from './styles/styles';
import uuid from 'react-native-uuid';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ButtonRipple from '../../general/customButton/buttonRipple';
import {Image as ImageType} from 'react-native-image-crop-picker';
import { useStyles } from 'react-native-unistyles';

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

    const { styles,theme:{colors} } = useStyles(styleSheet);


    return (
        <View style={styles.imageFooterContainer}>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    alignItems: 'center',
                }}>
                {imageList.map(item => (
                    <View key={item?.path} style={styles.footerImageView}>
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
                <IconAnt name="close" size={18} color={"white"} />
            </ButtonRipple>
        </View>
    );
};

export default ImageListFooter;
