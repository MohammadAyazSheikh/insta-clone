
import React from 'react';
import { Defs, LinearGradient, Stop } from "react-native-svg";


export type gradientColorProps = {
    color: string,
    offset: string,
}

type gradientProps = {
    colors: gradientColorProps[],
}


export const Gradient = ({ colors = [
    {
        color: 'rgb(134, 65, 244)',
        offset: '0%'
    },
    {
        color: 'rgb(66, 194, 244)',
        offset: '100%'
    }
] }: gradientProps) => (
    <Defs key={'gradient'}>
        <LinearGradient
            id={'gradient'}
            x1={'0%'}
            y1={'0%'}
            x2={'0%'}
            y2={'100%'}>
            {
                colors.map((color, index) => {
                    return (
                        <Stop
                            key={index + color.color}
                            offset={color.offset}
                            stopColor={color.color}
                        />
                    )
                })
            }
        </LinearGradient>
    </Defs>
);
