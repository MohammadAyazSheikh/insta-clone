import React, { useState } from 'react';
import { View, } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import styleSheet from './styles';
import { useAppSelector } from '../../redux/hooks';
import NotificationsCard from '../../components/cards/notificationCard/notificationCard';
import Header from '../../components/general/screenHeaders/header';
import { notificationsData } from '../../constants/data/notificationData';
import moment from 'moment';


export default function Notifications() {

    const { styles } = useStyles(styleSheet);
    const { screen: { width, height } } = UnistylesRuntime;
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { users: users_ } = useAppSelector(state => state.users);
    const [users, setUsers] = useState(users_);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* added this view because of flashList */}
                <View style={{ width, flex: 1 }}>
                    <Header title='Notifications' />
                    {/* user List */}
                    <FlashList
                        data={notificationsData}
                        estimatedItemSize={300}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <NotificationsCard
                                title={item.title}
                                subTitle={item.subTitle}
                                users={item.users}
                                type={item.type}
                                time={moment(item.time).fromNow()}
                            />
                        )}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

