import React, { } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import SoundSlider from '../../general/audioSheet/soundSlider';
import colors from '../../../theme/colors';
import { messageObjType } from '../../../constants/types/sharedTypes';
import BubbleWrapper from '../bubbleWrapper/bubbleWrapper';


type propsType = {
    message: messageObjType,
    onPress?: () => void,
    onLongPress?: () => void,
}
export default function SoundBubble(props: propsType) {

    const {
        message,
    } = props;

    const { user: sender, voice } = message;

    const { user } = useAppSelector(state => state.user);
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    const you = sender?.id == user?.id;

    const colorBtn = !isDark && !you ? colors.primary2 : "white";
    const maxTrackColor = !isDark && !you ? colors.grey1 : "white";

    return (
        <BubbleWrapper {...message}
            onPress={props?.onPress}
            onLongPress={props?.onLongPress}
        >
            <SoundSlider
                containerStyle={{ width: '100%' }}
                iconColor={colorBtn}
                thumbTintColor={colorBtn}
                maximumTrackTintColor={colors.grey1}
                minimumTrackTintColor={maxTrackColor}
                textStyle={{ color: maxTrackColor, fontSize: 10 }}
                path={voice}
            />
        </BubbleWrapper>
    );
}

