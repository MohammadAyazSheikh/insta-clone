
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import TextBubble from './textBubble/textBubble';
import ImageBubble from './imageBubble/imageBubble';
import SoundBubble from './soudBubble/soundBubble';
import DocumentBubble from './documentBubble/documentBubble';
import { messageObjType } from '../../constants/types/sharedTypes';
import { widthToDp as w } from '../../utils/functions/responsiveUtils';
import VideoBubble from './videoBubble/videoBubble';
import Animated from 'react-native-reanimated';
import {
    GestureDetector
} from 'react-native-gesture-handler';
import { useSlideGesture } from './hooks/slideGestureHook';
import LocationBubble from './locationBubble/locationBubble';
import UserAvatar from '../general/avatar/avatar';




type props = {
    message: messageObjType,
    setReplyMessage?: React.Dispatch<React.SetStateAction<messageObjType | undefined>>
}
export const RenderBubble = (props: props) => {


    const { selectedMessages } = useAppSelector(state => state.ui);
    const { user } = useAppSelector(state => state.user);
    const { message, setReplyMessage } = props;
    const {
        type,
        user: sender
    } = message;
    const you = sender?.id == user?.id;

    //checking if message is selected
    const isSelected = useMemo(() => selectedMessages?.find(m => m.id == message.id), [selectedMessages]);

    //calling slide gesture hook
    const { panGestureEvent, animatedStyle } = useSlideGesture(() => {
        setReplyMessage && setReplyMessage(message)
    });


    return (

        <View style={[
            styles.rootContainer,
            isSelected && styles.selected
        ]}>
            <GestureDetector gesture={panGestureEvent}>
                <Animated.View style={[
                    styles.bubbleContainer,
                    you && styles.bubbleContainerSender,
                    animatedStyle
                ]}
                >

                    {/* user avatar */}
                    <UserAvatar
                        size={40}
                        name={sender?.firstName || sender?.lastName || sender?.userName}
                        containerStyle={you ? styles.avatarSender : {}}
                    />

                    {/* if text */}
                    {
                        type == "text" ?
                            <TextBubble
                                message={message}
                            />
                            :
                            null
                    }
                    {/* if image */}
                    {

                        type == "image" ?
                            <ImageBubble
                                message={message}
                            />
                            :
                            null
                    }
                    {/* if voice */}
                    {

                        type == "voice" ?
                            <SoundBubble
                                message={message}
                            />
                            :
                            null
                    }
                    {/* if document */}
                    {

                        type == "document" ?
                            <DocumentBubble
                                message={message}
                            />
                            :
                            null
                    }
                    {/* if video */}
                    {

                        type == "video" ?
                            <VideoBubble
                                message={message}
                            />
                            :
                            null
                    }
                    {/* if video */}
                    {

                        type == "location" ?
                            <LocationBubble
                                message={message}
                            />
                            :
                            null
                    }
                </Animated.View>
            </GestureDetector>
        </ View >
    )
};


const styles = StyleSheet.create({
    rootContainer: {
        width: w(100),
    },
    bubbleContainer: {
        width: w(100),
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    bubbleContainerSender: {
        flexDirection: 'row-reverse'
    },
    avatarSender: {
        marginRight: 0,
        marginLeft: 5
    },
    selected: {
        backgroundColor: 'rgba(7, 94, 84, 0.2)'
    }
})