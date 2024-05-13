import {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring,
    withTiming,
    interpolate,
    Extrapolation,
    SharedValue,
    runOnUI,
} from 'react-native-reanimated';
import { Alert, Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { BUTTON_SIZE } from '../animatedRecorder';
import { widthToDp } from '../../../../utils/functions/responsiveUtils';
import { useState } from 'react';

const { width } = Dimensions.get("window");


const DRAG_LIMIT_X = width / 3;
const LOCK_BUTTON_MAX_HEIGHT = 130;
const LOCK_BTN_MIN_HEIGHT = widthToDp(BUTTON_SIZE);
const QUICK_RECORDER_WIDTH = widthToDp(100) - 20


type props = {
    onHold?: () => void,
    onRelease?: (dlt: boolean) => void,
    onDelete?: () => void,
    onLock?: () => void,
    onEnd?: () => void
}
export const useSoundBtnGesture = ({
    onHold,
    onRelease,
    onDelete,
    onLock,
    onEnd,
}: props) => {


    //sound button
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    // lock icon
    const translateYLockIcon = useSharedValue(0);
    const lockHeight = useSharedValue(0);
    const lockIconProgress = useSharedValue(0.5);
    //quick recorder
    const scaleXQuickRec = useSharedValue(0);
    const trashIconProgress = useSharedValue(0);
    const deleted = useSharedValue(false);
    //for locking recorder
    // const [locked, setLocked] = useState(false);

    const dragEnabled = useSharedValue(true);

    const onHoldDelay = () => {
        setTimeout(() => {
            if (dragEnabled.value)
                onHold && (onHold)();
        }, 1500)
    }


    //reset all the animations values
    const resetAnimations = () => {

        "worklet";
        dragEnabled.value = false;
        scale.value = withTiming(1, { duration: 200 });
        lockHeight.value = 0;
        translateYLockIcon.value = 0;
        scaleXQuickRec.value = 0;
        translateX.value = withSpring(0, { duration: 1000 });
        translateY.value = withSpring(0, { duration: 1000 });
        trashIconProgress.value = 0;
        lockIconProgress.value = 0.5;
    }

    const panGestureEvent = Gesture
        .Pan()
        .onTouchesDown((e) => {

            dragEnabled.value = true;
            scale.value = withTiming(1.7, { duration: 100 });
            lockHeight.value = withTiming(LOCK_BUTTON_MAX_HEIGHT, { duration: 200 });
            translateYLockIcon.value = -LOCK_BTN_MIN_HEIGHT / 2;
            scaleXQuickRec.value = withTiming(QUICK_RECORDER_WIDTH, { duration: 150 });
            deleted.value = false;
            runOnJS(onHoldDelay)();

        })
        .onTouchesUp(() => {
            onRelease && runOnJS(onRelease)(deleted.value);
            resetAnimations();
        })
        .onChange((event) => {

            // note
            // Maths.abs makes value positive

            // if drag is not enabled  return & don't move the sound button
            if (!dragEnabled.value)
                return;

            //translateX
            const offsetX = event.changeX + translateX.value;
            // const clampX = Math.max(-100, offsetX);

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

                    //for decreasing Quick Recorder width when user drags left
                    const inputRangeQuickRec = [DRAG_LIMIT_X / 10, DRAG_LIMIT_X / 5, DRAG_LIMIT_X];
                    const outputRangeQuickRec = [
                        QUICK_RECORDER_WIDTH,
                        QUICK_RECORDER_WIDTH * 0.9,
                        QUICK_RECORDER_WIDTH * 0.7
                    ];

                    const scaleXQuick = interpolate(
                        absOffsetX,
                        inputRangeQuickRec,
                        outputRangeQuickRec,
                        Extrapolation.CLAMP
                    );

                    scaleXQuickRec.value = scaleXQuick;

                    // for animating trash icon
                    trashIconProgress.value = interpolate(
                        absOffsetX,
                        [0, DRAG_LIMIT_X / 2, DRAG_LIMIT_X],
                        [0, 0.5, 1],
                        Extrapolation.CLAMP
                    );
                }
                else {
                    //  translateX.value = withSpring(clampX);
                    deleted.value = true;
                    resetAnimations();
                    onDelete && runOnJS(onDelete)();
                }

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
                    );
                    // for animating trash icon
                    lockIconProgress.value = interpolate(
                        absOffsetY,
                        inputRange,
                        [0.5, 0.75, 1],
                        Extrapolation.CLAMP
                    );
                }
                else {
                    // translateY.value = withSpring(clampY);
                    // runOnJS(setLocked)(true);
                    resetAnimations();
                    onLock && runOnJS(onLock)();
                }
            }
        })
        .onEnd((e) => {
            onEnd && runOnJS(onEnd)();
        })

    // ---- animated sound button styles ----
    const animatedBtnSendStyle = useAnimatedStyle(() => {

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
            width: scaleXQuickRec.value,
        };
    });

    return {
        animatedBtnSendStyle,
        animatedRecorderStyle,
        animatedLockIconStyle,
        panGestureEvent,
        // locked,
        trashIconProgress,
        lockIconProgress,
    };
}