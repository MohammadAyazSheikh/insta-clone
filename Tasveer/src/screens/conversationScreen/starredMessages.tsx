import React, { useEffect, createRef, useCallback } from 'react';
import styleSheet from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { RenderBubble } from '../../components/chat/renderBubble';
import { messageObjType } from '../../constants/types/sharedTypes';
import { getConversationData } from '../../constants/data/conversation';
import { getMessages } from '../../redux/features/chat/chatSlice';
import { RenderMsgAlert } from '../../components/general/alerts/messageOptionsAlert';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { RenderReaction } from '../../components/chat/reactions/reactions';
import ReactionSheet from '../../components/chat/reactions/reactionSheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import { FlashList } from '@shopify/flash-list';
import { useKeyboardVisibility } from '../../hooks/keyboardHooks';
import Animated from 'react-native-reanimated';
import Header from '../../components/general/screenHeaders/header';
import { users } from '../../constants/data/generateUsers';
import { Platform } from 'react-native';



export const chatScrollRef = createRef<FlashList<messageObjType>>();
export const refReactionSheet = createRef<BottomSheet>();
const SafeAreaAnim = Animated.createAnimatedComponent(SafeAreaView);

export default function StarrMessage(props: StackScreenProps<RootStackProps, 'StarredMessages'>) {


    const { styles } = useStyles(styleSheet);
    const { user } = useAppSelector(state => state.user);
    const { messages } = useAppSelector(state => state.chat);
    const starredMsg = messages.filter(m => m.starred)
    const dispatch = useAppDispatch();

    //for feting conversation from server
    // const conversationId = props?.route?.params?.conversationId;




    // keyboard style
    const { style } = useKeyboardVisibility();


    useEffect(() => {
        dispatch(getMessages(getConversationData(user!, users[0])));
    }, []);





    //function to render message
    const renderBubble = useCallback(({ item }: { item: messageObjType }) => (
        <RenderBubble
            message={item}
            setReplyMessage={() => ""}
        />
    ), []);

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
                <Header title='Starred Messages' />
                {/* list messages */}
                <FlashList
                    ref={chatScrollRef}
                    style={styles.scrollContainer}
                    inverted
                    data={starredMsg}
                    keyExtractor={(item => item.id.toString())}
                    renderItem={renderBubble}
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

