import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/general/screenHeaders/header';
import SearchBar from '../../components/general/searchbars/searchbar';
import InboxCard from '../../components/cards/inboxCard/inboxCard';
import { inboxData } from '../../constants/data/inboxData';
import styles from './styles/styles';
import { FlashList } from '@shopify/flash-list';
import moment from 'moment';


export default function Inbox() {

    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const colors = useAppThemeColors();
    // const { theme } = useAppSelector(state => state.theme);
    // const dispatch = useAppDispatch();


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
               
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

