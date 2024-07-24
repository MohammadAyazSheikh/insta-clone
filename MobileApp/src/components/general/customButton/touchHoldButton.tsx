import React, { useCallback, useRef } from 'react';
import { TouchableOpacity, ViewStyle } from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';


type gestureDownProps = {
    children?: React.ReactNode,
    gestureRootViewStyles?: ViewStyle | ViewStyle[],
    animatedViewStyles?: ViewStyle | ViewStyle[],
    onSwipeDown?: () => void
}
type touchHold = {
    onHold?: () => void,
    onRelease?: () => void,
    onPress?: () => void,
    holdDelay?: number,
    children?: React.ReactNode,
    styles?: ViewStyle | ViewStyle[],
    activeOpacity?: number,
    enableDownGesture?: boolean,

} & gestureDownProps;


export const TouchHold = ({
    onHold,
    onRelease,
    onPress,
    styles,
    activeOpacity = 1,
    holdDelay = 500,
    children,
    onSwipeDown,
    gestureRootViewStyles,
    animatedViewStyles,
    enableDownGesture,
}: touchHold) => {
    //for detection long press action
    const longPressed = useRef(false);

    const BtnHold = useCallback(() => (
        <TouchableOpacity
            delayLongPress={holdDelay}
            activeOpacity={activeOpacity}
            style={styles || { flex: 1 }}
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
            {children}
        </TouchableOpacity >
    ), [])

    return (
        enableDownGesture ?
            <DownGesture
                gestureRootViewStyles={gestureRootViewStyles}
                animatedViewStyles={animatedViewStyles}
                onSwipeDown={onSwipeDown}
            >
                <BtnHold />
            </DownGesture >
            :
            <BtnHold />
    )
}



//down gesture
export const DownGesture = ({
    gestureRootViewStyles,
    animatedViewStyles,
    children,
    onSwipeDown
}: gestureDownProps) => {

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
        <GestureHandlerRootView style={gestureRootViewStyles }>
            <GestureDetector gesture={pan} >
                <Animated.View style={animatedViewStyles || { flex: 1 }}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}
