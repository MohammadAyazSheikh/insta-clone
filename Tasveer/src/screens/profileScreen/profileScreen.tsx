import React from 'react';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import ProfileHeader from './header';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa5 from 'react-native-vector-icons/FontAwesome5';
import { discoverData } from '../../constants/data/discoverData';
import { renderUserPosts } from './renderUserItems';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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

    const { styles, widthToDp: w, height, width } = useFunctionalOrientation(responsiveStyles);
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const tabBar = props => (
        <MaterialTabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'pink' }}

        />
    );


    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
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
                        <Tabs.FlatList
                            numColumns={3}
                            data={discoverData}
                            renderItem={renderUserPosts}
                            keyExtractor={(_item: any, index: any) => _item?.id + 1}
                        // estimatedItemSize={300}
                        // estimatedListSize={{ height: 120, width }}
                        />
                    </Tabs.Tab>
                    <Tabs.Tab name="VIDEOS"
                        label={(prop) => getTabIcon(prop.name, colors.secondary1)}
                    >
                        <Tabs.FlatList
                            numColumns={3}
                            data={discoverData.filter(item => item.type != "image")}
                            renderItem={renderUserPosts}
                            keyExtractor={(_item: any, index: any) => _item?.id + 1}
                        // estimatedItemSize={300}
                        // estimatedListSize={{ height: 120, width }}
                        />
                    </Tabs.Tab>
                </Tabs.Container>
            </SafeAreaView>
        </SafeAreaProvider >
    )
}
