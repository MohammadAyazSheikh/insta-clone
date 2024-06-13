import React, { useRef, useState } from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import IconEnt from 'react-native-vector-icons/Entypo';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import { useGestureAnimation } from "./hooks/sliderAnimationHooks";
import { TextRegular } from "../../general/text/text";
import { timeProp, useSoundPlayer } from "./hooks/soundPlayerHooks";
import moment from "moment";
import responsiveStyles from "./styles/styles";
import { useFunctionalOrientation } from "../../../utils/functions/responsiveUtils";
import { path } from "./hooks/soundRecorderhooks";
// import colors from "../../../theme/colors";
// const { width: deviceWidth } = Dimensions.get("window");

type sliderProps = {
    // width?: number,
    url: string,
    containerStyles?: ViewStyle,
    progressStyles?: ViewStyle,
    thumbStyles?: ViewStyle,
    iconColor?: string,
    timeStyles?: TextStyle,
}

const SoundPlayer = ({
    // width = deviceWidth,
    url = path!,
    thumbStyles,
    progressStyles,
    containerStyles,
    iconColor,
    timeStyles,
}: sliderProps) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    //holds width of the view of progress line view
    const [progressViewWidth, setProgressViewWidth] = useState<number>(0);

    const [isPlaying, setIsPlaying] = useState(false);

    //if user press thumb we want to stop its movement when sound is playing
    //and have to move thumb on the basis of gesture value
    const isThumbPressed = useRef(false);

    //sound hook
    const { play, pause, seek, setTime, time, isLoaded, error } = useSoundPlayer(url);


    // animated value to move thumb towards right side when sound is playing
    const translateX = useSharedValue(0);

    const playingStyleAnimated = useAnimatedStyle(() => ({
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
        <View style={[
            styles.playerContainer,
            containerStyles,
            // {
            //     width: width
            // },
        ]}>
            {/* play button */}
            <TouchableRipple
                onPress={onButtonPress}
                disabled={!isLoaded}
            >
                <IconEnt
                    color={iconColor || "white"}
                    size={30}
                    name={isPlaying ? 'controller-paus' : 'controller-play'}
                />
            </TouchableRipple>
            {/* progress */}
            <View style={[styles.playerProgressView, progressStyles]}
                onLayout={(e) => {
                    console.log(e.nativeEvent.layout.width)
                    setProgressViewWidth(e.nativeEvent.layout.width)
                }}
            >
                {/* thumb */}
                <GestureDetector gesture={panGestureEvent}>
                    <Animated.View style={[
                        styles.thumb,
                        thumbStyles,
                        animatedGestureStyle,
                        playingStyleAnimated,
                    ]}
                    />
                </GestureDetector>
            </View>
            {/* time */}
            {
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    {
                        isLoaded ?
                            <TextRegular
                                adjustsFontSizeToFit
                                style={[styles.txtQuickTime, timeStyles]}>
                                {formateTime(time.currentPosition, time.duration, isPlaying)}
                            </TextRegular>
                            :
                            <ActivityIndicator
                                size={"small"}
                                color={'white'}
                            />
                    }
                </View>
            }

        </View>
    )

}

export default SoundPlayer;


// const styles = StyleSheet.create({

// })







function formateTime(currentTime: number, duration: number, isPlaying: boolean) {


    return (
        currentTime > 0 ?
            `${moment.utc(currentTime * 1000).format('mm:ss')}`
            :
            `${moment.utc(duration * 1000).format('mm:ss')}`
    )


    // return `${moment.utc(currentTime * 1000).format('mm:ss')} / ${moment
    //     .utc(duration * 1000)
    //     .format('mm:ss')}`;
}