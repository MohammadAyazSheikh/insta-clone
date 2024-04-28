import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    Easing,
    FadeInUp,
    FadeInDown,
    interpolate,
    runOnJS,
    withTiming,
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
import useSoundRecorderHooks from "./hooks/soundRecorderhooks";
import { convertMillisToTime } from "./utils/timeConverion";

export const BUTTON_SIZE = 10;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type props = {

}

const AnimatedRecorder = ({

}: props) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    //animated value for  wave
    const metering = useSharedValue(0);

    //sound hook
    const time = useSharedValue<number>(0);
    const { onStartRecord, onStopRecord } = useSoundRecorderHooks();

    //animation hook
    const {
        animatedStyle,
        animatedRecorderStyle,
        animatedLockIconStyle,
        panGestureEvent,
        trashIconProgress,
        lockIconProgress,
        hideIcons,
    } = useSoundBtnGesture({
        onHold() {
            metering.value = 0;
            time.value = 0;
            setTimeout(() => {
                onStartRecord((e) => {
                    metering.value = withTiming(interpolate(
                        e.currentMetering!,
                        [-30, -10, 0],
                        [0, 0, 1]
                    ), { duration: 200 });
                  time.value
                    console.log(time)
                })
            }, 1000);
        },
        onRelease() {
            onStopRecord();
        },
        onDelete() {

        },
        onLock() {
            Alert.alert("Locked")
        }
    });






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
                            style={[styles.iconLottie, { width: '100%' }]}
                            source={require('../../../assets/lottieFiles/lock.json')}
                        />
                    </View>
                </Animated.View>
                {/* Quick Recorder */}
                <RecorderQuick
                    animatedStyles={animatedRecorderStyle}
                    iconProgress={trashIconProgress}
                    waveProgress={metering}
                    time={convertMillisToTime(time.value)}
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




