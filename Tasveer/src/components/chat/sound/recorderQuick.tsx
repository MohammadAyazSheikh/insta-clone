import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
    SharedValue,
} from 'react-native-reanimated';

import LottieView from 'lottie-react-native';
import { TextRegular } from "../../general/text/text";
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type props = {
    animatedStyles: any,
    iconProgress: SharedValue<number>,
    waveProgress: SharedValue<number>,
    time: string,
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
                source={require('../../../../assets/lottieFiles/trash.json')}
            />
            {/* wave animation */}
            <View style={{ flex: 1, height: '100%',flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
                {/* time */}
                <TextRegular style={styles.txtTime}>
                    {time}
                </TextRegular>
                <AnimatedLottieView
                    progress={waveProgress}
                    style={{ height: '80%', width: '100%' }}
                    source={require('../../../../assets/lottieFiles/waveLong.json')}
                />
            </View>
        </Animated.View>
    )

}
// 
export default RecorderQuick;




