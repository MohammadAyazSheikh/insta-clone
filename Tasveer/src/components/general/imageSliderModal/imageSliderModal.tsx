import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import { Slider } from '../imageSlider/imageSlider';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import {Image} from 'react-native-image-crop-picker'

type sliderProps = {
    isOpen:boolean,
    onClose:()=>void,
    scrollIndex:number,
    imageList:Image[],
}
const SliderModal = ({ isOpen, onClose, scrollIndex, imageList 
}:sliderProps) => {

    const { styles, widthToDp: w } = useFunctionalOrientation(responsiveStyles);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}
        >
            <View style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: '#000', position: 'absolute', opacity: 0.8 }
            ]} />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.SliderView}>

                        <Slider
                            imageList={imageList}
                            autoSlide={false}
                            imageStyle={styles.modalImg}
                            imageContainerStyle={styles.modalImgContainer}
                            containerStyle={{ height: '100%', width: "100%", paddingVertical:0,backgroundColor:'transparent' }}
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
            </View>
        </Modal>
    )
}
export default SliderModal;
