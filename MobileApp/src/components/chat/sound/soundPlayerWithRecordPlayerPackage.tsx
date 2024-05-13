import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Easing } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import useSoundRecorderHooks from "./hooks/soundRecorderhooks";
import { TouchableRipple } from "react-native-paper";
import { PlayBackType, RecordBackType } from "react-native-audio-recorder-player";
import IconEnt from 'react-native-vector-icons/Entypo';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import { useGestureAnimation } from "./hooks/sliderAnimationHooks";
import { TextRegular } from "../../general/text/text";
const { width: deviceWidth } = Dimensions.get("window");

type sliderProps = {
    width?: number,
}
const Slider = ({
    width = deviceWidth,
}: sliderProps) => {

    //holds width of the view of progress line view
    const [progressViewWidth, setProgressViewWidth] = useState<number>(0);

    //stats for sound info and progress
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState<PlayBackType>({
        duration: 0,
        currentPosition: 0,
    });

    const isThumbPressed = useRef(false);

    //sound hook
    const { onStartPlay, onPausePlay, onSeek, onResumePlay, onStopPlay } = useSoundRecorderHooks();


    // animated value to move thumb towards right side when sound is playing
    const translateX = useSharedValue(0);

    const playingStyleAnimated = useAnimatedStyle(() => ({
        // left: `${translate.value}%`
        transform: [{
            translateX: translateX.value
        }]
    }));

    // gesture animation hook
    const { animatedGestureStyle, panGestureEvent } = useGestureAnimation({
        translateX,
        width: progressViewWidth,
        onStart: () => {
            isThumbPressed.current = true;
        },
        onEnd: (percentage) => {

            isThumbPressed.current = false;

            const millis = (time.duration / 100) * percentage;

             onSeek(millis, () => {
                onStartPlay(onPlayHandler);
            })
        
        }
    });

    //onPlay listener 
    const onPlayHandler = (e: PlayBackType) => {
        setTime(e);
        const progress = (e.currentPosition / e.duration) * 100;
        const position = progressViewWidth / 100 * progress;

        if (progress < 100 && isThumbPressed.current == false) {
            translateX.value = position// withTiming(position, { duration: 50 });
        }
        else if (progress > 99 && isThumbPressed.current == false ) {
            setIsPlaying(false);
            translateX.value = 0;
            setTime({
                duration: 0,
                currentPosition: 0,
            });
        } 
    }


    // play/pause button handler
    const onButtonPress = () => {
        const progress = (time.currentPosition / time.duration) * 100;
        // resume
        if (progress > 0 && progress < 99 && !isPlaying) {
            setIsPlaying(true);
            onResumePlay();
            return;
        }

        // play from start
        if (!isPlaying) {
            setIsPlaying(true)
            onStartPlay(onPlayHandler);
        }
        // pause
        else {
            onPausePlay(() => {
                setIsPlaying(false)
            })
        }
    }

    return (
        <View style={[styles.container,
        {
            width: width
        }]}>
            {/* play button */}
            <TouchableRipple
                onPress={onButtonPress}
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
                    setProgressViewWidth(e.nativeEvent.layout.width)
                }}
            >
                {/* thumb */}
                <GestureDetector gesture={panGestureEvent}>
                    <Animated.View style={[
                        styles.thumb,
                        animatedGestureStyle,
                        playingStyleAnimated,
                        // { left: `${percentage}%` }
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