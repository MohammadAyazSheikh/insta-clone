import React, { useRef } from 'react';
import {
    Modal, View,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { StoryContent } from './storyContent';
import { storyData } from '../../../constants/data/storyData';

type storyModalProps = {
    show: boolean,
    onClose?: () => void,
    scrollToIndex?: number
}

const StoryModal = ({
    show,
    onClose,
    scrollToIndex = 0,
}: storyModalProps) => {

    const { styles, width } = useFunctionalOrientation(responsiveStyles);

    //scroll ref
    const scrollRef = useRef(null);

    //holds scroll animated value
    const translateX = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });


    //scrollTo specified  index
    const scrollToUserStory = (index: number) => {
        translateX.value = width * index;
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={onClose}
            onShow={() => {
                scrollToUserStory(scrollToIndex);
            }}
        >
            <View
                style={styles.backDrop}
            />
            <View
                style={styles.centeredView}
            >
                <Animated.ScrollView
                    ref={scrollRef}
                    onScroll={scrollHandler}
                    style={styles.scroll}
                    pagingEnabled
                    horizontal
                    scrollEventThrottle={16}
                >
                    {storyData.map((data, index) => {
                        return (
                            <StoryContent
                                key={index.toString()}
                                scrollX={translateX}
                                scrollRef={scrollRef}
                                scrollIndex={index}
                                contentData={data}
                                onClose={onClose}
                                numberOfUsers={storyData.length}
                            />
                        );
                    })}
                </Animated.ScrollView>
            </View>
        </Modal >
    );
};
export default StoryModal;