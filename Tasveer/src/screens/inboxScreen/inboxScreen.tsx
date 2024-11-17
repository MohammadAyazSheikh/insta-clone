import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/general/screenHeaders/header';
import SearchBar from '../../components/general/searchbars/searchbar';
import InboxCard from '../../components/cards/inboxCard/inboxCard';
import inboxData from '../../constants/data/inboxData';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';


export default function Inbox() {

    const { styles } = useStyles(styleSheet)
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const colors = useAppThemeColors();
    // const { theme } = useAppSelector(state => state.theme);
    // const dispatch = useAppDispatch();


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* header */}
                <Header title='Inbox' />
                {/* search bar */}
                <SearchBar
                    containerStyles={{ width: '95%' }}
                />
                {/* list */}
                <FlatList
                    contentContainerStyle={styles.scroll}
                    data={inboxData}
                    renderItem={({ item }) => (<InboxCard
                        title={item.sender}
                        subTitle={item.subject}
                        time={item.timestamp}
                        badge={item.badge!}
                        onPress={() => navigation.navigate("Conversation", { messageId: 1 })}
                    />)}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

