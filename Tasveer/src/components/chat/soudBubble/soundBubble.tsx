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

    const { theme: { colors } } = useStyles({});

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
            <SoundPlayer
                url={voice!}
                thumbStyles={{ backgroundColor: !you && isDark ? "white" : !you && !isDark ? colors.ternary1 : "white" }}
                iconColor={!you && isDark ? "white" : !you && !isDark ? colors.ternary1 : "white"}
                containerStyles={{ backgroundColor: 'transparent', width: widthToDp(80) }}
            />
        </BubbleWrapper>
    );
}

