import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Alert, Text, FlatList } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import CustomButton from '../../components/general/customButton/customButton';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import Loader from '../../components/general/loader/loader';
import TextBox from '../../components/general/textBox/textBox';
import IconFe from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextBold, TextRegular } from '../../components/general/text/text';
import { showDismissAlert } from '../../components/general/alerts/dismissAlert';
import { authSuccess, logoutSuccess } from '../../redux/features/user/userSlice';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/general/screenHeaders/header';
import SearchBar from '../../components/general/searchbars/searchbar';
import InboxCard from '../../components/cards/inboxCard/inboxCard';
import { users } from '../../constants/data/usersData';
import inboxData from '../../constants/data/inboxData';

type loginProps = {
    username?: string,
    password?: string,
}

type loginPropsErr = {
    username?: string,
    password?: string,
}

export default function Inbox() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
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
                        onPress={()=>navigation.navigate("Conversation",{messageId:1})}
                    />)}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

