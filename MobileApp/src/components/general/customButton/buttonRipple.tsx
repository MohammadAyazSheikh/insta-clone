import React from 'react';
import { TouchableRipple, TouchableRippleProps } from 'react-native-paper';
import { useAppSelector } from '../../../redux/hooks';

type rippleProp = {
    children: React.ReactNode
} & TouchableRippleProps;


export default function ButtonRipple({ children, ...rest }: rippleProp) {

    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";

    return (
        <TouchableRipple
            rippleColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(000,000,000,0.2)'}
            borderless
            {...rest}
        >
            <>
                {children}
            </>
        </TouchableRipple>
    );
}

