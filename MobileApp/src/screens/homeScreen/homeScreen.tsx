import React, { useRef } from 'react';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch } from '../../redux/hooks';
import { FlatList } from 'react-native-gesture-handler';
import HomeHeader from './header';
import RenderStory from '../../components/story/renderStory';
import ContentCard from '../../components/cards/contentCard/contentCard';
import { homeData } from '../../constants/data/homeData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MenuSheet from '../../components/sheets/menuSheet/menuSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CommentSheet from '../../components/sheets/commentSheet/commentSheet';



export default function Home() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const colors = useAppThemeColors();
    // const { theme } = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    const refOption = useRef<BottomSheet>(null);
    const refComment = useRef<BottomSheet>(null);

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* posts */}
            <FlatList
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
                    />
                )}
                ListHeaderComponent={() => (<>
                    {/* Header */}
                    <HomeHeader />
                    {/* stories */}
                    <RenderStory />
                </>)}
            />
            {/*--- menu sheet ----*/}
            <MenuSheet
                ref={refOption}
                snapPoints={['35%','35%','40%']}
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
        </GestureHandlerRootView>
    );
}

