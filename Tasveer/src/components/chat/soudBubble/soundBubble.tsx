import React, { } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { messageObjType } from '../../../constants/types/sharedTypes';
import BubbleWrapper from '../bubbleWrapper/bubbleWrapper';
import SoundPlayer from '../sound/soundPlayer';
import { widthToDp } from '../../../utils/functions/responsiveUtils';
import { useStyles } from 'react-native-unistyles';


type propsType = {
    message: messageObjType,
    onPress?: () => void,
    onLongPress?: () => void,
}
export default function SoundBubble(props: propsType) {

    const {
        message,
    } = props;

    const { theme:{colors}} = useStyles({});

    const { user: sender, voice } = message;

    const { user } = useAppSelector(state => state.user);
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    const you = sender?.id == user?.id;


    // const colorBtn = !isDark && !you ? colors.primary1 : "white";
    // const maxTrackColor = !isDark && !you ? colors.common?.grey1 : "white";

    return (
        <BubbleWrapper {...message}
            onPress={props?.onPress}
            onLongPress={props?.onLongPress}
        >
            {/* <SoundSlider
                containerStyle={{ width: '100%' }}
                iconColor={colorBtn}
                thumbTintColor={colorBtn}
                maximumTrackTintColor={colors.grey1}
                minimumTrackTintColor={maxTrackColor}
                textStyle={{ color: maxTrackColor, fontSize: 10 }}
                path={voice}
            /> */}
            <SoundPlayer
                url={voice!}
                containerStyles={{ backgroundColor: 'transparent', width: widthToDp(80) }}
            />
        </BubbleWrapper>
    );
}

