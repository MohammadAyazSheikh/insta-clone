import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    interpolate,
    withTiming,
} from 'react-native-reanimated';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import moment from "moment";
const { width: deviceWidth } = Dimensions.get("window");
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation, widthToDp } from '../../../utils/functions/responsiveUtils';
import IconFa from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import { useSoundBtnGesture } from "./hooks/soundBtnGestureHook";
import RecorderQuick from "./recorderQuick";
import useSoundRecorderHooks, { path } from "./hooks/soundRecorderhooks";
import RecorderLocked, { SOUND_BAR_GAP, SOUND_BAR_WIDTH } from "./recorderLocked";
const { width } = Dimensions.get("window");

export const BUTTON_SIZE = 10;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type props = {
    onSend: (uri: string) => void
}

const AnimatedRecorder = ({
    onSend,
}: props) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    //animated value for lottie wave
    const metering = useSharedValue(0);
    // animated value for wave bars (locked recorder waves)
    const translateX = useSharedValue(width);

    const [time, setTime] = useState(0);
    const [meteringList, setMeteringList] = useState<number[]>([]);
    //sound hook
    const { onStartRecord, onStopRecord } = useSoundRecorderHooks();

    const [isLocked, setIsLocked] = useState(false);

    const [isRecording, setIsRecording] = useState(false);

    //function to stop recording
    const stopRecording = () =>
        onStopRecord(() => {
            translateX.value = width;
            setMeteringList([]);
            //quick reorder value
            metering.value = 0;
            setTime(0);
        });

    //function to start recording
    const startRecording = () => {
        setIsRecording(true);
        onStartRecord((e) => {
            //for quick recorder lottie wave animation
            metering.value = withTiming(
                interpolate(
                    e.currentMetering!,
                    [-15, -7.5, 0],
                    [0, 0, 1]
                ),
                { duration: 200 }
            );

            setTime(e.currentPosition);

            //for locked recorder wave bars

            setMeteringList(prev => {
                const totalBarSpace = SOUND_BAR_WIDTH + SOUND_BAR_GAP
                const totalBarsAndGapWidth =
                    (prev.length * (totalBarSpace))

                if (totalBarsAndGapWidth >= 2 * width) {

                    translateX.value = 0;
                    return [...prev.slice(Math.round(prev.length / 2)), e.currentMetering || 0];
                }
                const translate = totalBarSpace;
                translateX.value = withTiming(translateX.value - translate, { duration: 100 });
                return [...prev, e.currentMetering || 0]
            });

        });
    }

    //animation hook
    const {
        animatedBtnSendStyle,
        animatedRecorderStyle,
        animatedLockIconStyle,
        panGestureEvent,
        trashIconProgress,
        lockIconProgress,
    } = useSoundBtnGesture({
        onHold() {
            startRecording();
        },
        onRelease(isDeleted) {

            stopRecording();
            setIsRecording(false);
            if (!isDeleted && time > 1) {
                onSend(path!)
            }
            // if (time > 0) {
            //     onSend("file:///Users/apple/Library/Developer/CoreSimulator/Devices/18AAA775-E3E8-4E9C-B3E5-74777B37CA73/data/Containers/Data/Application/FE6AAC40-38B7-42D6-A178-101E1413CF79/Library/Caches/sound.m4a")
            // }
        },
        onDelete() {
            setIsRecording(false);
        },
        onLock() {
            setIsLocked(true);
        }
    });






    return (
        !isLocked ?
            <View style={[styles.container]}>
                {/* lock icon */}
                <Animated.View style={[
                    styles.iconLockContainer,
                    animatedLockIconStyle
                ]}>
                    <View style={styles.iconLock}>
                        <AnimatedLottieView
                            progress={lockIconProgress}
                            style={[styles.iconLottie, { width: '100%' }]}
                            source={require('../../../../assets/lottieFiles/lock.json')}
                        />
                    </View>
                </Animated.View>
                {/* Quick Recorder */}
                <RecorderQuick
                    animatedStyles={animatedRecorderStyle}
                    iconProgress={trashIconProgress}
                    waveProgress={metering}
                    time={moment.utc(time).format('mm:ss')}
                />
                {/* sound button */}
                <GestureDetector gesture={panGestureEvent}>
                    <Animated.View style={[
                        styles.btnRecorder,
                        animatedBtnSendStyle
                    ]}>
                        <IconFa name='microphone' size={22} color={"white"} />
                    </Animated.View>
                </GestureDetector>

            </View>
            :
            // locked recorder
            <RecorderLocked
                translateX={translateX}
                meteringList={meteringList}
                time={moment.utc(time).format('mm:ss')}
                isRecording={isRecording}
                onSend={() => {
                    setIsLocked(false);
                    onSend("file:///Users/apple/Library/Developer/CoreSimulator/Devices/18AAA775-E3E8-4E9C-B3E5-74777B37CA73/data/Containers/Data/Application/FE6AAC40-38B7-42D6-A178-101E1413CF79/Library/Caches/sound.m4a")
                }}
                onDelete={() => {
                    stopRecording();
                    setIsLocked(false);
                }}
                onPauseRecord={() => {
                    if (isRecording) {
                        stopRecording();
                        setIsRecording(false);
                    }
                    else {
                        startRecording();
                        setIsRecording(true);
                    }
                }}
            />

    )

}

export default AnimatedRecorder;




