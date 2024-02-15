import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { RootStackProps } from '../../../routes/rootStack/rootNavigation';
import { useAppThemeColors, useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ButtonRipple from '../../general/customButton/buttonRipple';

type storyProps = {
    size?: number,
    image?: any,
    onPress?: () => void,
}

export default function StoryAvatar({ size, image }: storyProps) {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
   

    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    const startRotation = () => {
        rotation.value = withRepeat(withTiming(360, { duration: 1000 }), 5, false,
            () => {
                rotation.value = 0;
            })
    };

    const storySize = size ? {
        width: size,
        height: size,
    } : {};

    return (

        <View
            style={[styles.storyView, storySize]}
        >
            {/* rotation ring */}
            <Animated.View
                style={[styles.storyView, storySize, { ...StyleSheet.absoluteFillObject }, animatedStyle]}
            >
                <LinearGradient
                    colors={[
                        colors.blue,
                        colors.purple,
                        colors.pink,
                        colors.orange,
                        // colors.yellow
                    ]}
                    start={{ x: 1, y: 0 }}
                    // locations={[0, 0.2, 0.7, 0.9, 1]}
                    style={[styles.storyView, storySize]}
                />
            </Animated.View>
            {/* image view and button */}
            <ButtonRipple style={styles.storyImageView}
                onPress={() => {
                    startRotation()
                }}
            >
                {
                    image ?
                        <Image
                            source={image}
                            style={styles.imgStory}
                        />
                        :
                        <Image
                            source={require('../../../.././assets/images/user.png')}
                            style={styles.imgStory}
                        />
                }
            </ButtonRipple>
        </View>
    );
}

