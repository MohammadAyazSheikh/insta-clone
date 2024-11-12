import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, StretchInY, interpolate, Extrapolation, withRepeat } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { widthToDp } from "./src/utils/functions/responsiveUtils";
import useSoundRecorderHooks from "./src/components/chat/sound/hooks/soundRecorderhooks";
import IconFa from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import { PlayBackType } from "react-native-audio-recorder-player";

const BAR_WIDTH = widthToDp(3);
const SPACE_WIDTH = widthToDp(1.5);
const BAR_TOTAL_WIDTH = BAR_WIDTH + SPACE_WIDTH;
const WIDTH = widthToDp(70);

const TestAnim = () => {

    const { styles } = useStyles(styleSheet);

    const { onStartRecord, onStopRecord, onStartPlay, onStopPlay } = useSoundRecorderHooks(0.4);

    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    //state for holding playing position
    const [currentTime, setCurrentTime] = useState<PlayBackType>();
    //state for holding metering (sound level) 
    const [voiceData, setVoiceData] = useState<{ metering: number, width?: number }[]>([]);


    const animTranslate = useSharedValue(0);
    const animPastBarsWidth = useSharedValue(BAR_TOTAL_WIDTH);

    const stylesAnim = useAnimatedStyle(() => ({
        transform: [{ translateX: -animTranslate.value }],
    }));


    const isSliding = useRef(false);

    const record = useCallback(async () => {
        const uri = await onStartRecord((e) => {
            setVoiceData((prev) => {
                isSliding.current = false;
                if ((BAR_TOTAL_WIDTH * prev.length) >= WIDTH) {
                    isSliding.current = true;
                    //replacing unused old bars with one long single bars
                    //to avoid lagging 
                    const latest = [...prev];
                    latest.shift();
                    latest[0] = { width: animPastBarsWidth.value, metering: latest[0].metering };

                    return [...latest, { metering: e.currentMetering }];
                }

                return [...prev, { metering: e.currentMetering }]
            });

        });
    }, [])


    useEffect(() => {
        //translating bars to left
        if ((BAR_TOTAL_WIDTH * voiceData.length) >= WIDTH
            && isSliding.current && isRecording) {
            isSliding.current = false;
            animTranslate.value =
                withTiming(animTranslate.value + BAR_TOTAL_WIDTH, {
                    duration: 400,
                    easing: Easing.linear,
                }, () => {
                    animPastBarsWidth.value += BAR_TOTAL_WIDTH
                })
        }

    }, [voiceData]);



    return (
        <View style={styles.container}>
            {
                // recorder
                isRecording ?
                    <View style={styles.recorderContainer}>
                        <View style={styles.recorderBody}>
                            <Animated.View style={[styles.barContainer, stylesAnim, {}]}>
                                {
                                    voiceData.map((b, index) => {
                                        console.log(b.metering)
                                        const height = interpolate(b.metering, [-10, -5, 0], [BAR_WIDTH, 50, 100], Extrapolation.CLAMP)
                                        return (
                                            <Animated.View
                                                // entering={StretchInY.duration(500)}
                                                key={index} style={[styles.bar, {
                                                    height: height,
                                                    width: b?.width || BAR_WIDTH
                                                }]}
                                            />)
                                    })
                                }
                            </Animated.View>
                        </View>
                    </View>
                    :
                    null
            }
            {
                //recording button
                !isRecording && !isPlaying ?
                    < TouchableOpacity style={styles.btnRec}
                        onPress={() => {
                            setIsRecording(true);
                            setCurrentTime(undefined)
                            record();
                        }}
                    >
                        <IconFa name="microphone" color={"white"} size={40} />
                    </TouchableOpacity>
                    :
                    null

            }
            {
                //stop and play voice button
                isRecording ?
                    < TouchableOpacity style={styles.btnRec}
                        onPress={async () => {

                            await onStopRecord();
                            onStartPlay(setCurrentTime);
                            setIsRecording(false);
                            setIsPlaying(true);
                            setVoiceData([]);
                            animPastBarsWidth.value = BAR_TOTAL_WIDTH;
                            animTranslate.value = 0;

                        }}
                    >
                        <IconFa name="stop" color={"white"} size={40} />
                    </TouchableOpacity>
                    :
                    null
            }
            {
                // reset playing
                isPlaying ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        < TouchableOpacity style={styles.btnRec}
                            onPress={() => {
                                setIsPlaying(false);
                                setIsRecording(false);
                                setCurrentTime(undefined);
                                onStopPlay();
                            }}
                        >
                            <IconFa name="refresh" color={"white"} size={40} />
                        </TouchableOpacity>
                        <Text style={styles.txtTime}>
                            {`${moment.utc(currentTime?.currentPosition).format('mm:ss')}/${moment.utc(currentTime?.duration).format('mm:ss')}`}
                        </Text>
                    </View >
                    :
                    null
            }
        </View >
    )
}



const styleSheet = createStyleSheet((theme) => {
    const { colors } = theme;
    return ({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        recorderContainer: {
            width: WIDTH - BAR_TOTAL_WIDTH * 2,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        recorderBody: {
            width: WIDTH,
            height: 100,
            // backgroundColor: colors.primary4,
            alignItems: "flex-start",
            borderRadius: 5,
            overflow: 'hidden'
        },
        barContainer: {
            height: "100%",
            // backgroundColor: colors.ternary2,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // gap: SPACE_WIDTH
        },
        bar: {
            height: "100%",
            width: BAR_WIDTH,
            marginRight: SPACE_WIDTH,
            backgroundColor: colors.secondary1,
            borderRadius: BAR_WIDTH,
        },
        btnRec: {
            width: 100,
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: "tomato",
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
        },
        txtTime: {
            fontSize: 26,
            color: 'black',
            fontWeight: 'bold',
        },
    })
});

export default TestAnim;