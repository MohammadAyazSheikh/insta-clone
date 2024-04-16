import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Easing } from "react-native";
const { width } = Dimensions.get("screen");
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import useSoundRecorderHooks from "./hooks/soundhooks";
import { TouchableRipple } from "react-native-paper";
import { PlayBackType, RecordBackType } from "react-native-audio-recorder-player";
import IconEnt from 'react-native-vector-icons/Entypo';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import { useGestureAnimation } from "./hooks/sliderAnimationHooks";
import { TextRegular } from "../general/text/text";
const { width: deviceWidth } = Dimensions.get("window");

type sliderProps = {
    width?: number,
    percentage?: number,
}
const Slider = ({
    width = deviceWidth,
    percentage = 0,
}: sliderProps) => {

    const [progressWidth, setProgressWidth] = useState<number>(0)

    const { onStartPlay, onPausePlay, onSeek, onResumePlay ,onStopPlay} = useSoundRecorderHooks();
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState<PlayBackType>({
        duration: 0,
        currentPosition: 0,
    });

    // animated value to move thumb towards right side
    const translate = useSharedValue(0);

    const playingStyleAnimated = useAnimatedStyle(() => ({
        left: `${translate.value}%`
    }));

    // gesture animation hook
    const { animatedStyle, panGestureEvent } = useGestureAnimation({
        width: progressWidth,
        onStart:()=>{
            onStopPlay(()=>{})
        },
        onEnd: (percentage) => {
            console.log(percentage, time.currentPosition);
            const millis = (time.duration / 100) * percentage;
            onSeek(millis)
        }
    });
    return (
        <View style={[styles.container,
        {
            width: width
        }]}>
            {/* play button */}
            <TouchableRipple
                onPress={() => {
                    // resume
                    if (translate.value > 0 && translate.value < 95 && !isPlaying) {
                        setIsPlaying(true);
                        onResumePlay();
                        return;
                    }

                    // play from start
                    if (!isPlaying) {
                        // translate.value = 0;
                        setIsPlaying(true)
                        onStartPlay((e) => {
                            setTime(e);
                            const progress = (e.currentPosition / e.duration) * 100;
                            if (progress < 95) {
                                translate.value = withTiming(progress, { duration: 50 })
                            }
                            else {
                                setIsPlaying(false);
                                translate.value = 0;
                                setTime({
                                    duration: 0,
                                    currentPosition: 0,
                                });
                            }
                        })
                    }
                    // pause
                    else {
                        onPausePlay(() => {
                            setIsPlaying(false)
                        })
                    }

                }}
            >
                <IconEnt
                    color={"white"}
                    size={30}
                    name={isPlaying ? 'controller-paus' : 'controller-play'}
                />
            </TouchableRipple>
            {/* progress */}
            <View style={styles.progressView}
                onLayout={(e) => {
                    console.log(e.nativeEvent.layout.width)
                    setProgressWidth(e.nativeEvent.layout.width)
                }}
            >
                <GestureDetector gesture={panGestureEvent}>
                    <Animated.View style={[
                        styles.thumb,
                        animatedStyle,
                        playingStyleAnimated,
                        { left: `${percentage}%` }
                    ]}
                    />
                </GestureDetector>
            </View>
            {/* time */}
            <TextRegular style={styles.txtTime}>
                {convertMillisecondsToTime(time.currentPosition)}
            </TextRegular>
        </View>
    )

}

export default Slider;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: 'red',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        height: 3,
        backgroundColor: 'black'
    },
    thumb: {
        width: 20,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute',
    },

    txtTime: {
        color: 'grey',
        position: 'absolute',
        bottom: 2,
        right: 5,
    },
})



function convertMillisecondsToTime(milliseconds: number) {
    // Convert milliseconds to seconds
    var totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and seconds
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    // Format minutes and seconds with leading zeros if necessary
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    // Return the formatted time
    return formattedMinutes + " : " + formattedSeconds;
}