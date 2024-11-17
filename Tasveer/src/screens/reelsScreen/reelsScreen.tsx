import React, { useCallback, useRef } from 'react';
import { widthToDp } from '../../utils/functions/responsiveUtils';
import MenuSheet from '../../components/sheets/menuSheet/menuSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CommentSheet from '../../components/sheets/commentSheet/commentSheet';
import ShareSheet from '../../components/sheets/shareSheet/shareSheet';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ReelCard from '../../components/cards/reelCard/reelCard';
import { remoteVideos, remoteVideosType } from '../../constants/data/remoteVideo';
import { Platform, StatusBar, View } from 'react-native';
import ViewableFlatList from '../../components/list/ViewableFlatlist';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';


const { height: heightWindow } = Dimensions.get("window");

export default function Reels() {

    const { styles } = useStyles(styleSheet);
    const { screen: { height } } = UnistylesRuntime;
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const colors = useAppThemeColors();
    // const { theme } = useAppSelector(state => state.theme);
    // const dispatch = useAppDispatch();

    const refOption = useRef<BottomSheet>(null);
    const refComment = useRef<BottomSheet>(null);
    const refShare = useRef<BottomSheet>(null);
    const tabBarHeight = useBottomTabBarHeight();
    const { top } = useSafeAreaInsets();

    const containerHeight = Platform.select({
        ios: (height - (tabBarHeight + top)),
        android: heightWindow - (tabBarHeight + StatusBar.currentHeight! || 0),
    });



    const renderItem = useCallback(({ isVisible, item }: { isVisible: boolean, item: remoteVideosType }) => {
        return (
            <View style={{
                width: widthToDp(100), height: containerHeight,
            }}>
                <ReelCard
                    isVisible={isVisible}
                    data={item}
                    containerStyles={{ width: "100%" }}
                    onMenu={() => {
                        refOption.current?.collapse()
                    }}
                    onComment={() => {
                        refComment.current?.expand();
                    }}
                    onShare={() => {
                        refShare?.current?.collapse();
                    }}
                />
            </View>
        )
    }, [containerHeight]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}
            >
                {/* posts */}
                {
                    <ViewableFlatList
                        style={[styles.scroll]}
                        showsVerticalScrollIndicator={false}
                        pagingEnabled
                        data={remoteVideos}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.title}
                        uniqueKeyName={"title"}
                    />
                }
                {/*--- menu sheet ----*/}
                <MenuSheet
                    ref={refOption}
                    snapPoints={['35%', '35%', '40%']}
                    onFollow={() => {
                        refOption.current?.close();
                    }}
                    onReport={() => {
                        refOption.current?.close();
                    }}
                    onHide={() => {
                        refOption.current?.close();
                    }}
                    onStar={() => {
                        refOption.current?.close();
                    }}
                />
                {/*--- menu sheet ----*/}
                <CommentSheet
                    ref={refComment}
                    snapPoints={["100%"]}
                />
                {/*--- menu sheet ----*/}
                <ShareSheet
                    ref={refShare}
                    snapPoints={["60%", "100%"]}
                />
            </SafeAreaView >
        </SafeAreaProvider >
    );
}

