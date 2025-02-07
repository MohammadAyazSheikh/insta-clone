import React, { useState, useEffect, createRef, useCallback } from 'react';
import styleSheet from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { RenderBubble } from '../../components/chat/renderBubble';
import { messageObjType } from '../../constants/types/sharedTypes';
import { SenderFooter } from '../../components/chat/senderFooter/senderFooter';
import { getConversationData } from '../../constants/data/conversation';
import { appendMessage, getMessages } from '../../redux/features/chat/chatSlice';
import ChatHeader from '../../components/chat/chatHeader/chatHeader';
import { RenderMsgAlert } from '../../components/general/alerts/messageOptionsAlert';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { RenderReaction } from '../../components/chat/reactions/reactions';
import ReactionSheet from '../../components/chat/reactions/reactionSheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import { FlashList } from '@shopify/flash-list';
import { useKeyboardVisibility } from '../../hooks/keyboardHooks';
import Animated from 'react-native-reanimated';
import { Platform } from 'react-native';



export const chatScrollRef = createRef<FlashList<messageObjType>>();
export const refReactionSheet = createRef<BottomSheet>();
const SafeAreaAnim = Animated.createAnimatedComponent(SafeAreaView);

export default function Conversation(props: StackScreenProps<RootStackProps, 'Conversation'>) {


    const { styles } = useStyles(styleSheet);
    const { user } = useAppSelector(state => state.user);
    const { messages } = useAppSelector(state => state.chat);
    const dispatch = useAppDispatch();

    //for feting conversation from server
    // const conversationId = props?.route?.params?.conversationId;
    //user who with we are chatting
    const recipient = props?.route?.params?.recipient;
    //messageId for scrolling to that message from star msg screen
    const messageId = props?.route?.params?.messageId;
    // keyboard style
    const { style } = useKeyboardVisibility();

    // reply message
    const [replyMessage, setReplyMessage] = useState<messageObjType>();
    // selected messages state
    const { selectedMessages } = useAppSelector(state => state.ui);


    useEffect(() => {
        dispatch(getMessages(getConversationData(user!, recipient)));
    }, []);

    useEffect(() => {
        //if user comes from starred messages screen 
        //then scroll to tah message

        if (!messageId)
            return;
        //scroll to message
        const scrollToMessage = () => {
            const staredIndex = messages.findIndex(msg => msg.id == messageId);

            if (staredIndex == -1)
                return;

            chatScrollRef?.current &&
                chatScrollRef?.current?.scrollToIndex({
                    animated: true,
                    index: staredIndex,
                });

        }
        scrollToMessage();
    }, [messageId])


    const onSend = (msg: messageObjType) => {
        const { type } = msg;

        if (type == "text") {
            //kuch karo bhaiii
        }

        //if image
        if (type == "image") {
            //do something
        }

        //if voice
        if (type == "voice") {
            //do something
        }


        //send/append message
        dispatch(appendMessage(msg));

        // scroll to end
        chatScrollRef.current &&
            chatScrollRef.current?.scrollToIndex({
                index: 0,
                animated: true
            })
    }

    //function to render message
    const renderBubble = useCallback(({ item }: { item: messageObjType }) => (
        <RenderBubble
            message={item}
            setReplyMessage={setReplyMessage}
        />
    ), [setReplyMessage]);

    return (
        <SafeAreaProvider>
            <SafeAreaAnim
                style={[styles.container,
                Platform.select({
                    ios: style,
                    android: null
                })
            ]}
            >
                {/* header */}
                <ChatHeader
                    showOptions={selectedMessages.length > 0}
                    recipient={recipient}
                />
                {/* list messages */}
                <FlashList
                    ref={chatScrollRef}
                    style={styles.scrollContainer}
                    inverted
                    data={messages}
                    keyExtractor={(item => item.id.toString())}
                    renderItem={renderBubble}
                />
                {/* Footer */}
                <SenderFooter
                    {
                    ...{
                        onSend,
                        replyMessage,
                        setReplyMessage,
                    }
                    }
                />
                {/* message option for delete */}
                <RenderMsgAlert />
                {/* modal for reacting in messages */}
                <RenderReaction />
                {/* sheet for showing reaction in a message */}
                <ReactionSheet
                    ref={refReactionSheet}
                    snapPoints={["50%"]}
                />
            </SafeAreaAnim >
        </SafeAreaProvider>
    );

}

