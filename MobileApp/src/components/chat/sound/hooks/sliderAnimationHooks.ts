import {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    SharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
const { width: deviceWidth } = Dimensions.get("window");


const TOUCH_SLOP = 1000;//5;
const TIME_TO_ACTIVATE_PAN = 100;

type hookProps = {
    onEnd?: (percentage: number) => void,
    onStart?: () => void,
    width?: number,
    translateX: SharedValue<number>,
}
export const useGestureAnimation = ({
    onEnd = () => '',
    onStart,
    width = deviceWidth,
    translateX
}: hookProps) => {

    const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });
    const scale = useSharedValue(1);

    const panGestureEvent = Gesture
        .Pan()
        .manualActivation(true)
        .onTouchesDown((e) => {
            scale.value = withTiming(1.2,{duration:300})
            onStart && runOnJS(onStart)();
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
        .onTouchesUp(() => {
            scale.value = withTiming(1,{duration:300})
            //passing progress in percentage when gesture ends
            const percentage = Math.round(translateX.value / width * 100);
            onEnd && runOnJS(onEnd)(percentage);
        })
        .onChange((event) => {
            const offset = event.changeX + translateX.value;

            if (offset <= width && offset > 0)
                translateX.value = offset

        })
    // .onEnd((e) => {

    // })

    // ---- animated styles ----
    const animatedGestureStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    scale:scale.value
                },
            ],
        };
    });

    return {
        animatedGestureStyle,
        panGestureEvent
    };
}