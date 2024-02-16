import React, { useRef } from 'react';
import { TouchableOpacity, ViewStyle } from "react-native";

type touchHold = {
    onHold?: () => void,
    onRelease?: () => void,
    onPress?: () => void,
    holdDelay?: number,
    children?: React.ReactNode,
    styles?: ViewStyle | ViewStyle[],
    activeOpacity?: number
}

export const TouchHold = ({
    onHold,
    onRelease,
    onPress,
    styles,
    activeOpacity = 1,
    holdDelay = 500,
    children
}: touchHold) => {
    const longPressed = useRef(false);
    return (
        <TouchableOpacity
            delayLongPress={holdDelay}
            activeOpacity={activeOpacity}
            style={styles}
            onLongPress={() => {
                longPressed.current = true;
                onHold && onHold();
            }}
            onPressOut={() => {
                if (!longPressed.current)
                    return;
                longPressed.current = false;
                onRelease && onRelease();
            }}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity >
    )
}