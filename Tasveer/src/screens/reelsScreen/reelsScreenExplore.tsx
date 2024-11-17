import React, { useCallback, useRef, useState } from 'react';
import MenuSheet from '../../components/sheets/menuSheet/menuSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CommentSheet from '../../components/sheets/commentSheet/commentSheet';
import ShareSheet from '../../components/sheets/shareSheet/shareSheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ReelCard from '../../components/cards/reelCard/reelCard';
import { remoteVideos, remoteVideosType } from '../../constants/data/remoteVideo';
import Header from '../../components/general/screenHeaders/header';
import ViewableFlatList from '../../components/list/ViewableFlatlist';
import {  useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { View } from 'react-native';


export default function ReelsExplore() {

    const { styles } = useStyles(styleSheet);
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const colors = useAppThemeColors();
    // const { theme } = useAppSelector(state => state.theme);
    // const dispatch = useAppDispatch();

    const refOption = useRef<BottomSheet>(null);
    const refComment = useRef<BottomSheet>(null);
    const refShare = useRef<BottomSheet>(null);

    const [containerHeight, setContainerHeight] = useState(0);



    const renderItem = useCallback(({ isVisible, item }: { isVisible: boolean, item: remoteVideosType }) => {
        return (
            <ReelCard
                isVisible={isVisible}
                data={item}
                containerStyles={{ height: containerHeight, width: "100%", borderWidth: 0.5, borderColor: "transparent" }}
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
        )
    }, [containerHeight])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* header */}
                <Header title='Explore' />
                {/* posts */}
                <View style={{ width: "100%", flex: 1 }}
                    onLayout={(e) => {
                        setContainerHeight(e.nativeEvent.layout.height);
                    }}
                >
                    {
                        containerHeight > 0 ?
                            <ViewableFlatList
                                pagingEnabled
                                uniqueKeyName={"title"}
                                keyExtractor={(item) => item.title}
                                style={styles.scroll}
                                showsVerticalScrollIndicator={false}
                                data={remoteVideos}
                                renderItem={renderItem}
                            />
                            :
                            null
                    }
                </View>
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
        </SafeAreaProvider>
    );
}

