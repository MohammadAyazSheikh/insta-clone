import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    Easing,
    FadeInUp,
    FadeInDown,
} from 'react-native-reanimated';
import { TouchableRipple } from "react-native-paper";
import IconEnt from 'react-native-vector-icons/Entypo';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import { useGestureAnimation } from "./hooks/sliderAnimationHooks";
import { TextRegular } from "../general/text/text";
import { timeProp, useSoundPlayer } from "./hooks/soundPayerHooks";
import moment from "moment";
const { width: deviceWidth } = Dimensions.get("window");
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation, widthToDp } from '../../utils/functions/responsiveUtils';
import ButtonRipple from '../general/customButton/buttonRipple';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFd from 'react-native-vector-icons/Foundation';
import { useSoundBtnGesture } from "./hooks/soundBtnGestureHook";

export const BUTTON_SIZE = 10;

type props = {

}

const AnimatedRecorder = ({

}: props) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    const { animatedStyle, animatedLockIconStyle, panGestureEvent, hideIcons } = useSoundBtnGesture();




    return (
        true ?
            <View style={[styles.container]}>
                {/* lock icon */}
                <Animated.View style={[
                    styles.iconLockContainer,
                    animatedLockIconStyle
                ]}>
                    <View style = {styles.iconLock}>
                    <IconFa name='lock' size={22} color={"white"} />
                    </View>
                </Animated.View>
                {/* sound button */}
                <GestureDetector gesture={panGestureEvent}>
                    <Animated.View style={[
                        styles.btnRecorder,
                        animatedStyle
                    ]}>
                        <IconFa name='microphone' size={22} color={"white"} />
                    </Animated.View>
                </GestureDetector>

            </View>
            :
            <View style={styles.recorderView}>

                <Animated.View style={styles.recorderContainer}
                    // entering={FadeInDown}
                >

                </Animated.View>
            </View>
    )

}

export default AnimatedRecorder;




