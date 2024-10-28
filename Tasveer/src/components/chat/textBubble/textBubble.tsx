import React from 'react';
import { messageObjType } from '../../../constants/types/sharedTypes';
import BubbleWrapper from '../bubbleWrapper/bubbleWrapper';

type propsType = {
    message: messageObjType,
    onPress?: () => void,
    onLongPress?: () => void,
}


export default function TextBubble(props: propsType) {
    const { message } = props;
    return (
        <BubbleWrapper {...message}
            onPress={props?.onPress}
            onLongPress={props?.onLongPress}
        >

        </BubbleWrapper>
    );
}

