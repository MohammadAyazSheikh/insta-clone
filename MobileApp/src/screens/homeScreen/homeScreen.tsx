import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import Loader from '../../components/general/loader/loader';

import HomeHeader from './header';
import StoryAvatar from '../../components/story/storyAvatar/storyAvatar';

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
    const [data, setData] = useState<loginProps>({});
    const [err, setErr] = useState<loginPropsErr>({});
    const [hidePass, setHidePass] = useState(true);
    const dispatch = useAppDispatch();



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <HomeHeader />
                <StoryAvatar />
            </ScrollView>
        </View>
    );
}

