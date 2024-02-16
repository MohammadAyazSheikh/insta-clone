import React, { useRef } from 'react';
import {
    Modal,  View,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { StoryContent } from './storyContent';
import { storyData } from '../../../constants/data/storyData';



const StoryModal = ({


}) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    //scroll ref
    const scrollRef = useRef(null);

    //holds scroll animated value
    const translateX = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
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
                                index={index}
                                contentData={data}
                            />
                        );
                    })}
                </Animated.ScrollView>
            </View>
        </Modal >
    );
};
export default StoryModal;