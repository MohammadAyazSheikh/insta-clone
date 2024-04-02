import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { storyData } from '../../constants/data/storyData';
import RenderAvatar
// , { RenderYourStory }
 from './storyAvatar/renderAvatar';
import StoryModal from './storyModal/storyModal';


export const RADIUS_STORY_AVATAR = 40;
export const STROKE_STORY_AVATAR = 2;

export default function RenderStory() {

    const [showStory, setShowStory] = useState(false);

    const [scrollIndex, setScrollIndex] = useState(0);


    return (
        <View style={{ width: '100%', paddingVertical: 5 }}>
            {/* story avatars */}
            <FlatList
                horizontal
                data={storyData}
                keyExtractor={(item => item.userId)}
                // your story
                // ListHeaderComponent={() => (
                //     <RenderYourStory />
                // )}
                //other user's stories
                renderItem={({ item, index }) => (
                    <RenderAvatar
                        image={item.image}
                        numberOfArch={item.content.length}
                        showNumberOfArch={item.totalUnseen}
                        title={item?.userName}
                        strokeWidth={STROKE_STORY_AVATAR}
                        radius={RADIUS_STORY_AVATAR}
                        onPress={() => {
                            setScrollIndex(index);
                            setShowStory(true);
                        }}
                    />
                )}
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

