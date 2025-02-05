import React, { useState } from 'react';
import { View, } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/general/searchbars/searchbar';
import { FlashList } from '@shopify/flash-list';
import IconAnt from "@expo/vector-icons/AntDesign";
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import styleSheet from './styles';
import colors from '../../theme/colors';
import ButtonRipple from '../../components/general/customButton/buttonRipple';
import { useAppSelector } from '../../redux/hooks';
import UserCard from '../../components/cards/userCard/userCard';


export default function Search() {

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
                    {/* Header */}
                    <View style={styles.headerView}>
                        {/* back icon */}
                        <ButtonRipple
                            onPress={() => navigation.goBack()}
                            style={{ marginRight: 5 }}
                        >
                            <IconAnt
                                name="left"
                                size={26}
                                color={colors.primary1}
                            />
                        </ButtonRipple>
                        {/* search bar */}
                        <SearchBar
                            containerStyles={{ flex: 1 }}
                            onClear={() => {
                                setUsers(users_)
                            }}
                            onChangeText={(val) => {
                                if (!val) {
                                    setUsers(users_);
                                    return;
                                }
                                const text = val.toLowerCase();
                                const u = users_.filter(u =>
                                (
                                    u.firstName?.toLowerCase()?.includes(text) ||
                                    u.lastName?.toLowerCase()?.includes(text) ||
                                    u.userName?.toLowerCase()?.includes(text)
                                ));
                                setUsers(u);
                            }}
                        />
                    </View>
                    {/* user List */}
                    <FlashList
                        data={users}
                        estimatedItemSize={300}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <UserCard
                                title={`${item.firstName} ${item.lastName}`}
                                subTitle={item.userName}
                                avatar={item.profileImage}
                                onPress={() => navigation.navigate("UserProfile", { user: item })}
                            />
                        )}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

