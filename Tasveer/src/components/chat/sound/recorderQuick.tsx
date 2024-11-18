import React, { useCallback, useRef } from "react";
import { View, TextInput, TextStyle } from "react-native";
import Animated, {
    runOnJS,
    SharedValue,
    useDerivedValue,
} from 'react-native-reanimated';

import LottieView from 'lottie-react-native';
import styleSheet from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import moment from "moment";
import { useStyles } from "react-native-unistyles";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const TextAnimated = Animated.createAnimatedComponent(TextInput);

type props = {
    animatedStyles: any,
    iconProgress: SharedValue<number>,
    waveProgress: SharedValue<number>,
    recordTimeSharedVal: SharedValue<number>
}

type recordTimeProp = {
    styles?: TextStyle,
    recordTimeSharedVal: SharedValue<number>
}
export const RecordTime = ({ styles:style,recordTimeSharedVal }: recordTimeProp) => {

    const { styles } = useStyles(styleSheet);

    //ref for animated text input for rendering recording time
    const timeTextRef = useRef<TextInput>(null);

    const setText = useCallback((text: number) => {
        timeTextRef.current?.setNativeProps({ text: moment.utc(text).format('mm:ss') });
    }, [])

    useDerivedValue(() => {
        runOnJS(setText)(recordTimeSharedVal.value)
    }, [recordTimeSharedVal])

    return (<TextAnimated ref={timeTextRef} style={[styles.txtTime,style]} editable={false} />)

}

const RecorderQuick = ({
    animatedStyles,
    iconProgress,
    waveProgress,
    recordTimeSharedVal,
}: props) => {

    const { styles } = useFunctionalOrientation(styleSheet);

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
            <View style={{ flex: 1, height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <RecordTime recordTimeSharedVal={recordTimeSharedVal} />
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




