import React, { useEffect } from 'react';
import { TouchableRipple, } from 'react-native-paper';
import { useAppSelector } from '../../../redux/hooks';
import { useAppThemeColors, useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { Image, ViewStyle, View, StyleSheet, ImageStyle, TextStyle } from 'react-native';
import { TextRegular } from '../text/text';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

type avatarProps = {
    name?: string
    image?: { uri: string } | any,
    containerStyle?: ViewStyle,
    imageStyle?: ImageStyle
    nameTextStyle?: TextStyle,
    onPress?: () => void,
    size?: number,
    isLoading?: boolean,
    showRing?: boolean,

};

const colorsList = ['#C861FA', '#FE2E74', '#F96633', '#7f66ff', '#EDC113', '#009DE0'];
export default function UserAvatar({
    image,
    name = 'User',
    containerStyle,
    imageStyle,
    nameTextStyle,
    size = 60,
    isLoading = false,
    showRing = false,
    onPress
}: avatarProps) {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const { theme } = useAppSelector(state => state.theme);
    const colors = useAppThemeColors();
    const isDark = theme == "dark";


    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    const startRotation = () => {
        rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false,
            () => {
                rotation.value = 0;
            })
    };

    const avatarSize = size ? {
        width: size,
        height: size,
    } : {};


    useEffect(() => {
        isLoading ?
            startRotation()
            :
            rotation.value = 0
    }, [isLoading])
    return (

        <View
            style={[styles.avatarView, avatarSize, containerStyle]}
        >
            {/* rotation ring */}
            {
                showRing ?
                    <Animated.View
                        style={[styles.avatarView, avatarSize, containerStyle
                            , { ...StyleSheet.absoluteFillObject }, animatedStyle]}
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
                            style={[styles.avatarView, avatarSize]}
                        />
                    </Animated.View>
                    :
                    null
            }

            {/* image view and button */}
            <TouchableRipple
                rippleColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(000,000,000,0.2)'}
                borderless
                onPress={onPress}
                style={[
                    styles.avatarImgView,
                    !image && {
                        backgroundColor: colorsList[name.charCodeAt(0) % colorsList.length]
                    },
                ]}
            >
                {
                    image ?
                        <Image
                            source={image}
                            style={[styles.imgStyles, imageStyle]}
                        />
                        :
                        <TextRegular style={[{ color: "white", fontSize: size / 2 },
                            nameTextStyle]}
                            adjustsFontSizeToFit
                        >
                            {name[0].toUpperCase()}
                        </TextRegular>
                }

            </TouchableRipple>
        </View>
    );
}

