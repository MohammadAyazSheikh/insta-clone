import React, { useCallback, useRef, useState } from 'react';
import { heightToDp, useFunctionalOrientation, widthToDp } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { FlatList } from 'react-native-gesture-handler';
import MenuSheet from '../../components/sheets/menuSheet/menuSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CommentSheet from '../../components/sheets/commentSheet/commentSheet';
import ShareSheet from '../../components/sheets/shareSheet/shareSheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import ReelCard from '../../components/cards/reelCard/reelCard';
import { remoteVideos, remoteVideosType } from '../../constants/data/remoteVideo';
import {
    ViewPortDetectorProvider,
} from "react-native-viewport-detector";
import { View } from 'react-native';
import ViewableFlatList from '../../components/list/ViewableFlatlist';
import { TextRegular } from '../../components/general/text/text';


export default function Reels() {

    const { styles, height } = useFunctionalOrientation(responsiveStyles);
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const colors = useAppThemeColors();
    // const { theme } = useAppSelector(state => state.theme);
    // const dispatch = useAppDispatch();

    const refOption = useRef<BottomSheet>(null);
    const refComment = useRef<BottomSheet>(null);
    const refShare = useRef<BottomSheet>(null);
    const [containerHeight, setContainerHeight] = useState(0);

    const renderItem = useCallback(({ isVisible, item }: { isVisible: boolean, item: remoteVideosType }) => {
        return  (
            <View style={{ width: widthToDp(100), height: containerHeight, borderWidth: 0.5, borderColor: "transparent" }}>
                <ReelCard
                    isVisible={isVisible}
                    data={item}
                    containerStyles={{ height: containerHeight, width: "100%" }}
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
    }, [containerHeight])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}
            >
                {/* posts */}
                {
                    <ViewableFlatList
                        onLayout={(e) => {
                            setContainerHeight(e.nativeEvent.layout.height)
                        }}
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

