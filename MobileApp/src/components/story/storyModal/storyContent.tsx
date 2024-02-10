import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet, Text, ScrollView } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    SharedValue,
    useSharedValue,
    cancelAnimation,
    useDerivedValue,
    runOnJS
} from 'react-native-reanimated';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { TextBold } from '../../general/text/text';
import colors from '../../../theme/colors';
import ProgressBar, { animateBar, pauseBar, resetAnimation } from './progressBar';
import ButtonRipple from '../../general/customButton/buttonRipple';
const { height, width } = Dimensions.get('window');

const data = [1, 2, 3, 4];


interface PageProps {
    index: number;
    scrollX: SharedValue<number>;
    title: string;

}

const StoryContent: React.FC<PageProps> = ({ index, scrollX, title }) => {


    const { styles } = useFunctionalOrientation(responsiveStyles);

    //animated values for progress bars
    const animValues = data.map(item => useSharedValue(0));

    //holds index of bars
    const currentBarIndex = useRef(0);
    //flag for paused auto play
    const paused = useRef(false);

    const playStory = (index?: number) => {
        const i = index || currentBarIndex.current;
        animateBar(
            {
                toValue: 100,
                animatedValue: animValues[i]
            },
            () => {
                //if paused true return and don't play next bar
                if (paused.current) {
                    paused.current = false;
                    return;
                }
                //else play next story and inc index
                if (currentBarIndex.current < animValues.length - 1) {
                    playStory(currentBarIndex.current + 1);
                    currentBarIndex.current += 1;
                }
            }
        );
    }

    const playNext = () => {
        //if current is not the last bar
        if (currentBarIndex.current < animValues.length - 1) {
            //paused the auto play
            paused.current = true;
            //set current bar to 100 %
            animValues[currentBarIndex.current].value = 100;
            currentBarIndex.current += 1;
            //again auto play from next index
            playStory(currentBarIndex.current);
        }
    }

    const playPrev = () => {
        //if current is not the 1st bar
        if (currentBarIndex.current > 0) {
            //paused the auto play
            paused.current = true;
            //set current and prev bar to zero %
            resetAnimation(animValues[currentBarIndex.current]);
            resetAnimation(animValues[currentBarIndex.current - 1]);
            currentBarIndex.current -= 1;
            //again auto play from prev index
            playStory(currentBarIndex.current);
        }
    }
    const pauseStory = () => {
        paused.current = true;
        pauseBar(animValues[currentBarIndex.current]);
    }

    useEffect(() => {
        playStory();
    }, [])


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
            {/* progress bars */}

            <View style={styles.row}>
                {
                    animValues.map((val, index) => (
                        <ProgressBar
                            key={index}
                            animatedValue={val}
                        />
                    ))
                }
            </View>


            <TextBold style={{ color: colors.ternary1, fontSize: 24 }}>
                {title + " " + index}
            </TextBold>
            <View style={[styles.row]}>
                <ButtonRipple
                    style={{ padding: 30 }}
                    onPress={() => {
                        playPrev()
                    }}
                >
                    <TextBold>
                        Prev
                    </TextBold>
                </ButtonRipple>
                <ButtonRipple
                    style={{ padding: 30 }}
                    onTouchStart={() => {
                        pauseStory()
                    }}
                    onTouchEnd={() => {
                        playStory()
                    }}

                >
                    <TextBold>
                        pause
                    </TextBold>
                </ButtonRipple>
                <ButtonRipple
                    style={{ padding: 30 }}
                    onPress={() => {
                        playNext()
                    }}
                >
                    <TextBold>
                        Next
                    </TextBold>
                </ButtonRipple>
            </View>
        </Animated.View>
    );
};


export { StoryContent };