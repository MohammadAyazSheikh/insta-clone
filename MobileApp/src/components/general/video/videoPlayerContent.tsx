import React, { useCallback, useEffect, useState } from 'react';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import Video, { VideoProperties } from "react-native-video";
// import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';

import { VisibilitySensor } from '@futurejj/react-native-visibility-sensor';
import IconIo from 'react-native-vector-icons/Ionicons'
import ButtonRipple from '../customButton/buttonRipple';
import { TouchHold } from '../customButton/touchHoldButton';
import ApiStatusIndicator from '../apiStatusIndicator/ApiStatusIndicator';

import { View } from 'react-native';
import { TextRegular } from '../text/text';
import CustomButton from '../customButton/customButton';
import {
    ViewPortDetector,
} from "react-native-viewport-detector";

type vidProps = {
    showVolumeIcon?: boolean,
    mute?: boolean,
} & VideoProperties

export default function VideoPlayerContent({
    showVolumeIcon = true,
    mute = true,
    ...props
}: vidProps) {

    const colors = useAppThemeColors();
    //for volume
    const [muted, setMuted] = useState(mute);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isOnScreen, setIsOnScreen] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const onChange = (v: boolean) => {
        setIsOnScreen(v);
    }

    const RenderVideo = useCallback(() =>
        isOnScreen ? (
            <Video
                muted={muted}
                onError={(e) => setError(e?.error?.errorString)}
                onBuffer={(prop) => {
                    setIsBuffering(prop.isBuffering)
                }}
                controls
                {...props}
                source={props.source}
                style={{ width: "100%", height: "100%" }}
            />
        ) : null, [isOnScreen])

    return (
        <View style={props.style}>
            {
                <VisibilitySensor
                    onChange={onChange}>
                    <View style={[props.style]}>
                        {<RenderVideo />}
                    </View>
                </VisibilitySensor>

            }
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
        </View>
    )
}

