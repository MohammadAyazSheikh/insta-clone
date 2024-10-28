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
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import IconFa from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import { useSoundBtnGesture } from "./hooks/soundBtnGestureHook";
import RecorderQuick from "./recorderQuick";
import useSoundRecorderHooks from "./hooks/soundRecorderhooks";
import RecorderLocked, { SOUND_BAR_GAP, SOUND_BAR_WIDTH } from "./recorderLocked";


export const BUTTON_SIZE = 10;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type props = {
    onSend: (uri: string) => void
}

const AnimatedRecorder = ({
    onSend,
}: props) => {

    const { styles, width } = useFunctionalOrientation(responsiveStyles);
    //animated value for lottie wave
    const metering = useSharedValue(0);
    // animated value for wave bars (locked recorder waves)
    // const translateX = useSharedValue(width);

    const [time, setTime] = useState(0);
    const [meteringList, setMeteringList] = useState<number[]>([]);
    //sound hook
    const { onStartRecord, onStopRecord } = useSoundRecorderHooks();

    const [isLocked, setIsLocked] = useState(false);

    const [isRecording, setIsRecording] = useState(false);

    //stat for sound uri
    const [uri, setUri] = useState<string | null>(null);

    //function to stop recording
    const stopRecording = () =>
        onStopRecord(() => {
            // translateX.value = width;
            setMeteringList([]);
            //quick reorder value
            metering.value = 0;
            setTime(0);
        });

    //function to start recording
    const startRecording = async () => {

        const barTotalWidth = SOUND_BAR_WIDTH + SOUND_BAR_GAP;
        //number of bars container can hold
        const numOfBars = Math.round(width / barTotalWidth);


        setIsRecording(true);
        const uri_ = await onStartRecord((e) => {
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

                if (prev?.length >= numOfBars) {
                    const currentBars = [...prev];
                    currentBars.shift();
                    return [...currentBars, e.currentMetering ?? 0]
                }


                // const totalBarSpace = SOUND_BAR_WIDTH + SOUND_BAR_GAP
                // const totalBarsAndGapWidth =
                //     (prev.length * (totalBarSpace))

                // const offset = width;
                // if (totalBarsAndGapWidth > offset) {

                //     console.log("-----")
                //     const diff = totalBarsAndGapWidth - width;
                //     console.log(translateX.value)
                //     console.log(totalBarsAndGapWidth);
                //     console.log(offset)
                //     console.log(totalBarSpace, SOUND_BAR_GAP, SOUND_BAR_WIDTH, diff)
                //     translateX.value = withTiming(barTotalWidth, { duration: 100 });
                //     return [...prev.slice(1), e.currentMetering || 0];
                // }
                // const translate = totalBarSpace;
                // translateX.value = withTiming(translateX.value - translate, { duration: 100 });
                return [...prev, e.currentMetering ?? 0]
            });

        });

        //setting sound uri
        setUri(uri_);
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
                onSend(uri!)
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
            // false ?
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
                uri={uri!}
                // translateX={translateX}
                meteringList={meteringList}
                time={moment.utc(time).format('mm:ss')}
                isRecording={isRecording}
                onSend={() => {
                    setIsLocked(false);
                    onSend(uri!)
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




