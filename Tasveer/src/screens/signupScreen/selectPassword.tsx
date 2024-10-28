import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import CustomButton from '../../components/general/customButton/customButton';
import { useAppDispatch, } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import TextBox from '../../components/general/textBox/textBox';
import { TextRegular } from '../../components/general/text/text';
import { childScreenProps } from './signupScreen';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import IconFe from 'react-native-vector-icons/Feather'
import { useBackHandler } from '../../hooks/backHandlerHooks';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function SelectPassword({
    setData,
    setErr,
    data,
    err,
    setActiveScreen,
}: childScreenProps) {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const [hidePass, setHidePass] = useState(true);
    const dispatch = useAppDispatch();

    useBackHandler(() => {
        setActiveScreen && setActiveScreen("username");
        return true;
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.scroll}>
                <Animated.View
                    style={styles.containerChild}
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                >
                    <TextRegular
                        style={styles.txtChildTitle}
                    >
                        Choose a password
                    </TextRegular>
                    <View style={styles.row}>
                        <TextRegular
                            style={styles.txtChildSubTitle}
                        >
                            For security, your password must be 6 characters or more.
                        </TextRegular>
                    </View>
                    {/* ----Text input---- */}
                    <TextBox
                        placeholder='Password'
                        value={data?.password}
                        error={err.password}
                        secureTextEntry={hidePass}
                        onChangeText={(value) => {
                            setData({
                                ...data,
                                password: value
                            });
                            if (value.length < 6) {
                                setErr({
                                    ...err,
                                    password: 'Password must be 6 characters or more.'
                                });
                            } else {
                                setErr({
                                    ...err,
                                    password: '',
                                })
                            }
                        }}
                        iconRight={
                            <IconFe size={20}
                                onPress={() => setHidePass(hide => !hide)}
                                color={colors.grey1}
                                name={hidePass ? 'eye-off' : 'eye'}
                            />
                        }
                    />
                    {/* Next button */}
                    <CustomButton
                        disabled={Boolean(!data?.password || err?.password)}
                        buttonText='Next'
                        onPress={() => setActiveScreen && setActiveScreen("phoneEmail")}
                    />
                </Animated.View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}



