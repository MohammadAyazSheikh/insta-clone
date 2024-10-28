import React, { useState } from 'react';
import { ImageStackList } from './imageStack';
import SliderModal from '../../general/imageSliderModal/imageSliderModal';
import { messageObjType } from '../../../constants/types/sharedTypes';
import BubbleWrapper from '../bubbleWrapper/bubbleWrapper';

type propsType = {
    message: messageObjType,
    onPress?: () => void,
    onLongPress?: () => void,
}

export default function ImageBubble(props: propsType) {

    const {
        message
    } = props;


    const [isOpen, setIsOpen] = useState(false);

    return (

        <BubbleWrapper {...message}
            onPress={() => {
                setIsOpen(true);
                props?.onPress && props?.onPress()
            }}
            onLongPress={() => {
                props?.onLongPress &&
                    props?.onLongPress();
            }}
        >
            <ImageStackList
                imageList={
                    message?.imageList?.length ?
                        message?.imageList :
                        []
                }
            />
            {/* -------- slider---- */}
            <SliderModal
                scrollIndex={0}
                imageList={message.imageList!}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </BubbleWrapper>

    );
}

