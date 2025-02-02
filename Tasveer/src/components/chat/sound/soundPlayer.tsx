import React, { useRef, useState } from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import IconEnt from '@expo/vector-icons/Entypo';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import { useSliderGesture } from "./hooks/sliderAnimationHooks";
import { TextRegular } from "../../general/text/text";
import { timeProp, useSoundPlayer } from "./hooks/soundPlayerHooks";
import moment from "moment";
import styleSheet from "./styles/styles";
import { THUMB_WIDTH } from "./styles/portraitStyles";
import { useStyles } from "react-native-unistyles";



type sliderProps = {
    url: string,
    containerStyles?: ViewStyle,
    progressStyles?: ViewStyle,
    thumbStyles?: ViewStyle,
    iconColor?: string,
    timeStyles?: TextStyle,
}

const SoundPlayer = ({
    url,
    thumbStyles,
    progressStyles,
    containerStyles,
    iconColor,
    timeStyles,
}: sliderProps) => {

    const { styles, theme: { colors } } = useStyles(styleSheet);

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
    const { animatedGestureStyle, panGestureEvent } = useSliderGesture({
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
        setTime({
            ...time,
            currentPosition: 0,
            isPlaying: false,
        });
        onPlayHandler({
            ...time,
            currentPosition: 0,
            isPlaying: false,
        })

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
        ]}>
            {/* play button */}
            <TouchableRipple
                onPress={onButtonPress}
                disabled={!isLoaded}
            >
                <IconEnt
                    color={iconColor || colors.primary1}
                    size={30}
                    name={isPlaying ? 'controller-paus' : 'controller-play'}
                />
            </TouchableRipple>
            {/* progress */}
            <View style={[styles.playerProgressView, progressStyles]}
                onLayout={(e) => {
                    //set progress width =  minus thumb width to progress width
                    //because when we translating thumb ac/ to width of progressbar
                    //when it reaches to 100% (at end of progress) thumb is going out from progress 
                    setProgressViewWidth(e.nativeEvent.layout.width - THUMB_WIDTH);
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
                        isLoaded && !error ?
                            <TextRegular
                                adjustsFontSizeToFit
                                style={[styles.txtQuickTime, timeStyles]}>
                                {formateTime(time.currentPosition, time.duration, isPlaying)}
                            </TextRegular>
                            :
                            null
                    }
                    {
                        !isLoaded && !error ?
                            <ActivityIndicator
                                size={"small"}
                                color={'white'}
                            />
                            :
                            null
                    }
                    {
                        error ?
                            <TextRegular
                                adjustsFontSizeToFit
                                style={[styles.txtQuickTime, timeStyles]}
                            >
                                {error?.message}
                            </TextRegular>
                            : null
                    }
                </View>
            }

        </View>
    )

}

export default SoundPlayer;









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