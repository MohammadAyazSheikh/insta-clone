import React, { useRef, useState } from 'react';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { FlatList } from 'react-native-gesture-handler';
import MenuSheet from '../../components/sheets/menuSheet/menuSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CommentSheet from '../../components/sheets/commentSheet/commentSheet';
import ShareSheet from '../../components/sheets/shareSheet/shareSheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import ReelCard from '../../components/cards/reelCard/reelCard';
import { remoteVideos } from '../../constants/data/remoteVideo';
import Header from '../../components/general/screenHeaders/header';



export default function ReelsExplore() {

    const { styles, } = useFunctionalOrientation(responsiveStyles);
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const colors = useAppThemeColors();
    // const { theme } = useAppSelector(state => state.theme);
    // const dispatch = useAppDispatch();

    const refOption = useRef<BottomSheet>(null);
    const refComment = useRef<BottomSheet>(null);
    const refShare = useRef<BottomSheet>(null);
    const [containerHeight, setContainerHeight] = useState(0);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* header */}
                <Header title='Explore' />
                {/* posts */}
                <FlatList
                    onLayout={(e) => {
                        setContainerHeight(e.nativeEvent.layout.height)
                    }}
                    // estimatedItemSize={height / 2}
                    //commenting this because flashList only support padding related styles and bg color
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled
                    data={remoteVideos}
                    keyExtractor={(item) => item.title}
                    renderItem={({ index, item }) => (
                        <ReelCard
                            data={item}
                            containerStyles={{ height: containerHeight }}
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
                    )}
                />
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

