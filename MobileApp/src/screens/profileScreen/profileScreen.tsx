import React, { useState } from 'react';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Header from '../../components/general/screenHeaders/header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import IconSimp from "react-native-vector-icons/SimpleLineIcons";
import ButtonRipple from '../../components/general/customButton/buttonRipple';
import { showDismissAlert } from '../../components/general/alerts/dismissAlert';
import { FlatList, ScrollView, Text, View } from 'react-native';
// import UserAvatar from '../../components/general/avatar/avatar';
import { commonStyles } from '../../theme/common';
import { TextBold, TextRegular } from '../../components/general/text/text';
import { formatNumber } from '../../utils/formaters/numbers';
import StoryAvatar from '../../components/story/storyAvatar/storyAvatar';
import CollapsibleTabViewHeader from "react-native-tab-view-header";
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfileHeader from './header';
import { TabBar } from 'react-native-tab-view';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa5 from 'react-native-vector-icons/FontAwesome5';
import { discoverData } from '../../constants/data/discoverData';
import {renderUserPosts} from './renderUserItems';

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

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);



    const slideData = [{
        key: 'posts',
        title: 'posts',
        Wrapper: Animated.FlatList,
        WrapperProps: {
            showsVerticalScrollIndicator: false,
            numColumns: 3,
            data: discoverData,
            renderItem: renderUserPosts,
            keyExtractor: (_item: any, index: any) => _item?.id
        }
    }, {
        key: 'videos',
        title: 'videos',
        Wrapper: Animated.FlatList,
        WrapperProps: {
            showsVerticalScrollIndicator: false,
            numColumns: 3,
            data: discoverData?.filter(item => item.type == "reel" || item.type == "video"),
            renderItem: renderUserPosts,
            keyExtractor: (_item: any, index: any) => _item?.id
        }
    }]

    const renderTabBar = props => (
        <TabBar
            activeColor={colors.secondary1}
            inactiveColor={colors.grey1}
            {...props}
            indicatorStyle={{ backgroundColor: colors.secondary1 }}
            style={{ backgroundColor: colors.primary1 }}
            renderLabel={({ route, color }) => (
                getTabIcon(route?.key, color)
            )}
        />
    );

    return (
        <CollapsibleTabViewHeader
            tabSlides={slideData}
            tabIndex={currentSlideIndex} // if you want to control the current tab index
            enableRefresh={false} // enable refresh control
            // tabBarStickyPosition={getStatusBarHeight()} // position to stop the header and tab-bar
            renderHeader={() => <ProfileHeader />}
            renderTabBar={renderTabBar}
        />
    );
}

