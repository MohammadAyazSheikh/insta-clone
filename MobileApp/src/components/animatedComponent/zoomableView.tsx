import React, { useState } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, {
    AnimatedStyle,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';


type zoomAbleViewType = {
    children?: React.ReactNode,
    containerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
}
export default function ZoomAbleView({
    containerStyle,
    children,
}: zoomAbleViewType) {


    //hold dimension of view when mount so later we will be able to calculate
    //zoom focal on the basis of width ad height
    const [dimension, setDimension] = useState<{ width: number, height: number }>({
        width: 0,
        height: 0
    });

    const { width, height } = dimension;
    //animated values
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);




    // gesture events
    const pinch = Gesture
        .Pinch()
        .onChange((e) => {
            scale.value = e.scale;
            focalX.value = e.focalX;
            focalY.value = e.focalY;
        })
        .onEnd((e) => {
            scale.value = withTiming(1);
        });


    const rStyle = useAnimatedStyle(() => {

        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: -width / 2 },
                { translateY: -height / 2 },
                { scale: scale.value },
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateX: width / 2 },
                { translateY: height / 2 },
            ],
        };
    });





    return (
        <GestureDetector gesture={pinch}>
            <Animated.View style={[containerStyle]}
                //when view mount 1st time we will set width and height of the view
                //so we can calculate focal value
                onLayout={(e) => {
                    const { width, height } = e.nativeEvent.layout;
                    setDimension({ width, height });
                }}
            >
                {/* this view will be zoom out or in */}
                <Animated.View style={[containerStyle, rStyle]}>
                    {children}
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
}

