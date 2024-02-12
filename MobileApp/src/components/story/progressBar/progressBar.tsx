import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle, SharedValue, withTiming,
    runOnJS,
    cancelAnimation
} from 'react-native-reanimated';
import colors from '../../../theme/colors';
import { widthToDp } from '../../../utils/functions/responsiveUtils';

type progressBarProps = {
    animatedValue: SharedValue<number>
}

export const pauseBar = (animatedValue: SharedValue<number>) => {
    animatedValue.value = animatedValue.value;
}

export const resetAnimation = (animatedValue: SharedValue<number>) => {
    cancelAnimation(animatedValue)
    animatedValue.value = 0;
}

type animateBarOptionType = {
    toValue: number,
    animatedValue: SharedValue<number>,
    duration?: number,
}
export const animateBar = (options: animateBarOptionType, callBack?: () => void) => {
    const {
        toValue,
        animatedValue,
        duration = 5000,
    } = options;

    animatedValue.value = withTiming(toValue, { duration }, () => {
        callBack && runOnJS(callBack)()
    });
};

export default function ProgressBar({ animatedValue }: progressBarProps) {


    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${animatedValue.value}%`,
        };
    });

    return (
        <View style={[styles.container,]}>
            <Animated.View
                style={[styles.strip, animatedStyle]}
            />
        </View>
    );
}

type renderStoryBarsProps = {
    animatedValuesBar: SharedValue<number>[],
}

export const RenderStoryBars = ({
    animatedValuesBar,
}: renderStoryBarsProps) => {

    return (
        <View style={styles.row}>
            {animatedValuesBar.map((value, index) => (
                <ProgressBar
                    key={index}
                    animatedValue={value}
                />
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 10,
        marginHorizontal: 3,
        backgroundColor: colors.grey1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    strip: {
        width: '30%',
        height: '100%',
        backgroundColor: colors.ternary1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthToDp(100),
    }
})