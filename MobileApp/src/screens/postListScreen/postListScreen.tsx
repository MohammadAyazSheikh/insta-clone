import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useFunctionalOrientation, widthToDp } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Card, Text } from 'react-native-paper';
import { getPosts } from '../../redux/features/postSlice/postSlice';
import Loader from '../../components/general/loader/loader';
import colors from '../../theme/colors';
import { AnimatedFAB } from 'react-native-paper';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import { useNavigation } from '@react-navigation/core'
import { fontFamily } from '../../theme/fonts';

const PostCard = ({ title, body }: { title: string, body: string }) =>
(
    <Card style={{ width: widthToDp(95), marginVertical: 10, }}>
        <Card.Content>
            <Text variant="titleMedium" style={{
                color: colors.primary1, fontFamily: fontFamily.bold
            }}>{title}</Text>
            <Text variant="bodyMedium" style={{ fontFamily: fontFamily.medium }}>{body}</Text>
        </Card.Content>
    </Card>
)

export default function PostList() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const dispatch = useAppDispatch();
    const { isLoadingGet, posts } = useAppSelector(state => state.posts);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

    //for floating button
    const [isExtended, setIsExtended] = React.useState(true);
    const onScroll = ({ nativeEvent }: any) => {
        const currentScrollPosition =
            Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
        setIsExtended(currentScrollPosition <= 0);
    };


    useEffect(() => {
        dispatch(getPosts())
    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.scroll}
                onScroll={onScroll}
                data={posts}
                keyExtractor={(item) => item.id?.toString()!}
                renderItem={({ item }) => (
                    <PostCard
                        title={item.title!}
                        body={item.body!}
                    />
                )}
            />
            {/* floating button */}
            <AnimatedFAB
                icon={'plus'}
                label={'Add'}
                extended={isExtended}
                onPress={() => navigation.navigate("AddPost")}
                // visible={isExtended}
                animateFrom={'right'}
                style={[styles.fab]}
            />
            {/* loader */}
            <Loader
                showLoader={isLoadingGet}
            />
        </View>
    );
}

