import React, { useCallback, useState } from 'react';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import Video, { VideoProperties } from 'react-native-video';
import IconIo from 'react-native-vector-icons/Ionicons'
import ButtonRipple from '../customButton/buttonRipple';
// import { TouchHold } from '../customButton/touchHoldButton';
import ApiStatusIndicator from '../apiStatusIndicator/ApiStatusIndicator';
import { View } from 'react-native';

type vidProps = {
    showVolumeIcon?: boolean,
    mute?: boolean,
    isVisible: boolean,
} & VideoProperties

export default function VideoPlayerReel({
    showVolumeIcon = true,
    mute = true,
    isVisible,
    ...props
}: vidProps) {

    const colors = useAppThemeColors();
    //for volume
    const [muted, setMuted] = useState(mute);
    const [isBuffering, setIsBuffering] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const RenderVideo = useCallback(() => isVisible ? (
        <Video
            muted={muted}
            onError={(e) => setError(e?.error?.errorString)}
            onBuffer={(prop) => {
                setIsBuffering(prop.isBuffering)
            }}
            controls
            // {...props}
            source={props.source}
            paused={!isVisible}
            style={{ width: "100%", height: "100%" }}
        />
    ) : null, [isVisible]);

    return (
        <View
            style={[props.style]}
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
            <ApiStatusIndicator isLoading={isBuffering} errorText={error} style={{ backgroundColor: "transparent" }} />
        </View >
    )
}

