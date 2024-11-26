import React, { useEffect, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import styleSheet from './styles/styles';
import IconAnt from '@expo/vector-icons/AntDesign';
import IconEnt from '@expo/vector-icons/Entypo';
import TextBox from '../textBox/textBox';
import { TouchableRipple } from 'react-native-paper';
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppSelector } from '../../../redux/hooks';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
type props = {
    containerProps?: ViewProps;
    iconLeftColor?: string,
    iconRightColor?: string,
    onBack?: () => void,
    onChangeText?: (text: string) => void,
};



const SearchBarAnimated = ({
    iconLeftColor,
    containerProps,
    onChangeText = () => '',
    onBack = () => ''
}: props) => {
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { styles, theme: { colors } } = useStyles(styleSheet);
    const { screen: { width } } = UnistylesRuntime;
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";

    const [text, setText] = useState<string>();
    // animations
    const animValue = useSharedValue(0);

    const openBar = () => {
        animValue.value = withTiming(1, { duration: 200 });
    };

    const closeBar = () => {
        animValue.value = withTiming(0, { duration: 100 }, () => {
            runOnJS(onBack)();
        });
    };


    const inputRange = [0, 0.5, 1];

    const stylesAnim = useAnimatedStyle(() => {

        // const scaleX = interpolate(
        //     animValue.value,
        //     inputRange,
        //     [0, 0.5, 1],
        //     Extrapolate.CLAMP
        // );

        const translateX = interpolate(
            animValue.value,
            inputRange,
            [width, width / 2, 0],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                // { scaleX },
                { translateX }
            ],
        };

    });

    useEffect(() => {
        openBar();
    }, []);

    const containerLight = !isDark ? { backgroundColor: colors.primary1 } : {};
    const containerInputLight = !isDark ? { backgroundColor: colors.primary3 } : {};
    return (
        <View {...containerProps} style={[containerLight]}>
            <Animated.View style={[styles.viewSearchBar,
                containerLight,
                stylesAnim]}>
                <TextBox
                    containerStyle={{
                        ...styles.searchBarContainer,
                    }}
                    inputViewStyle={{ ...styles.inputViewStyles, ...containerInputLight }}
                    inputViewFocusStyle={{ borderWidth: 0 }}
                    style={{ color: colors.secondary1 }}
                    placeholderTextColor={colors.common.grey1}
                    placeholder='search'
                    value={text}
                    onChangeText={(value) => {
                        setText(value);
                        onChangeText && onChangeText(value);
                    }}
                    // back button
                    iconLeft={<TouchableRipple
                        onPress={onBack}
                    >
                        <IconAnt
                            name="left"
                            size={26}
                            color={iconLeftColor ?? colors.secondary1}
                        />
                    </TouchableRipple>}
                    // clear text
                    iconRight={
                        text &&
                        <TouchableRipple
                            onPress={() => setText('')}
                        >
                            <IconEnt
                                name="cross"
                                size={26}
                                color={iconLeftColor ?? colors.secondary1}
                            />
                        </TouchableRipple>}
                />
            </Animated.View>
        </View>
    );
};
export default SearchBarAnimated;
