import React from 'react';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { useNavigation } from '@react-navigation/core'
// import type { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import ContentItemCard from '../../components/cards/contentItemCard/contentItemCard';
import { discoverDataType } from '../../constants/data/discoverData';
import { widthToDp } from '../../utils/functions/responsiveUtils';



type userPostProp = {

    item: discoverDataType,
    index: number,

}
export function renderUserPosts({ item, index }: userPostProp) {

    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

    return (
        <ContentItemCard
            data={item}
            pauseAll
            isAllSquare
            containerStyles={{ width: widthToDp(33.33) }}
        // onPress={() =>
        //     // navigation.navigate(item.type == "reel" ? "ExploreReel" : 'ExplorePost')
        // }
        />
    );
}




