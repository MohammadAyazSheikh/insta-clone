import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import IconIo from 'react-native-vector-icons/Ionicons'
import ButtonRipple from '../customButton/buttonRipple';
import ApiStatusIndicator from '../apiStatusIndicator/ApiStatusIndicator';
import { View } from 'react-native';
import { ViewStyle } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

type vidProps = {
    showVolumeIcon?: boolean,
    isVisible: boolean,

    mute?: boolean,
    source: string,
    style: ViewStyle | ViewStyle[]
}

function VideoPlayerReel({
    showVolumeIcon = true,
    isVisible,

    mute = true,
    source,
    style
}: vidProps) {

    const colors = useAppThemeColors();
    //for volume
    const [muted, setMuted] = useState(mute);

    const [status, setStatus] = useState<'error' | 'idle' | 'loading' | 'readyToPlay'>('loading');

    const error = status == 'error' ? "could'nt play video" : null;

    const ref = useRef(null);

    const player = useVideoPlayer(source, player => {
        player.play();
        player.muted = muted;
    });



    useEffect(() => {
        player.muted = muted;
    }, [muted]);

    useEffect(() => {
        isVisible ? player.play() : player.pause();
    }, [isVisible]);

    useEffect(() => {
        const statusSubscription = player.addListener('statusChange', status => {
            setStatus(status);
        });

        return () => {
            statusSubscription.remove();
        };
    }, [player]);

    const RenderVideo = useCallback(() =>
        isVisible ? (
            <VideoView
                ref={ref}
                style={style}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
            />
        ) : null, [isVisible])

    return (
        <View
            style={style}
        >
            {/* video */}
            <RenderVideo />
            {/* volume icon */}
            {
                showVolumeIcon ?
                    <ButtonRipple
                        onPress={() => setMuted(prev => !prev)}
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10
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
            <ApiStatusIndicator isLoading={status == 'loading'} errorText={error} style={{ backgroundColor: "transparent" }} />
        </View >
    )
}

export default React.memo(VideoPlayerReel);
