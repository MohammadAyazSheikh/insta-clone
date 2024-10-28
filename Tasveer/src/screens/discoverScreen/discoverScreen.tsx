import React from 'react';
import { View, } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/general/searchbars/searchbar';
import ContentItemCard from '../../components/cards/contentItemCard/contentItemCard';
import { MasonryFlashList } from '@shopify/flash-list';
import { discoverData } from '../../constants/data/discoverData';


export default function Discover() {

    const { styles, width, height } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();




    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* added this view because of flashList */}
                <View style={{ width, height }}>
                    {/* search bar */}
                    <SearchBar containerStyles={{ width: '95%', alignSelf: 'center' }} />
                    {/* list */}
                    <MasonryFlashList
                        contentContainerStyle={styles.scroll}
                        data={discoverData}
                        numColumns={3}
                        estimatedItemSize={50}
                        renderItem={({ item }) =>
                            <ContentItemCard
                                data={item}
                                pauseAll
                                onPress={() =>
                                    navigation.navigate(item.type == "reel" ? "ExploreReel" : 'ExplorePost')
                                }
                            />
                        }
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

