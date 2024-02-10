import React, { useRef } from 'react';
import {
    Modal, ActivityIndicator, TextProps,
    ActivityIndicatorProps, ViewProps, View,
    ScrollView
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { Text } from 'react-native-paper';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { StoryContent } from './storyContent';


const WORDS = ["What's", 
'up', 'mobile', 'devs?'
];
const StoryModal = ({


}) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();

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
                    onScroll={scrollHandler}
                    style={styles.scroll}
                    pagingEnabled
                    horizontal
                    scrollEventThrottle={16}
                >
                    {WORDS.map((title, index) => {
                        return (
                            <StoryContent
                                key={index.toString()}
                                title={title}
                                scrollX={translateX}
                                index={index}
                            />
                        );
                    })}
                </Animated.ScrollView>
            </View>
        </Modal >
    );
};
export default StoryModal;