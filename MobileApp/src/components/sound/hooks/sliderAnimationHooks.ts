import {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Gesture, GestureStateChangeEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
const { width: deviceWidth } = Dimensions.get("window");


const TOUCH_SLOP = 1000;//5;
const TIME_TO_ACTIVATE_PAN = 100;

type hookProps = {
    onEnd?: (percentage: number) => void,
    onStart?: () => void,
    width?: number,
}
export const useGestureAnimation = ({
    onEnd = () => '',
    onStart,
    width = deviceWidth,
}: hookProps) => {


    const translateX = useSharedValue(0);
    const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });

    const panGestureEvent = Gesture
        .Pan()
        .manualActivation(true)
        .onTouchesDown((e) => {
        onStart && runOnJS(onStart)();
            touchStart.value = {
                x: e.changedTouches[0].x,
                y: e.changedTouches[0].y,
                time: Date.now(),
            };
        })
        .onBegin(()=>{
           
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
            const offset = event.changeX + translateX.value;

            if (offset <= width  && offset > 0)
                translateX.value = offset

        })
        .onEnd((e) => {
            //passing progress in percentage when gesture ends
           const percentage = Math.round(translateX.value/width *100);
            onEnd && runOnJS(onEnd)(percentage);
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