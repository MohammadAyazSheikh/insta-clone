import React from 'react';
import {
    Modal, View, Pressable
} from 'react-native';
import responsiveStyles from './styles/styles';
import { useAppThemeColors, useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../../routes/rootStack/rootNavigation';
import { useNavigation } from '@react-navigation/native';
import AttachmentButton from './attachmentBtn';
import IconFe from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import { pickMultipleImage } from '../../../utils/functions/imagePicker';
import { pickSingleDocument } from '../../../utils/functions/documentPicker';
import { Image as ImageType } from 'react-native-image-crop-picker';
import { DocumentPickerResponse } from 'react-native-document-picker';

type attachSheetProps = {
    show: boolean,
    onClose: () => void,
    onBtnSound?: () => void,
    onBtnVideo?: () => void,
    onBtnCamera?: () => void,
    onBtnLocation?: () => void,
    setImageList: React.Dispatch<React.SetStateAction<ImageType[]>>,
    imageList: ImageType[],
    setDocument: React.Dispatch<React.SetStateAction<DocumentPickerResponse | undefined>>
}

const AttachmentSheet = ({
    show,
    onClose,
    setImageList,
    imageList,
    onBtnSound,
    onBtnVideo,
    onBtnCamera,
    onBtnLocation,
    setDocument
}: attachSheetProps) => {

    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { styles } = useFunctionalOrientation(responsiveStyles);
    // const colors = useAppThemeColors();


    //animations
    const animValue = useSharedValue(0);

    const openSheet = () => {
        animValue.value = withTiming(1, { duration: 200 });
    };

    const closeSheet = () => {
        animValue.value = withTiming(0, { duration: 200 }, () => {
            runOnJS(onClose)();
        });
    };


    const inputRange = [0, 0.5, 1];

    const stylesAnim = useAnimatedStyle(() => {

        const scaleY = interpolate(
            animValue.value,
            inputRange,
            [0, 0.5, 1],
            Extrapolate.CLAMP
        );

        const translateY = interpolate(
            animValue.value,
            inputRange,
            [500, 250, 0],
            Extrapolate.CLAMP
        );


        return {
            transform: [
                { scaleY },
                // {translateY}
            ],
        };

    });



    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
            onRequestClose={closeSheet}
            onShow={() => openSheet()}
        >
            {/* backdrop */}
            <View
                style={styles.backDrop}
            />
            {/* container */}
            <Pressable
                style={styles.containerAttach}
                onPress={() => closeSheet()}
            >
                <Animated.View style={[styles.attachBox, stylesAnim]}>
                    <View style={styles.row}>
                        {/* images */}
                        <AttachmentButton
                            backgroundColor='#C861FA'
                            name='Images'
                            icon={<IconFe
                                onPress={() => {
                                    pickMultipleImage((images) => {
                                        // if (imageList?.length && setImageList)
                                        setImageList(
                                            [...imageList, ...images]
                                        );
                                        closeSheet();
                                    })
                                }}
                                name='image'
                                color={"white"}
                                size={30}
                            />}
                        />
                        {/* videos */}
                        <AttachmentButton
                            backgroundColor='#FE2E74'
                            name='Video'
                            onPress={() => {
                                onBtnVideo && onBtnVideo();
                                closeSheet();
                            }}
                            icon={<IconEnt
                                name='video'
                                color={"white"}
                                size={30}
                            />}
                        />

                        {/* camera */}
                        <AttachmentButton
                            backgroundColor='#F96633'
                            name='Camera'
                            onPress={() => {
                                onBtnCamera && onBtnCamera();
                                closeSheet();
                            }}
                            icon={<IconEnt
                                name='camera'
                                color={"white"}
                                size={30}
                            />}
                        />
                    </View>
                    <View style={styles.row}>
                        {/* document */}
                        <AttachmentButton
                            backgroundColor='#7f66ff'
                            name='Document'
                            icon={<IconFe
                                name='file'
                                color={"white"}
                                size={30}
                            />}

                            onPress={() => {
                                pickSingleDocument()
                                    .then(res => {
                                        res && setDocument(res);
                                    }).finally(() => {
                                        closeSheet();
                                    })

                            }}
                        />
                        {/* locations */}
                        <AttachmentButton
                            backgroundColor='#EDC113'
                            name='Location'
                            icon={<IconEnt
                                name='location'
                                color={"white"}
                                size={30}
                            />}
                            onPress={onBtnLocation && onBtnLocation}
                        />
                        {/* sound */}
                        <AttachmentButton
                            onPress={() => {
                                onBtnSound && onBtnSound();
                                closeSheet();
                            }}
                            backgroundColor='#009DE0'
                            name='Audio'
                            icon={<IconAnt
                                name='sound'
                                color={"white"}
                                size={30}
                            />}
                        />
                    </View>
                </Animated.View >

            </Pressable>
        </Modal >
    );
};

export default AttachmentSheet;