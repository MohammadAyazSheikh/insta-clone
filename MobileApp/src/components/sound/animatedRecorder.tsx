import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
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
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import ButtonRipple from '../general/customButton/buttonRipple';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFd from 'react-native-vector-icons/Foundation';
import { useSoundBtnGesture } from "./hooks/soundBtnGestureHook";


type props = {

}

const AnimatedRecorder = ({

}: props) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    const { animatedStyle,animatedLockIconStyle, panGestureEvent } = useSoundBtnGesture();




    return (
        <View style={[styles.container]}>
            <GestureDetector gesture={panGestureEvent}>
                <Animated.View style={[
                    styles.btnRecorder,
                    animatedStyle
                ]}>
                    <IconFa name='microphone' size={22} color={"white"} />
                </Animated.View>
            </GestureDetector>
             {/* lock icon */}
             <Animated.View style = {[
                    styles.iconLock,
                    // animatedLockIconStyle
                ]}>
                <IconFa name='lock' size={22} color={"white"} />
                </Animated.View>
        </View>
    )

}

export default AnimatedRecorder;




