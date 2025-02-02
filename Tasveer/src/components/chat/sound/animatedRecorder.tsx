import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Animated, {
    useSharedValue,
    interpolate,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import styleSheet from './styles/styles';
import IconFa from '@expo/vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import { useSoundBtnGesture } from "./hooks/soundBtnGestureHook";
import RecorderQuick from "./recorderQuick";
import useSoundRecorderHooks from "./hooks/soundRecorderhooks";
import RecorderLocked, { BAR_CONTAINER_WIDTH, inputRangeMeter, TOTAL_BAR_WIDTH } from "./recorderLocked";
import { useStyles } from "react-native-unistyles";


export const BUTTON_SIZE = 10;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type props = {
    onSend: (uri: string) => void
}

const AnimatedRecorder = ({
    onSend,
}: props) => {

    const { styles } = useStyles(styleSheet);

    /* --- Quick Recorder -- */

    //animated value for lottie wave
    const metering = useSharedValue(0);


    //animated value for current recording time
    const recordTimeSharedVal = useSharedValue(0);


    /* ---  Locked Recorder Sates --- */

    //if bars is translating left
    const isSliding = useRef(false);
    //animated value for translating bar container
    const animTranslateX = useSharedValue(0);
    //animated value for making 1st var width equal to the past bars width 
    const animPastBarsWidth = useSharedValue(TOTAL_BAR_WIDTH);
    //holds metering list data
    const [voiceData, setVoiceData] = useState<{ metering: number, isPastBar?: boolean }[]>([]);


    //sound hook
    const { onStartRecord, onStopRecord } = useSoundRecorderHooks(0.5);

    const [isLocked, setIsLocked] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const isRecordingSharedValue = useSharedValue(false);

    //stat for sound uri
    const [uri, setUri] = useState<string | null>(null);

    //function to stop recording
    const stopRecording = useCallback(async () => {
        const uri = await onStopRecord();
        setIsRecording(false);
        isRecordingSharedValue.value = false;
        //locked recorder
        setVoiceData([]);
        animPastBarsWidth.value = TOTAL_BAR_WIDTH;
        animTranslateX.value = 0;
        //quick reorder value
        metering.value = 0;
        recordTimeSharedVal.value = 0;
    }, []);


    //function to start recording
    const startRecording = useCallback(async () => {
        if (isRecordingSharedValue.value)
            return;

        setIsRecording(true);

        const uri_ = await onStartRecord((e) => {
            //for quick recorder lottie wave animation
            metering.value = withTiming(
                interpolate(
                    e.currentMetering!,
                    inputRangeMeter!,
                    [0, 0, 1]
                ),
                { duration: 200 }
            );

            //setting recording time 
            recordTimeSharedVal.value = e.currentPosition;

            //for locked recorder wave bars
            setVoiceData((prev) => {
                isSliding.current = false;
                if ((TOTAL_BAR_WIDTH * prev.length) >= BAR_CONTAINER_WIDTH) {
                    isSliding.current = true;
                    animPastBarsWidth.value += TOTAL_BAR_WIDTH;
                    //replacing unused old bars with one long single bars
                    //to avoid lagging 
                    const latest = [...prev];
                    latest.shift();
                    latest[0] = { isPastBar: true, metering: latest[0].metering };

                    return [...latest, { metering: e.currentMetering || 0 }];
                }
                return [...prev, { metering: e.currentMetering ?? 0, isPastBar: false }]
            });
        });

        //setting sound uri
        setUri(uri_);
    }, [])

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
            isRecordingSharedValue.value = true;
            startRecording();
        },
        onRelease(isDeleted) {
            stopRecording();
            if (!isDeleted && recordTimeSharedVal.value > 1)
                onSend(uri!)
        },
        onDelete() {
            stopRecording();
        },
        onLock() {
            setIsLocked(true);
        }
    });



    //*Translating locked recorder bars to the left */
    useEffect(() => {
        //translating bar container to the left
        if ((TOTAL_BAR_WIDTH * voiceData.length) >= BAR_CONTAINER_WIDTH
            && isSliding.current && isRecording) {
            isSliding.current = false;
            animTranslateX.value =
                withTiming(animTranslateX.value + TOTAL_BAR_WIDTH, {

                    //idk why withTiming slows down after sometime,
                    //that's why i've assign duration 470ms to withTiming 
                    //and 500ms to the recording callback 
                    //for syncing recording callback & translate animation  

                    duration: 470,
                    easing: Easing.linear,
                })
        }

    }, [voiceData]);

    return (
        !isLocked ?
            <View >
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
                    recordTimeSharedVal={recordTimeSharedVal}
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
                animPastBarsWidth={animPastBarsWidth}
                translateX={animTranslateX}
                meteringList={voiceData}
                recordTimeSharedVal={recordTimeSharedVal}
                isRecording={isRecording}
                onSend={async () => {
                    await stopRecording();
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
                    }
                    else {
                        isRecordingSharedValue.value = true;
                        startRecording();
                        setIsRecording(true);
                    }
                }}
            />

    )

}

export default AnimatedRecorder;




