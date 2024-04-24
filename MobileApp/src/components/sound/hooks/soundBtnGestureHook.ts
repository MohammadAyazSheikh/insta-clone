import Animated, {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring,
    withTiming,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
const { width } = Dimensions.get("window");
const w = width / 3;

export const useSoundBtnGesture = (onEnd?: () => void) => {


    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const scaleLockIcon = useSharedValue(0);
    const translateYLockIcon = useSharedValue(-100);

    const panGestureEvent = Gesture
        .Pan()
        .onTouchesDown((e) => {
            scale.value = withTiming(1.2, { duration: 200 });

            scaleLockIcon.value = withTiming(1, { duration: 200 });


        })
        .onTouchesUp(() => {
            scale.value = withTiming(1, { duration: 200 });

            scaleLockIcon.value = 0;

            translateYLockIcon.value = -100;

        })
        .onChange((event) => {

            // note
            // Maths.abs makes value positive 

            //only translate when it half way from center
            const offsetX = event.changeX + translateX.value;
            const clampX = Math.max(-200, offsetX);

            if (Math.abs(offsetX) < width / 3) {
                translateX.value = offsetX;
            }
            else
                translateX.value = withSpring(clampX)


            // translate Y
            const offsetY = event.changeY + translateY.value;
            const clampY = Math.max(-200, offsetY);
            //adding voice icon position + 100px (-offsetY - 100)
            const offsetYIcon = - Math.abs(offsetY - 100)


            if (Math.abs(offsetY) < width / 3) {
                translateY.value = withTiming(offsetY, { duration: 100 });
                translateYLockIcon.value = withTiming(offsetYIcon, { duration: 40 });
            }
            else {
                translateY.value = withSpring(clampY);
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

        const translateX_ = translateX.value;

        return {
            transform: [
                {
                    translateX: translateX_,
                },
                {
                    translateY: translateYLockIcon.value,
                },
                {
                    scale: scaleLockIcon.value
                }
            ],
        };
    });

    return {
        animatedStyle,
        animatedLockIconStyle,
        panGestureEvent
    };
}