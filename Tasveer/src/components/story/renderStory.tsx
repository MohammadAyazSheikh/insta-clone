import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { stories } from '../../constants/data/storyData';
import StoryModal from './storyModal/storyModal';
import StoryAvatar from './storyAvatar/storyAvatar';


export const RADIUS_STORY_AVATAR = 40;
export const STROKE_STORY_AVATAR = 2;

export default function RenderStory() {

    const [showStory, setShowStory] = useState(false);

    const [scrollIndex, setScrollIndex] = useState(0);


    return (
        <View style={{ width: '100%', paddingVertical: 5 }}>
            {/* story avatars */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={stories}
                keyExtractor={(item => item.id)}
                // logged in user's story
                ListHeaderComponent={() => (
                    <StoryAvatar
                        numberOfArch={1}
                        showNumberOfArch={1}
                        name={"Your Story"}
                        showAddIcon={true}
                        onPress={() => {

                        }}
                    />
                )}
                //other user's stories
                renderItem={({ item, index }) => (
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

