import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import styleSheet from './styles/styles';
import { Image } from 'react-native-image-crop-picker'
import { MediaSlider } from '../mediaSlider/mediaSlider';
import ModalWrapper from '../../modals/modalWrapper';
import { useStyles } from 'react-native-unistyles';

type sliderProps = {
    isOpen: boolean,
    onClose: () => void,
    scrollIndex: number,
    imageList: Image[],
}
const SliderModal = ({ isOpen, onClose, scrollIndex, imageList
}: sliderProps) => {


    const mediaList = useMemo(() => {
        return imageList?.map((img) =>
        ({
            id: img?.filename,
            uri: { uri: img?.path },
            type: "image"
        })
        )
    }, [imageList]);



    const { styles} = useStyles(styleSheet);
    return (
        <ModalWrapper
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <View style={styles.SliderView}>
                    <MediaSlider
                        mediaList={mediaList}
                        autoSlide={false}
                        mediaContainer={styles.modalImgContainer}
                        indicatorRowContainerStyle={{ justifyContent: 'center' }}
                        containerStyle={{ height: '100%', width: "100%", paddingVertical: 0, backgroundColor: 'transparent' }}
                        indicatorType='image'
                        indicatorSize={20}
                        indicatorRadius={3}
                        indicatorColor={colors.primary1}
                        indicatorContainerWidth={100}
                        scrollIndex={scrollIndex}
                    />
                </View>
                <Pressable
                    style={styles.btnStyle}
                    onPress={() => onClose()}
                >
                    <Icon name='closecircle' size={25} color={colors.secondary1} />
                </Pressable>
            </View>
        </ModalWrapper>
    )
}
export default SliderModal;
