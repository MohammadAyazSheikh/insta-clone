import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import Sound from 'react-native-sound';

// Sound.setCategory('PlayAndRecord');

// function millisToMinutesAndSeconds(millis) {
//     var minutes = Math.floor(millis / 60000);
//     var seconds = ((millis % 60000) / 1000).toFixed(0);
//     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
// }

type sliderProps = {
    minimumValue?: number,
    maximumValue?: number,
    minimumTrackTintColor?: string,
    maximumTrackTintColor?: string,
    thumbTintColor?: string,
    iconColor?: string,
    containerStyle?: ViewStyle | ViewStyle[],
    sliderStyle?: ViewStyle | ViewStyle[],
    textStyle?: TextStyle | TextStyle[],
    path?: string,
}
const SoundSlider = ({
    minimumValue = 0,
    maximumValue = 100,
    minimumTrackTintColor = 'tomato',
    maximumTrackTintColor = 'black',
    thumbTintColor = 'green',
    iconColor = 'green',
    containerStyle = {},
    sliderStyle = {},
    textStyle = {},
    path = 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3',
}: sliderProps) => {


    const { styles } = useFunctionalOrientation(responsiveStyles);
    const [toggle, setToggle] = useState(() => true);

    //sound code

    const [playing, setPlaying] = useState(false);
    const [currentTimePercentage, setCurrentTimePercentage] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [length, setLength] = useState<any>(null);
    const [err, setErr] = useState<string | null>(null);


    const intervalId = useRef(0);

    const audio = useMemo(() => {

        return new Sound(path, undefined, error => {
            if (error) {
                setErr('failed loading :(');
                console.log('failed to load the sound', error);
                return;
            }

            //if loaded successfully
            setIsLoading(false);
            setLength(audio.getDuration());
            setErr(null);
        });
    }, []);

    useEffect(() => {
        audio.setVolume(1);
        return () => {
            audio.release();
        };
    }, []);

    useEffect(() => {
        !playing && clearInterval(intervalId.current);
    }, [playing]);

    //for play pause
    useEffect(() => {
        if (!toggle) {
            //play
            const id = setInterval(() => {
                audio.getCurrentTime((sec, isPlaying) => {
                    setCurrentTimePercentage((100 / audio.getDuration()) * sec);
                    // console.log((100 / audio.getDuration()) * sec);
                    setCurrentTime(sec);
                });
            }, 100);

            // setIntervalId(id);
            intervalId.current = Number(id);
            setPlaying(true);

            audio.play(success => {
                if (success) {
                    setPlaying(false);
                    console.log('successfully finished playing');
                    setErr(null);
                } else {
                    setPlaying(false);
                    setErr('Failed playing :(')
                    console.log('playback failed due to audio decoding errors');
                }
            });
        } else {
            // pause && pause()
            //pause
            audio.pause();
            setPlaying(false);
            clearInterval(intervalId.current);
        }
    }, [toggle]);


    return (
        <View style={[styles.mainView, containerStyle]}>
            <TouchableOpacity
                onPress={() => {
                    setToggle(!toggle);
                }}>
                {playing ? (
                    <IconAnt name="pausecircleo" color={iconColor} size={24} />
                ) : (
                    <IconAnt name="playcircleo" color={iconColor} size={24} />
                )}
            </TouchableOpacity>
            <Slider
                style={{ flex: 1, ...sliderStyle }}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                value={currentTimePercentage}
                minimumTrackTintColor={minimumTrackTintColor}
                maximumTrackTintColor={maximumTrackTintColor}
                thumbTintColor={thumbTintColor}
                onSlidingComplete={value => {
                    audio.setCurrentTime((audio.getDuration() / 100) * value);
                    setCurrentTimePercentage((audio.getDuration() / 100) * value);
                    setCurrentTime((audio.getDuration() / 100) * value);
                    console.log('duration seek = ', (audio.getDuration() / 100) * value);
                    console.log('value = ', value);
                }}
            />
            <Text allowFontScaling={true} style={[styles.txtTime, textStyle]}>
                {
                    err ? (
                        err
                    ) : isLoading ? (
                        <ActivityIndicator color={'grey'} size={'small'} />
                    ) : (
                        `${moment.utc(currentTime * 1000).format('mm:ss')} / ${moment
                            .utc(length * 1000)
                            .format('mm:ss')}`
                    )
                    // isChatPlayer ?                                                  //duration
                    //     `${moment.utc(currentTime * 1000).format('mm:ss')} / ${moment.utc(audio.getDuration() * 1000).format('mm:ss')}`
                    //     :
                    //     `${millisToMinutesAndSeconds(value)} / ${millisToMinutesAndSeconds(maximumValue)}`
                }
            </Text>
        </View>
    );
};
export default SoundSlider;
