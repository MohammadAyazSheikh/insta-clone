import React, { useCallback, useEffect, useRef, useState } from 'react';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import IconIo from 'react-native-vector-icons/Ionicons'
import ButtonRipple from '../customButton/buttonRipple';
import ApiStatusIndicator from '../apiStatusIndicator/ApiStatusIndicator';
import { View, ViewStyle } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useStyles } from 'react-native-unistyles';


type vidProps = {
    showVolumeIcon?: boolean,
    mute?: boolean,
    source: string,
    style: ViewStyle | ViewStyle[],
    paused?: boolean,
}

export default function VideoPlayerContent({
    showVolumeIcon = true,
    mute = true,
    source,
    style,
    paused = false
}: vidProps) {

    const { theme: { colors } } = useStyles({});
    //for volume
    const [muted, setMuted] = useState(mute);
    const [isOnScreen, setIsOnScreen] = useState(false);
    const [status, setStatus] = useState<'error' | 'idle' | 'loading' | 'readyToPlay'>('loading');

    const error = status == 'error' ? "could'nt play video" : null;



    const ref = useRef(null);
    // const [isPlaying, setIsPlaying] = useState(true);
    const player = useVideoPlayer(source, player => {
        // player.loop = true;
        player.play();
        player.muted = muted;
    });

    const onChange = (isOnScreen: boolean) => {
        if (paused)
            return;

        if (isOnScreen) {
            player.play();
            setIsOnScreen(isOnScreen);
        }
        else {
            player.pause();
            setIsOnScreen(isOnScreen);
        }
    }

    useEffect(() => {
        player.muted = muted;
    }, [muted]);

    useEffect(() => {
        // const subscription = player.addListener('playingChange', isPlaying => {
        //     setIsPlaying(isPlaying);
        // });

        paused && player.pause();
        const statusSubscription = player.addListener('statusChange', status => {
            setStatus(status);
        });

        return () => {
            // subscription.remove();
            statusSubscription.remove();
        };
    }, [player]);

    const RenderVideo = useCallback(() =>
        isOnScreen ? (
            <VideoView
                ref={ref}
                style={style}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
            />
        ) : null, [isOnScreen])



    return (
        <View style={style}>
            {
                <VisibilitySensor
                    onChange={onChange}>
                    <View style={[style]}>
                        {<RenderVideo />}
                    </View>
                </VisibilitySensor>

            }
            {/* volume icon */}
            {
                showVolumeIcon ?
                    <ButtonRipple
                        onPress={() => setMuted(prev => !prev)
                        }
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                        }}
                    >
                        {
                            muted ?
                                <IconIo
                                    name='volume-mute'
                                    size={25}
                                    color={colors.secondary1}
                                />
                                :
                                <IconIo
                                    name='volume-high'
                                    size={25}
                                    color={colors.secondary1}
                                />
                        }
                    </ButtonRipple>
                    : null
            }
            {/* video status */}
            <ApiStatusIndicator isLoading={status == 'loading'} errorText={error} style={{ backgroundColor: "transparent" }} />
        </View>
    )
}

