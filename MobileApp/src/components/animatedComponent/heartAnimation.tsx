import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,

} from 'react-native-reanimated';

import IconAnt from "react-native-vector-icons/AntDesign";
import { widthToDp } from '../../utils/functions/responsiveUtils';

const Icon = Animated.createAnimatedComponent(IconAnt);

type prop = {
    onDoubleTab?: () => void
}
export default function HeartAnimation({ onDoubleTab }: prop) {


    const scale = useSharedValue(0);

    const rStyles = useAnimatedStyle(() => ({
        transform: [{ scale: Math.max(scale.value, 0) }]
    }), []);

    const tap = Gesture.Tap().numberOfTaps(2).onEnd(() => {
        onDoubleTab && runOnJS(onDoubleTab)();
        scale.value = withSpring(1, undefined, (finished) => {
            if (finished) {
                scale.value = withDelay(500, withSpring(0));
            }
        })
    });

    return (
        <GestureDetector gesture={tap}>
            <Animated.View style={[styles.container]}>
                <Icon name={"heart"} size={widthToDp(60)} color={"red"} style={rStyles} />
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },

});
