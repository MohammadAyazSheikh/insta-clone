import {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
const { width } = Dimensions.get("window");


export const useSlideGesture = (onEnd?: () => void) => {


    const translateX = useSharedValue(0);
    const initialTouchLocation = useSharedValue<{ x: number, y: number } | null>(null);
    const panGestureEvent = Gesture
        .Pan()
        .manualActivation(true)
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
            const isHorizontalPanning = xDiff > yDiff;

            if (isHorizontalPanning) {
                state.activate();
            } else {
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