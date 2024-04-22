import React, { useState, useEffect, createRef } from 'react';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { RenderBubble } from '../../components/chat/renderBubble';
import { messageObjType } from '../../constants/types/sharedTypes';
import { FlatList, SafeAreaView } from 'react-native';
import { SenderFooter } from '../../components/chat/senderFooter/senderFooter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getConversationData } from '../../constants/data/conversation';
import { appendMessage, getMessages } from '../../redux/features/chat/chatSlice';
import ChatHeader from '../../components/chat/chatHeader/chatHeader';
import { RenderMsgAlert } from '../../components/general/alerts/messageOptionsAlert';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { RenderReaction } from '../../components/chat/reactions/reactions';
import ReactionSheet from '../../components/chat/reactions/reactionSheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export const chatScrollRef = createRef<FlatList>();
export const refReactionSheet = createRef<BottomSheet>();

export default function Conversation(props: StackScreenProps<RootStackProps, 'Conversation'>) {


    const { styles } = useFunctionalOrientation(responsiveStyles);

    const colors = useAppThemeColors();

    //messageId for scrolling to that message
    const messageId = props?.route?.params?.messageId;

    const { user } = useAppSelector(state => state.user);
    const { messages } = useAppSelector(state => state.chat);
    const dispatch = useAppDispatch();

    // reply message
    const [replyMessage, setReplyMessage] = useState<messageObjType>();
    // selected messages state
    const { selectedMessages } = useAppSelector(state => state.ui);

    useEffect(() => {
        dispatch(getMessages(getConversationData(user!)));
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

            console.log(messageId, "😀")
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

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* header */}
                <ChatHeader
                    showOptions={selectedMessages.length > 0}
                />
                {/* list messages */}
                <GestureHandlerRootView style={styles.container}>
                    <FlatList
                        ref={chatScrollRef}
                        style={styles.scrollContainer}
                        inverted
                        data={messages}
                        keyExtractor={(item => item.id.toString())}
                        renderItem={({ item, index }) => (
                            <RenderBubble
                                message={item}
                                setReplyMessage={setReplyMessage}
                            />
                        )}

                    />

                </GestureHandlerRootView>
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
            </SafeAreaView >
        </SafeAreaProvider>
    );

}

