
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { PlayBackType } from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';
type timeProp = {
    isPlaying: boolean,
    duration: number,
    currentPosition: number,
}

type hookProps = {
    path?: string,
}
// Enable playback in silence mode
Sound.setCategory('Playback');

const path_ = "file:///Users/apple/Library/Developer/CoreSimulator/Devices/18AAA775-E3E8-4E9C-B3E5-74777B37CA73/data/Containers/Data/Application/C853291C-39EA-4480-903F-4595A58E91BC/Library/Caches/sound.m4a"
//'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3';

export const useSoundPlayer = (uri: string = path_) => {

    const [error, setError] = useState<string | null>(null);

    const [isLoaded, setIsLoaded] = useState(false);

    //hold info of sound
    const [time, setTime] = useState<timeProp>({
        duration: 0,
        currentPosition: 0,
        isPlaying: false,
    });

    //reference for the setTimeout
    const intervalId = useRef<any>(0);

    //creating sound
    const sound = useMemo(() => {
        return new Sound(uri, undefined, (error) => {
            if (error) {
                setError(error);
                return;
            }
            //setting sound duration
            setTime(prev => {
                setIsLoaded(sound.isLoaded());
                return {
                    ...prev,
                    duration: sound.getDuration(),
                }
            })

        })
    }, []);

    useEffect(() => {
        sound.setVolume(1);
        //releasing sound resource associated with the sound instance
        return () => {
            sound.release();
        }
    }, []);

    const play = (onPlay: (prop: timeProp) => void, onEnd?: (success: boolean) => void) => {

        if (!error && isLoaded && sound) {

            sound.play((success => {
                onEnd && onEnd(success);
            }));

            //clearing interval if any old handler is attached
            clearInterval(intervalId.current);

            //getting current time/position/progress of sound after some interval
            intervalId.current = setInterval(() => {
                sound.getCurrentTime((seconds, isPlaying) => {
                    setTime(prev => {
                        onPlay && onPlay({
                            ...prev,
                            isPlaying,
                            currentPosition: seconds
                        });
                        return ({
                            ...prev,
                            currentPosition: seconds,
                            isPlaying,
                        })
                    });

                })
            }, 50);
        }
    }

    //stops and reset the sound like current position
    const stop = (cb?: () => void) => {
        sound.stop(() => {
            clearInterval(intervalId.current);
            cb && cb()
        })
    }

    //pause the sound
    const pause = (cb?: () => void) => {
        sound.pause(() => {
            clearInterval(intervalId.current);
            cb && cb()
        })
    }

    //seek to the specific position
    const seek = (seconds: number) => {
        sound.setCurrentTime(seconds)
    }

    return {
        isLoaded,
        error,
        time,
        setTime,
        play,
        pause,
        stop,
        seek,
        intervalId: intervalId.current,
    }
}




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



function convertSecondsToTime(seconds: number) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var seconds = Math.floor(seconds % 60);

    var timeString = '';

    if (hours < 10) {
        timeString += '0' + hours + ':';
    } else {
        timeString += hours + ':';
    }

    if (minutes < 10) {
        timeString += '0' + minutes;
    } else {
        timeString += minutes;
    }

    return timeString;
}
