import React from 'react';
import ContentItemCard from '../../components/cards/contentItemCard/contentItemCard';
import { discoverDataType } from '../../constants/data/discoverData';



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
            containerStyles={{ flex:1}}
        // onPress={() =>
        //     // navigation.navigate(item.type == "reel" ? "ExploreReel" : 'ExplorePost')
        // }
        />
    );
}




