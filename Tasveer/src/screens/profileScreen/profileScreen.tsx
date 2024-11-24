import React from 'react';
import { useAppThemeColors, useFunctionalOrientation, widthToDp } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import ProfileHeader from './header';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa5 from 'react-native-vector-icons/FontAwesome5';
import { discoverData } from '../../constants/data/discoverData';
import { renderUserPosts } from './renderUserItems';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { View } from 'react-native';
const postSize = widthToDp(100) / 3
const reelSize = widthToDp(100) / 2

const getTabIcon = (name: string, color: string) => {
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
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();




    return (
        <SafeAreaProvider >
            <SafeAreaView
                style={styles.container}
            >
                <Tabs.Container
                    revealHeaderOnScroll
                    renderHeader={ProfileHeader}
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
