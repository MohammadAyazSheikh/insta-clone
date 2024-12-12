import React, { useState } from 'react';
import { View } from 'react-native';
import CustomButton from '../../components/general/customButton/customButton';
import TextBox from '../../components/general/textBox/textBox';
import { TextBold, TextRegular } from '../../components/general/text/text';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useBackHandler } from '../../hooks/backHandlerHooks';
import { phoneEmailTabsProps } from './selectPhoneEmail';
import { showDismissAlert } from '../../components/general/alerts/dismissAlert';
import { signUpProps } from './signupScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { useAppThemeColors } from '../../utils/functions/responsiveUtils';

type VerifyScreenProps = { data: signUpProps } & phoneEmailTabsProps;

export default function VerifyPassword({
    data,
    setActiveTopTab
}: VerifyScreenProps) {


    const colors = useAppThemeColors();
    const [otp, setOtp] = useState('');


    useBackHandler(() => {
        setActiveTopTab && setActiveTopTab("phone");
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
                    <View style={styles.texView}>
                        <TextRegular
                            style={[styles.txtChildTitle, { fontSize: 20 }]}
                        >
                            Enter the Confirmation Code We Sent to {data?.countryCode}{data.phone}
                        </TextRegular>
                        {/* change number */}
                        <View style={styles.row}>
                            <TextBold
                                style={[styles.txtResend,]}
                                onPress={() => {
                                    setActiveTopTab && setActiveTopTab("phone");
                                }}
                            >
                                Change phone number
                            </TextBold>
                            <TextRegular
                                style={{ fontSize: 12, color: colors.common.grey1 }}
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



