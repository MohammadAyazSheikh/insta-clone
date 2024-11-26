import React, { useCallback, useEffect, useRef, useState } from 'react';
import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import IconIo from '@expo/vector-icons/Ionicons'
import ButtonRipple from '../customButton/buttonRipple';
import ApiStatusIndicator from '../apiStatusIndicator/ApiStatusIndicator';
import { View, ViewStyle } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useStyles } from 'react-native-unistyles';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { generateThumbnail } from './videoThumbnail';

type vidProps = {
    showVolumeIcon?: boolean,
    mute?: boolean,
    source: string | any,
    style: ViewStyle | ViewStyle[],
    paused?: boolean,
}

function VideoPlayerContent({
    showVolumeIcon = true,
    mute = true,
    source,
    style,
    paused = false
}: vidProps) {

    const { theme: { colors } } = useStyles({});
    //for thumbnail
    const [thumbnail, setThumbnail] = useState<null | string>(null);

    //for volume
    const [muted, setMuted] = useState(mute);
    const [isOnScreen, setIsOnScreen] = useState(false);
    const [status, setStatus] = useState<'error' | 'idle' | 'loading' | 'readyToPlay'>('loading');
    const [playing, setIsPlaying] = useState(false);

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

    //initializing video
    useEffect(() => {
        const subscription = player.addListener('playingChange', (isPlaying) => {
            setIsPlaying(isPlaying.isPlaying);
        });

        paused && player.pause();
        const statusSubscription = player.addListener('statusChange', status => {
            setStatus(status.status);
        });

        return () => {
            statusSubscription.remove();
            subscription.remove();
        };
    }, [player]);

    //getting thumbnail on mount
    useEffect(() => {
        const url = source?.uri || source
        generateThumbnail(url, setThumbnail);
    }, []);

    //function to render video
    const RenderVideo = useCallback(() =>
        isOnScreen ? (
            <VideoView
                ref={ref}
                style={style}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
            />
        ) : null, [isOnScreen]);



    return (
        <View style={style}>
            {
                //video thumbnail
                thumbnail && (!playing || status === "loading") ?
                    <View style={{ ...StyleSheet.absoluteFillObject }}>
                        <Image source={{ uri: thumbnail! }} style={{ ...StyleSheet.absoluteFillObject }} />
                    </View>
                    :
                    null
            }
            {
                // rendering
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
            <ApiStatusIndicator
                isLoading={status === 'loading' || !thumbnail && !playing}
                errorText={error}
                style={{ backgroundColor: "transparent" }} />
        </View>
    )
}


export default React.memo(VideoPlayerContent);

