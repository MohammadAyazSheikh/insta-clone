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
import { TextBold, TextRegular } from '../../components/general/text/text';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useBackHandler } from '../../hooks/backHandlerHooks';
import { phoneEmailTabsProps } from './selectPhoneEmail';
import { showDismissAlert } from '../../components/general/alerts/dismissAlert';
import { signUpProps } from './signupScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
type VerifyScreenProps = { data: signUpProps } & phoneEmailTabsProps;
export default function VerifyEmail({
    data,
    setActiveTopTab
}: VerifyScreenProps) {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const [otp, setOtp] = useState('');
    const dispatch = useAppDispatch();

    useBackHandler(() => {
        setActiveTopTab && setActiveTopTab("email");
        return true;
    });

    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.scroll}>
                <Animated.View
                    style={styles.containerChild}
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                >
                    <View style={styles.texView}>
                        <TextRegular
                            style={[styles.txtChildTitle, { fontSize: 18 }]}
                        >
                            Enter the Confirmation Code We Sent to {data.email}
                        </TextRegular>
                        {/* change number */}
                        <View style={styles.row}>
                            <TextBold
                                style={[styles.txtResend,]}
                                onPress={() => {
                                    setActiveTopTab && setActiveTopTab("email");
                                }}
                            >
                                Change email
                            </TextBold>
                            <TextRegular
                                style={{ fontSize: 12, color: colors.grey1 }}
                            >
                                {'  OR  '}
                            </TextRegular>
                            <TextBold
                                style={[styles.txtResend,]}
                                onPress={() => {
                                    showDismissAlert({
                                        title: 'Wait a moment',
                                        description: 'We can only send you a new login code every 30 seconds.'
                                    })
                                }}
                            >
                                Resend message
                            </TextBold>
                        </View>

                    </View>
                    {/* ----Text input---- */}
                    <TextBox
                        placeholder='Enter Otp'
                        value={otp}
                        onChangeText={(value) => {
                            setOtp(value)
                        }}

                    />
                    {/* Next button */}
                    <CustomButton
                        disabled={otp?.length < 4}
                        buttonText='Next'
                        onPress={() => ''}
                    />
                </Animated.View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}



