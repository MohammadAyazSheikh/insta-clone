import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { getConversationData } from '../../constants/data/conversation';
import { getMessages } from '../../redux/features/chat/chatSlice';
import Header from '../../components/general/screenHeaders/header';
import { RenderStarredBubble } from '../../components/chat/renderStarredBubble';
import styleSheet from './styles/styles';
import { useStyles } from 'react-native-unistyles';
import { FlashList } from 'react-native-collapsible-tab-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useKeyboardVisibility } from '../../hooks/keyboardHooks';



export default function StarredMessages() {

    const { styles } = useStyles(styleSheet);
    // keyboard style
    const { style } = useKeyboardVisibility();
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { user } = useAppSelector(state => state.user);
    const { messages } = useAppSelector(state => state.chat);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(getMessages(getConversationData(user!)))
    }, [])




    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* ---Header--- */}
                <Header
                    title='Starred messages'
                />
                {/* ---List--- */}
                <FlashList
                    style={styles.scrollContainer}
                    inverted
                    data={messages}
                    keyExtractor={(item => item.id.toString())}
                    renderItem={({ item, index }) => (
                        <RenderStarredBubble
                            message={item}
                        />
                    )}
                />
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

