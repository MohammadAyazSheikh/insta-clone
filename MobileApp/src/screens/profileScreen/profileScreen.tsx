import React, { useState } from 'react';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CollapsibleTabViewHeader from "react-native-tab-view-header";
import Animated from 'react-native-reanimated';
import { Tab, Tabs } from 'react-native-collapsible-tab-view'
import ProfileHeader from './header';
// import { TabBar } from 'react-native-tab-view';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa5 from 'react-native-vector-icons/FontAwesome5';
import { discoverData } from '../../constants/data/discoverData';
import { renderUserPosts } from './renderUserItems';
import { SafeAreaInsetsContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const getTabIcon = (name: string, color: string) => {
    return ({
        videos: <IconMtc
            name={"movie-play"}
            color={color}
            size={25}
        />,
        posts: <IconMtc
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



    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
                <Tabs.Container
                    revealHeaderOnScroll
                    renderHeader={ProfileHeader}
                    headerHeight={200} // optional
                >
                    <Tabs.Tab name="POST">
                        <Tabs.FlashList
                            numColumns={3}
                            data={discoverData}
                            renderItem={renderUserPosts}
                            keyExtractor={(_item: any, index: any) => _item?.id + 1}
                            estimatedItemSize={300}
                        />
                    </Tabs.Tab>
                    <Tabs.Tab name="VIDEOS">
                        <Tabs.FlashList
                            numColumns={3}
                            data={discoverData.filter(item => item.type)}
                            renderItem={renderUserPosts}
                            keyExtractor={(_item: any, index: any) => _item?.id + 1}
                            estimatedItemSize={300}
                        />
                    </Tabs.Tab>
                </Tabs.Container>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
