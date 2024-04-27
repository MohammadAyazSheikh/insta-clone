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
import { timeProp, useSoundPlayer } from "./hooks/soundPlayerHooks";
import moment from "moment";
const { width: deviceWidth } = Dimensions.get("window");
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation, widthToDp } from '../../utils/functions/responsiveUtils';
import ButtonRipple from '../general/customButton/buttonRipple';
import IconFa from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import IconFd from 'react-native-vector-icons/Foundation';
import { useSoundBtnGesture } from "./hooks/soundBtnGestureHook";
import RecorderQuick from "./recorderQuick";

export const BUTTON_SIZE = 10;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type props = {

}

const AnimatedRecorder = ({

}: props) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    const {
        animatedStyle,
        animatedRecorderStyle,
        animatedLockIconStyle,
        panGestureEvent,
        trashIconProgress,
        lockIconProgress,
        hideIcons
    } = useSoundBtnGesture();




    return (
        true ?
            <View style={[styles.container]}>
                {/* lock icon */}
                <Animated.View style={[
                    styles.iconLockContainer,
                    animatedLockIconStyle
                ]}>
                    <View style={styles.iconLock}>
                        <AnimatedLottieView
                            progress={lockIconProgress}
                            style={[styles.iconLottie,{width:'100%'}]}
                            source={require('../../../assets/lottieFiles/lock.json')}
                        />
                        {/* <IconFa name='lock' size={22} color={"white"} /> */}
                    </View>
                </Animated.View>
                {/* Quick Recorder */}
                <RecorderQuick
                    animatedStyles={animatedRecorderStyle}
                    iconProgress={trashIconProgress}
                />

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




