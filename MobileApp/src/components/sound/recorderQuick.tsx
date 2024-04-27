import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    Easing,
    FadeInUp,
    FadeInDown,
    SharedValue,
} from 'react-native-reanimated';


import IconEnt from 'react-native-vector-icons/Entypo';
import LottieView from 'lottie-react-native';

import { TextRegular } from "../general/text/text";
import { timeProp, useSoundPlayer } from "./hooks/soundPlayerHooks";
import moment from "moment";
const { width: deviceWidth } = Dimensions.get("window");
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation, widthToDp } from '../../utils/functions/responsiveUtils';
import { useSoundBtnGesture } from "./hooks/soundBtnGestureHook";

export const BUTTON_SIZE = 10;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type props = {
    animatedStyles: any,
    iconProgress: SharedValue<number>,
}


const RecorderQuick = ({
    animatedStyles,
    iconProgress
}: props) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
  

    return (
        <Animated.View style={[
            styles.quickRecorderView,
            animatedStyles
        ]}>
            <AnimatedLottieView
                progress={iconProgress}
                style={[styles.iconLottie]}
                source={require('../../../assets/lottieFiles/trash.json')}
            />
        </Animated.View>
    )

}

export default RecorderQuick;




