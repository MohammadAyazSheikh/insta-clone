import { useState, useEffect } from "react";
import { Keyboard, Platform } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
const isAndroid = Platform.OS == "android";
export const useKeyboardVisibility = () => {
    const [visible, setVisible] = useState(false);
    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue<number>(0);
    const style = useAnimatedStyle(() => (
        {
            paddingBottom: withTiming(animatedHeight.value-20)
        }
    ), [animatedHeight])

    useEffect(() => {
        let showSubscription = null;
        let hideSubscription = null;
        if (isAndroid) {
            showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
                setVisible(true);
                setHeight(e.endCoordinates.height);
                animatedHeight.value = e.endCoordinates.height;
            });
            hideSubscription = Keyboard.addListener('keyboardDidHide', (e) => {
                setVisible(false);
                setHeight(0);
                animatedHeight.value = 0;
            });
        }
        else {
            showSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
                setVisible(true);
                setHeight(e.endCoordinates.height);
                animatedHeight.value = e.endCoordinates.height;
            });
            hideSubscription = Keyboard.addListener('keyboardWillHide', (e) => {
                setVisible(false);
                setHeight(0);
                animatedHeight.value = 0;
            });
        }

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    return { visible, height, animatedHeight, isAndroid, style };
}