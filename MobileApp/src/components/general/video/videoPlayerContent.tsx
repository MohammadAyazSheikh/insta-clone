import React, { useCallback, useState } from 'react';
import {
    View,
} from 'react-native';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import Video, { VideoProperties } from 'react-native-video';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import IconIo from 'react-native-vector-icons/Ionicons'
import ButtonRipple from '../customButton/buttonRipple';



type vidProps = {
    showVolumeIcon?: boolean,
} & VideoProperties
export default function VideoPlayerContent({
    showVolumeIcon = true,
    ...props
}: vidProps) {

    const colors = useAppThemeColors();

    //holds value if visible in screen or not
    const [isOnScreen, setIsOnScreen] = useState(false);
    //for volume
    const [muted, setMuted] = useState(false);


    const onChange = useCallback((isVisible: boolean) => {
        setIsOnScreen(isVisible);
    }, []);

    
    return (

        <View style={props?.style}>
            {/* video */}
            <VisibilitySensor onChange={onChange}>
                <Video
                    {...props}
                    paused={!isOnScreen}
                    muted = {muted}
                    style = {[props.style]}
                />
            </VisibilitySensor>
            {/* volume icon */}
            {
                showVolumeIcon ?
                    <ButtonRipple
                        onPress={() => setMuted(prev => !prev)}
                        style = {{
                            position:'absolute',
                            bottom:10,
                            right:10
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
        </View>

    )
}

