import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { stories, storyDataType } from '../../constants/data/storyData';
import StoryModal from './storyModal/storyModal';
import StoryAvatar from './storyAvatar/storyAvatar';


export const RADIUS_STORY_AVATAR = 40;
export const STROKE_STORY_AVATAR = 2;

export default function RenderStory() {

    const [showStory, setShowStory] = useState(false);

    const [scrollIndex, setScrollIndex] = useState(0);

    //function to render logged in user story
    const renderUserStory = () => (
        <StoryAvatar
            numberOfArch={1}
            showNumberOfArch={1}
            name={"Your Story"}
            showAddIcon={true}
            onPress={() => {

            }}
        />
    )

    //function to render stories
    const renderItems = useCallback(({ item, index }:
        { item: storyDataType, index: number }) => (
        <StoryAvatar
            image={{ uri: item.user.profileImage }}
            numberOfArch={item.content.length}
            showNumberOfArch={item.totalUnseen}
            name={item?.user.firstName}
            onPress={() => {
                setScrollIndex(index);
                setShowStory(true);
            }}
        />
    ), [stories])

    return (
        <View style={{ width: '100%', paddingVertical: 5 }}>
            {/* story avatars */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={stories}
                keyExtractor={(item => item.id)}
                // logged in user's story
                ListHeaderComponent={renderUserStory}
                //other user's stories
                renderItem={renderItems}
            />
            {/* story content modal */}
            <StoryModal
                show={showStory}
                scrollToIndex={scrollIndex}
                onClose={() => setShowStory(false)}
            />
        </View>
    );

}

