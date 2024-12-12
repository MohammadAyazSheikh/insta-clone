import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,

} from 'react-native-reanimated';
import IconAnt from "@expo/vector-icons/AntDesign";
import { widthToDp } from '../../utils/functions/responsiveUtils';



type prop = {
    onDoubleTab?: () => void
}
export default function HeartAnimation({ onDoubleTab }: prop) {


    const scale = useSharedValue(0);

    const rStyles = useAnimatedStyle(() => ({
        transform: [{ scale: Math.max(scale.value, 0) }]
    }), [scale]);

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
                <Animated.View style={rStyles} >
                    <IconAnt name={"heart"} size={widthToDp(30)} color={"red"} />
                </Animated.View>
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
