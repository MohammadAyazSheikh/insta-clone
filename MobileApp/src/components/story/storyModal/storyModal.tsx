import React, { useEffect, useRef, useState } from 'react';
import {
    Modal, View
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { StoryContent } from './storyContent';
import { storyData, storyDataType } from '../../../constants/data/storyData';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type storyModalProps = {
    show: boolean,
    onClose?: () => void,
    scrollToIndex?: number,
}

const StoryModal = ({
    show,
    onClose,
    scrollToIndex = 0,
}: storyModalProps) => {

    const { styles, width } = useFunctionalOrientation(responsiveStyles);

    const [data, setData] = useState<storyDataType[]>(storyData);

    //this ref is for making sure that story does'nt scrolls 
    //to next user's story when modal is closed 
    const isModalOpen = useRef(false);

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
        scrollRef?.current?.scrollTo({
            y: 0,
            x: (index) * width,
            animated: false,
        })
    }


    //setting value when modal close or open
    useEffect(() => {
        isModalOpen.current = show;
    }, [show]);

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
            <SafeAreaProvider>
                <SafeAreaView
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
                        {
                            data.map((item, index) => {
                                return (
                                    <StoryContent
                                        isModalOpen={isModalOpen}
                                        key={index.toString()}
                                        scrollX={translateX}
                                        scrollRef={scrollRef}
                                        scrollIndex={index}
                                        contentData={item}
                                        numberOfUsers={storyData.length}
                                        onClose={onClose}
                                        onNextStory={(barIndex, userStoryIdex) => {
                                            const userStroy = data[userStoryIdex];
                                            if (userStroy.totalUnseen >= 1) {
                                                userStroy.totalUnseen -= 1;
                                                const updatedData = [...data];
                                                updatedData[userStoryIdex] = userStroy;
                                                setData(updatedData);
                                            }
                                        }}
                                    />
                                );
                            })}
                    </Animated.ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal >
    );
};
export default StoryModal;