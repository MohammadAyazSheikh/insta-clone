
import React from 'react';
import { View, Image, ViewStyle } from "react-native";
import Svg, { G, Circle, } from "react-native-svg";
import { getBackDash, getDash } from './utils';
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


export type avatarProps = {

    strokeWidth?: number,
    spaceSize?: number,
    radius?: number,
    duration?: number,
    colorBackRing?: string,
    numberOfArch?: number,
    showNumberOfArch?: number,
    opacityBackRing?: number,
    colorsFrontRing?: gradientColorProps[],
    icon?: React.ReactNode,
    image?: { uri: string } | any
}

export default function StoryAvatar({

    numberOfArch = 5,
    showNumberOfArch = 3,
    spaceSize = 2,
    strokeWidth = 2,
    radius = 40,
    opacityBackRing = 0.2,
    colorBackRing = 'tomato',
    colorsFrontRing = colorFront,
    icon,
    image
}: avatarProps) {


    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;

    const strokeDasharrayBack = getBackDash(circleCircumference, numberOfArch, spaceSize);
    const strokeDasharrayFront = getDash(circleCircumference, numberOfArch, spaceSize, showNumberOfArch);
    //if no we want to render zero arch (every story is viewed) 
    //assign offset equal to circumference to hide front circle stroke
    const strokeDashoffsetFront = showNumberOfArch == 0 ? circleCircumference : 0;


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
                            style={{ width: '100%', height: '100%', borderRadius: 100 }}
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
                    <Circle
                        cx='50%'
                        cy='50%'
                        stroke="url(#gradient)"
                        r={radius}
                        fill='transparent'
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                        strokeDasharray={strokeDasharrayFront}
                        strokeDashoffset={strokeDashoffsetFront}
                    />
                    <Gradient
                        colors={colorsFrontRing}
                    />
                </G>
            </Svg>
        </View >
    )
}



