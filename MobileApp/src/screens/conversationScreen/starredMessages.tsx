import React, { useEffect } from 'react';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { FlatList, SafeAreaView } from 'react-native';
import { getConversationData } from '../../constants/data/dummyData/conversation';
import { getMessages } from '../../redux/features/chat/chatSlice';
import Header from '../../components/general/screenHeaders/header';
import { RenderStarredBubble } from '../../components/chat/renderStarredBubble';



export default function StarredMessages() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const { user } = useAppSelector(state => state.user);
    const { messages } = useAppSelector(state => state.chat);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(getMessages(getConversationData(user!)))
    }, [])




    return (
        <SafeAreaView style={styles.container}>
            {/* ---Header--- */}
            <Header
                title='Starred messages'
            />
            {/* ---List--- */}
            <FlatList
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
    );
}

