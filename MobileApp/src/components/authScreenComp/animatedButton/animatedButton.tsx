
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated ,TouchableOpacity, } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from '../startupModal/styles/styles';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type types = {
    radius?: number,
    strokeWidth?: number,
    color?: string,
    iconSize?: number,
    dataLength: number,
    scrollX: Animated.Value,
    onPress?: () => void
}

export default function AnimatedButton({
    radius = 40,
    strokeWidth = 10,
    color = 'tomato',
    iconSize = 25,
    scrollX,
    dataLength = 0,
    onPress
}: types) {
    
    const colors = useAppThemeColors();

    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;


    const { widthToDp: w } = useFunctionalOrientation(responsiveStyles);

    const inputRange = useMemo(() => {
        return new Array(dataLength).fill(null).map((item, index) => index * w(95))
    }, []);

    const outputRange = useMemo(() => {
        return inputRange.map((item, index) => ((index / (dataLength - 1)) * circleCircumference)).reverse()

    }, [])

    const animatedVal = scrollX.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp'
    });
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={onPress ? false : true}
            onPress={onPress && onPress}
            style={{ justifyContent: 'center', alignItems: 'center', width: halfCircle * 2, height: halfCircle * 2 }}>
            <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2}  ${halfCircle * 2} `}>
                <G rotation='-90' origin={`${halfCircle},${halfCircle}`}>
                    <Circle
                        cx={'50%'}
                        cy='50%'
                        stroke={color}
                        r={radius}
                        fill='transparent'
                        strokeOpacity={0.3}
                        strokeWidth={strokeWidth}
                    />
                    <AnimatedCircle
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        r={radius}
                        fill='transparent'
                        strokeWidth={strokeWidth}
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={animatedVal}
                        strokeLinecap='round'
                    />
                </G>
            </Svg>
            <IconAnt
                name='arrowright'
                color={colors.primary1}
                size={iconSize}
                style={{ position: "absolute" }}
            />
        </TouchableOpacity  >
    )
}



