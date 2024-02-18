
import React, { useEffect, useRef } from 'react';
import { View, Animated, Image, ViewStyle } from "react-native";
import Svg, { G, Circle, } from "react-native-svg";
import { getBackDash, getPercentage } from './utils';
import { Gradient, gradientColorProps } from './strokeGradient';
import { lightColors } from '../../../theme/colors';

const colorFront = [
    {
        color: lightColors.blue,
        offset: '0%'
    },
    {
        color: lightColors.purple,
        offset: '30%'
    },
    {
        color: lightColors.pink,
        offset: '60%'
    },
    {
        color: lightColors.orange,
        offset: '100%'
    }
]

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type avatarProps = {
    strokeWidth?: number,
    spaceSize?: number,
    radius?: number,
    duration?: number,
    colorBackRing?: string,
    delay?: number,
    numberOfArch?: number,
    opacityBackRing?: number,
    colorsFrontRing?: gradientColorProps[],
    icon?: React.ReactNode,
    image?: { uri: string } | any
}

export default function LoadingRing({
    numberOfArch = 5,
    spaceSize = 2,
    strokeWidth = 2,
    radius = 40,
    duration = 2000,
    delay = 0,
    opacityBackRing = 0.2,
    colorBackRing = 'tomato',
    colorsFrontRing = colorFront,
    icon,
    image
}: avatarProps) {

    const circleRef = useRef<Circle>();

    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;
    const strokeDasharrayBack = getBackDash(circleCircumference, numberOfArch, spaceSize);



    const from = getPercentage(circleCircumference, 2);
    const to = getPercentage(circleCircumference, 7);
    const animatedValue = useRef(new Animated.Value(from)).current;


    const startAnimation = (duration: number) => {

        return (
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animatedValue, {
                        toValue: to,
                        duration: duration,
                        useNativeDriver: true,
                        delay
                    }),
                    Animated.timing(animatedValue, {
                        toValue: from,
                        duration: duration,
                        useNativeDriver: true,
                        delay
                    }),
                ]),
            ).start()
        )
    }

    useEffect(() => {
        animatedValue.addListener((v) => {
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDasharray: `${v.value},${v.value * 2},${v.value}`,
                })
            }
        })

        startAnimation(duration);

        return () => {
            animatedValue.removeAllListeners();
        }
    }, [])

    const iconWidth = (halfCircle * 2) - strokeWidth * 3;
    const iconStyles: ViewStyle = {
        width: iconWidth,
        height: iconWidth,
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    };
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: halfCircle * 2, height: halfCircle * 2 }}>
            {/* ------Icon/Image---------- */}
            <View style={iconStyles}>
                {
                    icon ?
                        icon
                        :
                        <Image
                            source={image || require('../../../../assets/images/placeholder.png')}
                            style={{ width: '100%', height: '100%' ,borderRadius:100}}
                        />}
            </View>
            {/* ----------------SVG--------------- */}
            <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2}  ${halfCircle * 2} `}>
                <G rotation='-90' origin={`${halfCircle},${halfCircle}`}>
                    {/* back ring */}
                    <Circle
                        cx={'50%'}
                        cy='50%'
                        stroke={colorBackRing}
                        r={radius}
                        fill='transparent'
                        strokeOpacity={opacityBackRing}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharrayBack}
                    />
                    {/* front ring */}
                    <AnimatedCircle
                        ref={circleRef}
                        cx='50%'
                        cy='50%'
                        stroke="url(#gradient)"
                        r={radius}
                        fill='transparent'
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                    />
                    <Gradient
                        colors={colorsFrontRing}
                    />
                </G>
            </Svg>

        </View >
    )
}



