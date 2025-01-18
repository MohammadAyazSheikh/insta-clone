import React, { useCallback, useMemo } from 'react';
import { widthToDp } from '../../utils/functions/responsiveUtils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import ProfileHeader from './header';
import IconMtc from '@expo/vector-icons/MaterialCommunityIcons';
import IconFa5 from '@expo/vector-icons/FontAwesome5';
import { discoverData } from '../../constants/data/discoverData';
import { renderUserPosts } from './renderUserItems';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { View } from 'react-native';
import Header from '../../components/general/screenHeaders/header';
import IconIo from "@expo/vector-icons/Ionicons";
import ButtonRipple from '../../components/general/customButton/buttonRipple';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export const postSize = widthToDp(100) / 3
export const reelSize = widthToDp(100) / 2

export const getTabIcon = (name: string, color: string) => {
    return ({
        VIDEOS: <IconMtc
            name={"movie-play"}
            color={color}
            size={25}
        />,
        POSTS: <IconMtc
            name={"grid"}
            color={color}
            size={25}
        />,
        tagged: <IconFa5
            name={"user-tag"}
            color={color}
            size={25}
        />
    }[name]);

}
export default function Profile() {

    const { styles, theme: { colors } } = useStyles(styleSheet);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();


    //menu button
    const MenuIcon = useCallback(() => (
        <ButtonRipple onPress={() => navigation.navigate("Setting")}>
            <IconIo name="menu" color={colors.secondary1} size={30} />
        </ButtonRipple>
    ), [])


    return (
        <SafeAreaProvider >
            <SafeAreaView
                style={styles.container}
            >
                {/* header */}
                <Header
                    title={`${user?.firstName} ${user?.lastName}`}
                    showLeftIcon={false}
                    showRightIcon
                    rightIcon={MenuIcon}
                />
                {/* tabs */}
                <Tabs.Container
                    revealHeaderOnScroll
                    renderHeader={() => <ProfileHeader
                        user={user!}  
                    />}
                    renderTabBar={props => (
                        <MaterialTabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: colors.ternary1, paddingVertical: 2 }}
                            style={{ backgroundColor: colors.primary1 }}
                        />
                    )}
                >
                    <Tabs.Tab name="POSTS"
                        label={(prop) => getTabIcon(prop.name, colors.secondary1)}
                    >
                        {
                            <View style={{ width: "100%", height: "100%" }}>
                                <Tabs.FlashList
                                    numColumns={3}
                                    data={discoverData}
                                    renderItem={renderUserPosts}
                                    keyExtractor={(_item: any, index: any) => _item?.id + 1}
                                    estimatedItemSize={postSize}
                                />
                            </View>
                        }
                    </Tabs.Tab>
                    <Tabs.Tab name="VIDEOS"
                        label={(prop) => getTabIcon(prop.name, colors.secondary1)}
                    >
                        <View style={{ width: "100%", height: "100%" }}>
                            <Tabs.FlashList
                                numColumns={2}
                                data={discoverData.filter(item => item.type != "image")}
                                renderItem={renderUserPosts}
                                keyExtractor={(_item: any, index: any) => _item?.id + 1}
                                estimatedItemSize={reelSize}
                            />
                        </View>
                    </Tabs.Tab>
                </Tabs.Container>
            </SafeAreaView>
        </SafeAreaProvider >
    )
}
