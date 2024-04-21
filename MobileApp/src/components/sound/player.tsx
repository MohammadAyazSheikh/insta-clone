import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { TouchableRipple } from "react-native-paper";
import IconEnt from 'react-native-vector-icons/Entypo';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import { useGestureAnimation } from "./hooks/sliderAnimationHooks";
import { TextRegular } from "../general/text/text";
import { timeProp, useSoundPlayer } from "./hooks/soundPayerHooks";
import moment from "moment";
const { width: deviceWidth } = Dimensions.get("window");

type sliderProps = {
    width?: number,
}

const Slider = ({
    width = deviceWidth,
}: sliderProps) => {

    //holds width of the view of progress line view
    const [progressViewWidth, setProgressViewWidth] = useState<number>(0);

    const [isPlaying, setIsPlaying] = useState(false);

    //if user press thumb we want to stop is movement when sound is plying
    //and have move thumb on the basis of gesture value
    const isThumbPressed = useRef(false);

    //sound hook
    const { play, pause, seek, stop, setTime, time, error, isLoaded } = useSoundPlayer();


    // animated value to move thumb towards right side when sound is playing
    const translateX = useSharedValue(0);

    const playingStyleAnimated = useAnimatedStyle(() => ( {
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

            //calculate the seek position by on the basis of thumb position
            const seconds = (time.duration / 100) * percentage;
            seek(seconds);

            //if sound is not being played then we will set the current position time
            //otherwise it will be set by the onPlayHandler
            !isPlaying && setTime(prev => ({
                ...prev,
                currentPosition: seconds
            }))
        }
    });

    //onPlay listener 
    const onPlayHandler = (e: timeProp) => {

        //sound progress in percentage
        const progress = (e.currentPosition / e.duration) * 100;
        //calculating thumb position a/c to sound progress
        const position = progressViewWidth / 100 * progress;

        //if sound being played move thumb
        if (progress < 100 && isThumbPressed.current == false) {
            translateX.value = position// withTiming(position, { duration: 50 });
        }
        //if playing completed reset of thumb position 
        else if (progress > 99 && isThumbPressed.current == false) {
            setIsPlaying(false);
            translateX.value = 0;
        }
    }

    //when sound ends it will be called
    const onSoundEnd = () => {
        setIsPlaying(false);
    }

    // play/pause button handler
    const onButtonPress = () => {
        // play from start
        if (!isPlaying) {
            setIsPlaying(true);
            play(onPlayHandler, onSoundEnd)
        }
        // pause
        else {
            pause(() => {
                setIsPlaying(false);
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
                disabled = {!isLoaded}
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
                    ]}
                    />
                </GestureDetector>
            </View>
            {/* time */}
            <TextRegular style={styles.txtTime}>
                {formateTime(time.currentPosition, time.duration)}
                {`  ${isLoaded}  `}
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
        backgroundColor: 'tomato',
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
        color: 'green',
        position: 'absolute',
        bottom: 2,
        right: 5,
        fontSize: 16
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



function formateTime(currentTime: number, duration: number) {
    return `${moment.utc(currentTime * 1000).format('mm:ss')} / ${moment
        .utc(duration * 1000)
        .format('mm:ss')}`;
}