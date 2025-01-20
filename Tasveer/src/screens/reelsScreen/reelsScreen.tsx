import React, { useCallback, useRef, useState } from 'react';
import { widthToDp } from '../../utils/functions/responsiveUtils';
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
import { useFocusEffect } from '@react-navigation/native';
import ApiStatusIndicator from '../../components/general/apiStatusIndicator/ApiStatusIndicator';


// const { height: heightWindow } = Dimensions.get("window");

export default function Reels() {

    const { styles } = useStyles(styleSheet);
    const { screen: { height } } = UnistylesRuntime;
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const { theme } = useAppSelector(state => state.theme);
    // const dispatch = useAppDispatch();

    const refComment = useRef<BottomSheet>(null);
    const refShare = useRef<BottomSheet>(null);
    const [isFocused, setIsFocused] = useState(false);
    const tabBarHeight = useBottomTabBarHeight();
    const { top } = useSafeAreaInsets();

    const containerHeight = Platform.select({
        ios: (height - (tabBarHeight + top)),
        android: height - (tabBarHeight + StatusBar.currentHeight!),
    });


    //checking id screen focused
    useFocusEffect(
        useCallback(() => {
            setIsFocused(true);
            return () => setIsFocused(false);
        }, [])
    );

    const renderItem = useCallback(({ isVisible, item }: { isVisible: boolean, item: remoteVideosType }) => {
        return (
            <View style={{
                width: widthToDp(100), height: containerHeight,
            }}>
                <ReelCard
                    isVisible={isVisible}
                    data={item}
                    containerStyles={{ width: "100%" }}
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

    if (!isFocused)
        return <ApiStatusIndicator isLoading />;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}
            >
                {/* posts */}

                <ViewableFlatList
                    style={[styles.scroll]}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled
                    data={remoteVideos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.title}
                    uniqueKeyName={"title"}
                />
                {/*--- menu sheet ----*/}
                <CommentSheet
                    ref={refComment}
                    snapPoints={["90%"]}
                />
                {/*--- menu sheet ----*/}
                <ShareSheet
                    ref={refShare}
                    snapPoints={["60%", "90%"]}
                />
            </SafeAreaView >
        </SafeAreaProvider >
    );
}

