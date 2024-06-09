import React, { useCallback, useState } from 'react';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import Video, { VideoProperties } from 'react-native-video';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import IconIo from 'react-native-vector-icons/Ionicons'
import ButtonRipple from '../customButton/buttonRipple';
import { TouchHold } from '../customButton/touchHoldButton';



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

    //holds value if visible in screen or not
    const [isOnScreen, setIsOnScreen] = useState(false);
    //for volume
    const [muted, setMuted] = useState(mute);


    const onChange = useCallback((isVisible: boolean) => {
        props?.paused ? null : setIsOnScreen(isVisible);
    }, []);


    return (
        <TouchHold styles={props?.style!}
            onHold={() => setIsOnScreen(false)}
            onRelease={() => setIsOnScreen(true)}
        >
            {/* video */}
            <VisibilitySensor onChange={onChange}>
                <Video
                    // controls
                    {...props}
                    paused={!isOnScreen}
                    muted={muted}
                    style={[props.style]}
                />
            </VisibilitySensor>
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
        </TouchHold>

    )
}

