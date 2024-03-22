import {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
const { width } = Dimensions.get("window");


const TOUCH_SLOP =  1000;//5;
const TIME_TO_ACTIVATE_PAN = 100;
export const useSlideGesture = (onEnd?: () => void) => {


    const translateX = useSharedValue(0);
    const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });

    const panGestureEvent = Gesture
        .Pan()
        .manualActivation(true)
        .onTouchesDown((e) => {
            touchStart.value = {
                x: e.changedTouches[0].x,
                y: e.changedTouches[0].y,
                time: Date.now(),
            };
        })
        .onTouchesMove((e, state) => {
            if (Date.now() - touchStart.value.time > TIME_TO_ACTIVATE_PAN) {
                state.activate();
            } else if (
                Math.abs(touchStart.value.x - e.changedTouches[0].x) > TOUCH_SLOP ||
                Math.abs(touchStart.value.y - e.changedTouches[0].y) > TOUCH_SLOP
            ) {
                state.fail();
            }
        })
        .onChange((event) => {

            // note
            // Maths.abs makes value positive 

            // if (Math.abs(event.translationX) < width / 3)
            //     translateX.value = event.translationX;

            //only translate when it half way from center
            const offset = event.changeX + translateX.value;
            const clamp = Math.max(-200, offset);
            if (Math.abs(offset) < width / 3)
                translateX.value = offset;
            else
                translateX.value = withSpring(clamp)

        })
        .onEnd((e) => {
            translateX.value = withSpring(0, {
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
            ],
        };
    });

    return {
        animatedStyle,
        panGestureEvent
    };
}