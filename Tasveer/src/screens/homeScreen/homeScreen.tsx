import React, { useCallback, useRef } from 'react';
import HomeHeader from './header';
import RenderStory from '../../components/story/renderStory';
import ContentCard from '../../components/cards/contentCard/contentCard';
import { posts } from '../../constants/data/homeData';
import MenuSheet from '../../components/sheets/menuSheet/menuSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CommentSheet from '../../components/sheets/commentSheet/commentSheet';
import ShareSheet from '../../components/sheets/shareSheet/shareSheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';
import styleSheet from './styles/styles';
import { useStyles } from 'react-native-unistyles';
import { postType } from '../../constants/data/homeData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';





export default function Home() {

    const { styles, theme: { colors } } = useStyles(styleSheet);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const { theme } = useAppSelector(state => state.theme);
    // const dispatch = useAppDispatch();

    const refOption = useRef<BottomSheet>(null);
    const refComment = useRef<BottomSheet>(null);
    const refShare = useRef<BottomSheet>(null);

    //function to render stories
    const renderStories = useCallback(() => (
        <View style={{ backgroundColor: colors.primary1 }}>
            <RenderStory />
        </View>), []
    );

    //function to render posts
    const renderItem = useCallback(({ item }: { item: postType }) => (
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
            onTitle={() => {
                navigation.navigate("UserProfile", { user: item.user })
            }}
        />
    ), [])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <HomeHeader />
                {/* posts */}
                <FlatList
                    // estimatedItemSize={height / 2}
                    //commenting this because flashList only support padding related styles and bg color
                    contentContainerStyle={[styles.scroll]}
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    stickyHeaderHiddenOnScroll
                    stickyHeaderIndices={[0]}
                    ListHeaderComponent={renderStories}
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
                {/*--- comment sheet ----*/}
                <CommentSheet
                    ref={refComment}
                    snapPoints={['90%']}
                />
                {/*--- menu sheet ----*/}
                <ShareSheet
                    ref={refShare}
                    snapPoints={["60%", "90%"]}
                />
            </SafeAreaView >
        </SafeAreaProvider>
    );
}

