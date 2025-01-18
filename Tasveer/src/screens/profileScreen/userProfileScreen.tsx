import React from 'react';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import ProfileHeader from './header';
import { discoverData } from '../../constants/data/discoverData';
import { renderUserPosts } from './renderUserItems';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { View } from 'react-native';
import Header from '../../components/general/screenHeaders/header';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getTabIcon, postSize, reelSize } from './profileScreen';




export default function UserProfile() {

    const { styles, theme: { colors } } = useStyles(styleSheet);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { params } = useRoute<RouteProp<RootStackProps, 'UserProfile'>>();
    const user = params?.user || {};


    return (
        <SafeAreaProvider >
            <SafeAreaView
                style={styles.container}
            >
                {/* header */}
                <Header
                    title={`${user?.firstName} ${user?.lastName}`}
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
