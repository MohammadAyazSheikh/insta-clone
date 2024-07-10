import React, { useRef } from 'react';
import { TouchableOpacity, ViewStyle } from "react-native";
import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';

type touchHold = {
    onHold?: () => void,
    onRelease?: () => void,
    onPress?: () => void,
    holdDelay?: number,
    children?: React.ReactNode,
    styles?: ViewStyle | ViewStyle[],
    activeOpacity?: number,
    onSwipeDown?: () => void
}

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}
export const TouchHold = ({
    onHold,
    onRelease,
    onPress,
    styles,
    activeOpacity = 1,
    holdDelay = 500,
    children,
    onSwipeDown
}: touchHold) => {
    //for detection long press action
    const longPressed = useRef(false);


    //for swipe down

    const initialTouchLocation = useSharedValue<{ x: number, y: number } | null>(null);
    const pan = Gesture.Pan()
        .onBegin((evt) => {
            initialTouchLocation.value = { x: evt.x, y: evt.y };
        })
        .onTouchesMove((evt, state) => {
            // Sanity checks
            if (!initialTouchLocation.value || !evt.changedTouches.length) {
                state.fail();
                return;
            }

            const xDiff = Math.abs(evt.changedTouches[0].x - initialTouchLocation.value.x);
            const yDiff = Math.abs(evt.changedTouches[0].y - initialTouchLocation.value.y);
            const isHorizontalPanning = xDiff < yDiff;
            if (isHorizontalPanning) {
                state.activate();
            } else {
                state.fail();
            }
        })
        .onUpdate((e) => {
            if (e.velocityY > 1500) {
                onSwipeDown && runOnJS(onSwipeDown)();
            }
        });

    return (

        <TouchableOpacity
            delayLongPress={holdDelay}
            activeOpacity={activeOpacity}
            style={styles}
            onLongPress={() => {
                longPressed.current = true;
                onHold && onHold();
            }}
            onPressOut={() => {
                if (!longPressed.current)
                    return;
                longPressed.current = false;
                onRelease && onRelease();
            }}
            onPress={onPress}
        >
            <GestureDetector gesture={pan}>
                <Animated.View style={{ flex: 1 }}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </TouchableOpacity >
    )
}