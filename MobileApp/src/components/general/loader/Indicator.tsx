import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { 
    Easing, withSpring, useSharedValue, useAnimatedStyle, withRepeat, withTiming 
} from 'react-native-reanimated';
import colors from '../../../theme/colors';
export default function Indicator() {

    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    const startRotation = () => {
        rotation.value = withRepeat(withTiming(360, { duration: 500 }), -1, false)
    };

    useEffect(() => {
        // startRotation();
    }, []);

    return (
        <Animated.View
            style={[ animatedStyle]}
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
                style={[styles.ring]}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    ring: {
        width: 200,
        backgroundColor:'transparent',
        aspectRatio: 1,
        borderRadius: 200,
    },
})