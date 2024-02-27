import React, { useState } from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import Loader from '../../components/general/loader/loader';

import HomeHeader from './header';

import StoryModal from '../../components/story/storyModal/storyModal';
import RenderAvatar from '../../components/story/storyAvatar/renderAvatar';
import StoryAvatar from '../../components/story/storyAvatar/storyAvatar';
import RenderStory from '../../components/story/renderStory';
import UserAvatar from '../../components/general/avatar/avatar';
import ContentCard from '../../components/cards/contentCard/contentCard';
import { homeData } from '../../constants/data/homeData';

type loginProps = {
    username?: string,
    password?: string,
}

type loginPropsErr = {
    username?: string,
    password?: string,
}

export default function Home() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();



    return (
        <View style={styles.container}>

            {/* posts */}
            <FlatList
                contentContainerStyle={styles.scroll}
                data={homeData}
                keyExtractor={(item) => item.userId}
                renderItem={({ index, item }) => (
                    <ContentCard
                        data={item}
                    />
                )}
                ListHeaderComponent={() => (<>
                    {/* Header */}
                    <HomeHeader />
                    {/* stories */}
                    <RenderStory

                    />
                </>)}
            />
        </View>
    );
}

