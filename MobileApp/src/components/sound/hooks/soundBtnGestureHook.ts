import Animated, {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring,
    withTiming,
    interpolate,
    Extrapolation,
    interpolateColor,
    cancelAnimation
} from 'react-native-reanimated';
import { Alert, Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { BUTTON_SIZE } from '../animatedRecorder';
import { widthToDp } from '../../../utils/functions/responsiveUtils';
import { useState } from 'react';
const { width } = Dimensions.get("window");
const w = width / 3;

const DRAG_LIMIT_X = width / 3;
const LOCK_BUTTON_MAX_HEIGHT = 130;
const LOCK_BTN_MIN_HEIGHT = widthToDp(BUTTON_SIZE);


export const useSoundBtnGesture = (onEnd?: () => void) => {


    //sound button
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    // lock icon
    const translateYLockIcon = useSharedValue(0);
    const lockHeight = useSharedValue(0);
//for hiding lock icon
const opacity = useSharedValue(0);
    const [hideIcons,setHideIcons] = useState(false)


    const panGestureEvent =  Gesture
        .Pan()
        .onTouchesDown((e) => {
            scale.value = withTiming(1.5, { duration: 100 });

            lockHeight.value = withTiming(LOCK_BUTTON_MAX_HEIGHT, { duration: 200 });
            translateYLockIcon.value = -LOCK_BTN_MIN_HEIGHT / 2;
opacity.value = 1;
        })
        .onTouchesUp(() => {
            scale.value = withTiming(1, { duration: 200 });
            lockHeight.value = 0;
            translateYLockIcon.value = 0;
            opacity.value = 0;
        })
        .onChange((event) => {
            // note
            // Maths.abs makes value positive 

            //translateX
            const offsetX = event.changeX + translateX.value;
            const clampX = Math.max(-100, offsetX);

            // translate Y
            const offsetY = event.changeY + translateY.value;
            const clampY = Math.max(-200, offsetY);

            if (Math.abs(offsetY) < 1) {
                if (Math.abs(offsetX) < DRAG_LIMIT_X) {
                    translateX.value = offsetX;
                }
                else
                    translateX.value = withSpring(clampX);
            }

        

            if (Math.abs(offsetX) < 1) {
                if (Math.abs(offsetY) < DRAG_LIMIT_X) {
                    // moving sound button up
                    translateY.value = withTiming(offsetY, { duration: 40 });
                 
                    //setting min height when user drags up of lock icon 
                    const inputRange = [0, DRAG_LIMIT_X / 2, DRAG_LIMIT_X];
                    const outputRange = [
                        LOCK_BUTTON_MAX_HEIGHT,
                        LOCK_BUTTON_MAX_HEIGHT / 2,
                        LOCK_BTN_MIN_HEIGHT
                    ];
                    const height = interpolate(
                        Math.abs(offsetY),
                        inputRange,
                        outputRange,
                        Extrapolation.CLAMP
                    );

                    lockHeight.value = height;

                    //for translating up lock icon
                    const outputRangeTranslateLockY = [
                        -LOCK_BTN_MIN_HEIGHT / 2,
                        -(LOCK_BUTTON_MAX_HEIGHT / 2) * 2,
                        -(LOCK_BUTTON_MAX_HEIGHT / 2) * 3
                    ];
                    const Y = interpolate(
                        Math.abs(offsetY),
                        inputRange,
                        outputRangeTranslateLockY,
                        Extrapolation.CLAMP
                    );

                    translateYLockIcon.value = Y;

                    

                }
                else {
                    translateY.value = withSpring(clampY);
                    runOnJS(setHideIcons)(true);
                    console.log("cancel")
                }
            }
        })
        .onEnd((e) => {
            translateX.value = withSpring(0, {
                duration: 1000,
            },);

            translateY.value = withSpring(0, {
                duration: 1000,
            },);
            onEnd && runOnJS(onEnd)();
        })

    // ---- animated styles ----
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
                {
                    scale: scale.value
                }
            ],
        };
    });

    // ---- animated styles ----
    const animatedLockIconStyle = useAnimatedStyle(() => {

        // const backgroundColor = interpolateColor(
        //     translateYLockIcon.value,
        //     outputRangeTranslateLockY,
        //     ['red', 'green']
        // )

        // console.log(backgroundColor)
        return {
            height: lockHeight.value,
            opacity:opacity.value,
            // backgroundColor,
            transform: [
                {
                    translateY: translateYLockIcon.value,
                }
            ],
        };
    });

    return {
        animatedStyle,
        animatedLockIconStyle,
        panGestureEvent,
        hideIcons,
    };
}