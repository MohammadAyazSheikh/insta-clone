import React, { useRef } from 'react';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch } from '../../redux/hooks';
import Header from '../../components/general/screenHeaders/header';
import ContentCard from '../../components/cards/contentCard/contentCard';
import { homeData } from '../../constants/data/homeData';
import { FlatList } from 'react-native-gesture-handler';
import MenuSheet from '../../components/sheets/menuSheet/menuSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CommentSheet from '../../components/sheets/commentSheet/commentSheet';
import ShareSheet from '../../components/sheets/shareSheet/shareSheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';




export default function Explore() {

    const { styles,height } = useFunctionalOrientation(responsiveStyles);
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const colors = useAppThemeColors();
    // const { theme } = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    const refOption = useRef<BottomSheet>(null);
    const refComment = useRef<BottomSheet>(null);
    const refShare = useRef<BottomSheet>(null);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* header */}
                <Header
                    title='Explore'
                />
                {/* posts */}
                <FlashList
                    estimatedItemSize={height / 1.5}
                    //commenting this because flashList only support padding related styles and bg color
                    contentContainerStyle={styles.scroll}
                    data={homeData}
                    keyExtractor={(item) => item.userId}
                    renderItem={({ index, item }) => (
                        <ContentCard
                            data={item}
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

