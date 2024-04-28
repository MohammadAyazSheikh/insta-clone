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
    waveProgress: SharedValue<number>,
    time:string,
}


const RecorderQuick = ({
    animatedStyles,
    iconProgress,
    waveProgress,
    time,
}: props) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);


    return (
        <Animated.View style={[
            styles.quickRecorderView,
            animatedStyles
        ]}>
            {/* trash icon */}
            <AnimatedLottieView
                progress={iconProgress}
                style={[styles.iconLottie]}
                source={require('../../../assets/lottieFiles/trash.json')}
            />
            <TextRegular style = {styles.txtTime}>
               {time}
            </TextRegular>
            {/* wave animation */}
            <View style = {{flex:1,height:'100%', justifyContent:'center',alignItems:'center'}}>
                <AnimatedLottieView
                    progress={waveProgress}
                    style={{ height: '80%', width: '100%' }}
                    source={require('../../../assets/lottieFiles/waveLong.json')}
                />
            </View>
        </Animated.View>
    )

}

export default RecorderQuick;




