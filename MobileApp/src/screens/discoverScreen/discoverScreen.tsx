import React, { useState } from 'react';
import { View, ScrollView, Image, Alert, Text, Dimensions } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation, widthToDp } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import CustomButton from '../../components/general/customButton/customButton';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import Loader from '../../components/general/loader/loader';
import TextBox from '../../components/general/textBox/textBox';
import IconFe from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextBold, TextRegular } from '../../components/general/text/text';
import { showDismissAlert } from '../../components/general/alerts/dismissAlert';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/general/searchbars/searchbar';
import ContentItemCard from '../../components/cards/contentItemCard/contentItemCard';
import { MasonryFlashList } from '@shopify/flash-list';
import { discoverData } from '../../constants/data/discoverData';


export default function Discover() {

    const { styles, width, height } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);

    const dispatch = useAppDispatch();



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* added this view because of flashList */}
                <View style={{ width, height }}>
                    {/* search bar */}
                    <SearchBar />
                    {/* list */}
                    <MasonryFlashList
                        contentContainerStyle={styles.scroll}
                        data={discoverData}
                        numColumns={3}
                        estimatedItemSize={20}
                        renderItem={({ item }) =>
                            <ContentItemCard data={item} />
                        }

                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

