import React, { useEffect, useRef, useState } from 'react';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { StoryContent } from './storyContent';
import { stories, storyDataType } from '../../../constants/data/storyData';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import ModalWrapper from '../../modals/modalWrapper';


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

    const { styles } = useStyles(styleSheet);
    const { screen: { width } } = UnistylesRuntime;

    const [data, setData] = useState<storyDataType[]>(stories);

    //this ref is for making sure that story does'nt scrolls 
    //to next user's story when modal is closed 
    const isModalOpen = useRef(false);

    //scroll ref
    const scrollRef = useRef<Animated.ScrollView>(null);

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
        <ModalWrapper
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={onClose}
            onShow={() => {
                scrollToUserStory(scrollToIndex);
            }}
        >
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
                                        numberOfUsers={stories.length}
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
        </ModalWrapper >
    );
};
export default StoryModal;