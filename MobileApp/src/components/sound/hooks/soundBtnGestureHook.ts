import {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring,
    withTiming,
    interpolate,
    Extrapolation,   
} from 'react-native-reanimated';
import { Alert, Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { BUTTON_SIZE } from '../animatedRecorder';
import { widthToDp } from '../../../utils/functions/responsiveUtils';
import { useRef, useState } from 'react';
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
    //quick recorder
    const scaleXQuickRec = useSharedValue(0);
    //for hiding lock icon
    const [hideIcons, setHideIcons] = useState(false)



    const panGestureEvent = Gesture
        .Pan()
        .onTouchesDown((e) => {
            scale.value = withTiming(1.5, { duration: 100 });

            lockHeight.value = withTiming(LOCK_BUTTON_MAX_HEIGHT, { duration: 200 });
            translateYLockIcon.value = -LOCK_BTN_MIN_HEIGHT / 2;
            scaleXQuickRec.value =  withTiming(1, { duration: 150 });

        })
        .onTouchesUp(() => {
            scale.value = withTiming(1, { duration: 200 });
            lockHeight.value = 0;
            translateYLockIcon.value = 0;
            scaleXQuickRec.value = 0;

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

            //only drag towards X-axis at a time
            if (Math.abs(offsetY) < 1) {
                //only slide left (offsetX is -ve when  drag left +ve when right)
                if (offsetX <= 0 && Math.abs(offsetX) < DRAG_LIMIT_X) {
                    //dragging left
                    translateX.value = offsetX;


                    //setting min height of lock icon zero when user drags left 
                    const absOffsetX = Math.abs(offsetX);

                    const inputRange = [0, DRAG_LIMIT_X / 10];
                    const outputRange = [LOCK_BUTTON_MAX_HEIGHT, 0];

                    const height = interpolate(
                        absOffsetX,
                        inputRange,
                        outputRange,
                        Extrapolation.CLAMP
                    );

                    lockHeight.value = height;

                    //for translating down lock icon
                    const outputRangeTranslateLockY = [
                        -(LOCK_BTN_MIN_HEIGHT / 2),
                        0,
                    ];
                    const Y = interpolate(
                        absOffsetX,
                        inputRange,
                        outputRangeTranslateLockY,
                        Extrapolation.CLAMP
                    );

                    translateYLockIcon.value = Y;

                    //for scaling Quick Recorder when user drags left
                    const inputRangeQuickRec = [DRAG_LIMIT_X / 10, DRAG_LIMIT_X / 5, DRAG_LIMIT_X];
                    const outputRangeQuickRec = [1, 0.9, 0.7];

                    const scaleXQuick = interpolate(
                        absOffsetX,
                        inputRangeQuickRec,
                        outputRangeQuickRec,
                        Extrapolation.CLAMP
                    );

                    scaleXQuickRec.value = scaleXQuick;
                }
                else
                    translateX.value = withSpring(clampX);
            }


            //only drag towards Y-axis at a time
            if (Math.abs(offsetX) < 1) {
                //only slide upwards (offsetY is -ve when  drag up +ve when right)
                if (offsetY <= 0 && Math.abs(offsetY) < DRAG_LIMIT_X) {
                    // moving sound button up
                    translateY.value = withTiming(offsetY, { duration: 10 });

                    //setting min height when user drags up of lock icon 
                    const absOffsetY = Math.abs(offsetY);

                    const inputRange = [0, DRAG_LIMIT_X / 2, DRAG_LIMIT_X];
                    const outputRange = [
                        LOCK_BUTTON_MAX_HEIGHT,
                        LOCK_BUTTON_MAX_HEIGHT / 2,
                        LOCK_BTN_MIN_HEIGHT
                    ];
                    const height = interpolate(
                        absOffsetY,
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
                        absOffsetY,
                        inputRange,
                        outputRangeTranslateLockY,
                        Extrapolation.CLAMP
                    );

                    translateYLockIcon.value = Y;

                    //fot scaling sound button when drag up

                    scale.value = interpolate(
                        absOffsetY,
                        inputRange,
                        [1.5, 1, 0],
                        Extrapolation.CLAMP
                    )

                }
                else {
                    translateY.value = withSpring(clampY);
                    runOnJS(setHideIcons)(true);
                    if (offsetX < 0) {
                        console.log("cancel")
                    }
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

    // ---- animated sound button styles ----
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

    // ---- animated lock icon styles ----
    const animatedLockIconStyle = useAnimatedStyle(() => {

        // const backgroundColor = interpolateColor(
        //     translateYLockIcon.value,
        //     outputRangeTranslateLockY,
        //     ['red', 'green']
        // )



        // console.log(backgroundColor)

        const inputRange = [LOCK_BUTTON_MAX_HEIGHT / 1.5, LOCK_BTN_MIN_HEIGHT / 2, 0];

        const opacity = interpolate(
            lockHeight.value,
            inputRange,
            [1, 0.5, 0]
        )
        return {
            height: lockHeight.value,
            opacity: opacity,
            // backgroundColor,
            transform: [
                {
                    translateY: translateYLockIcon.value,
                }
            ],
        };
    });

    // ---- animated recorder styles ----
    const animatedRecorderStyle = useAnimatedStyle(() => {

        return {
            transform: [
                { scaleX: scaleXQuickRec.value }
            ],
        };
    });

    return {
        animatedStyle,
        animatedRecorderStyle,
        animatedLockIconStyle,
        panGestureEvent,
        hideIcons,
    };
}