import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import Animated, { runOnJS, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import CustomButton from "./src/components/general/customButton/customButton";


const TextInputAnim = Animated.createAnimatedComponent(TextInput);

const TestAnim = () => {
    const { styles } = useStyles(styleSheet);

    const [text, setText] = useState("")
    const animVal = useSharedValue(0);
    const stylesAnim = useAnimatedStyle(() => ({
        transform: [{ scale: animVal.value }]
    }));

    const ref = useRef<TextInput>(null);


    const setProps = (value: string) => {
        ref.current?.setNativeProps({
            text: value
        })
    }

    const val = useDerivedValue(() => {
        runOnJS(setProps)(animVal.value.toString());
    }, [animVal])

    useEffect(() => {
        console.log(animVal.value)
    })
    return (
        <View style={styles.container}>
            <Button
                title="Press Me"
                onPress={() => {
                    animVal.value = withRepeat(
                        withTiming(2, {
                            duration: 5000,

                        }), -1, true)
                }}
            />
            <Animated.View style={[{
                width: 50,
                height: 50,
                borderWidth: 1,
            }, stylesAnim]}>

            </Animated.View>
            <TextInputAnim
                value="343"
                ref={ref}
                // animatedProps={inputProp}
                style={{ backgroundColor: 'red', padding: 5 }}
            />

            <TextInputAnim
                value={text}
                onChangeText={setText}
                style={{ backgroundColor: 'grey', borderWidth: 1, width: 300, height: 50 }}
            />
            <Text style={{ color: 'green' }}>
                {text}
            </Text>
        </View>
    )
}



const styleSheet = createStyleSheet((theme) => {
    const { colors } = theme;
    return ({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
});

export default TestAnim;