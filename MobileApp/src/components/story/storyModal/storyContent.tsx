import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet, Image, ScrollView } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    SharedValue,
    useSharedValue,
} from 'react-native-reanimated';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { TextBold } from '../../general/text/text';
import colors from '../../../theme/colors';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { usePlayStory } from '../progressBar/playStoryHooks';
import { RenderStoryBars } from '../progressBar/progressBar';
import ContentHeader from '../../cards/contentHeader/contentHeader';
const { height, width } = Dimensions.get('window');

const data = [1, 2, 3, 4];


interface PageProps {
    index: number;
    scrollX: SharedValue<number>;
    scrollRef: React.MutableRefObject<ScrollView>;
    title: string;
}

const StoryContent: React.FC<PageProps> = ({ index, scrollX, scrollRef, title }) => {


    const { styles } = useFunctionalOrientation(responsiveStyles);

    const animValuesBar = data.map(item => useSharedValue(0));

    const { playNext, playPrev, pauseStory, playStory, currentBarIndex } =
        usePlayStory(index, scrollX, scrollRef, animValuesBar);





    //input range for scroll animation
    const inputRange = [
        (index - 1) * width,    //prev page
        index * width,          //current page
        (index + 1) * width     //next page
    ];

    // styles for story container when user scrolls
    const containerStyle = useAnimatedStyle(() => {
        const rotateY = interpolate(
            scrollX.value,
            inputRange,
            [45, 0, -45],
            Extrapolation.CLAMP
        );

        // const rotateZ = interpolate(
        //     scrollX.value,
        //     inputRange,
        //     [10, 0, -10],
        //     Extrapolation.CLAMP
        // );
        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.8, 1, 0.8],
            Extrapolation.CLAMP
        );


        return {
            transform: [
                { rotateY: `${rotateY}deg` },
                // { rotateZ: `${rotateZ}deg` },
                { scale }
            ],
        };
    });




    return (
        <Animated.View
            style={[
                styles.container,
                containerStyle
            ]}
        >
            <View style={styles.col}>
                {/* progress bars */}
                <RenderStoryBars animatedValuesBar={animValuesBar} />
                {/* header */}
                <ContentHeader />
            </View>
            {/* content */}
            <View style={styles.contentContainer}>
                <Image
                    style={styles.imgContent}
                    source={require('../.././../../assets/images/people/students.jpg')}
                />
            </View>

        </Animated.View>
    );
};


export { StoryContent };