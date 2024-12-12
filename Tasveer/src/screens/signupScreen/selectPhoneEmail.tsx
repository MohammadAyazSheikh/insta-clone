import React, { useState } from 'react';
import { View } from 'react-native';
import { TextRegular } from '../../components/general/text/text';
import { childScreenProps } from './signupScreen';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useBackHandler } from '../../hooks/backHandlerHooks';
import { TouchableRipple } from 'react-native-paper';
import SelectEmail from './selectEmail';
import SelectPhone from './selectPhone';
import VerifyPassword from './verifyPhone';
import VerifyEmail from './verifyEmail';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { useAppThemeColors } from '../../utils/functions/responsiveUtils';



export type phoneEmailScreenType = 'phone' | 'email' | 'verifyPhone' | 'verifyEmail';

export type phoneEmailTabsProps = {
    activeTopTab?: string;
    setActiveTopTab: React.Dispatch<React.SetStateAction<phoneEmailScreenType>>;
}

export default function SelectPhoneEmail({
    setData,
    setErr,
    data,
    err,
    setActiveScreen,
}: childScreenProps) {



    // const dispatch = useAppDispatch();

    const [activeTopTab, setActiveTopTab] = useState<phoneEmailScreenType>('phone');

    useBackHandler(() => {
        setActiveScreen && setActiveScreen("password");
        return true;
    });
    
    // --------------------------if user selecting phone or email-------------------
    if (activeTopTab == 'email' || activeTopTab == 'phone')
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.scroll}>
                    <Animated.View
                        style={styles.containerChild}
                        entering={FadeInRight}
                        exiting={FadeOutLeft}
                    >
                        {/* title */}
                        <TextRegular
                            style={styles.txtChildTitle}
                        >
                            Add phone or email
                        </TextRegular>
                        {/* tabs */}
                        <Tabs
                            activeTopTab={activeTopTab}
                            setActiveTopTab={setActiveTopTab}
                        />
                        {
                            activeTopTab == 'email' ?
                                < SelectEmail
                                    setData={setData}
                                    setErr={setErr}
                                    data={data}
                                    err={err}
                                    setActiveTopTab={setActiveTopTab}
                                />
                                :
                                < SelectPhone
                                    setData={setData}
                                    setErr={setErr}
                                    data={data}
                                    err={err}
                                    setActiveTopTab={setActiveTopTab}
                                />
                        }
                    </Animated.View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    // --------------------------if user entering otp from mobile-------------------
    if (activeTopTab == 'verifyPhone')
        return (
            <VerifyPassword
                data={data}
                setActiveTopTab={setActiveTopTab}
            />);

    // --------------------------if user entering otp from email-------------------
    if (activeTopTab == 'verifyEmail')
        return (
            <VerifyEmail
                data={data}
                setActiveTopTab={setActiveTopTab}
            />)
}


const Tabs = ({ setActiveTopTab, activeTopTab }: phoneEmailTabsProps) => {

    const colors = useAppThemeColors();
    
    return (
        <View style={[styles.row, {
            borderBottomWidth: 0.5,
            borderBottomColor: colors.common.grey1
        }]}>
            {/* ----------------phone-------- */}
            <TouchableRipple
                rippleColor={'rgba(32, 33, 36,0.5)'}
                borderless
                style={[styles.btnTab,
                activeTopTab == 'phone' && styles.btnTabActive
                ]}
                onPress={() => setActiveTopTab("phone")}
            >
                <TextRegular
                    style={[styles.btnTabTxt,
                    activeTopTab == 'phone' && { color: colors.secondary1 }
                    ]}
                >
                    PHONE
                </TextRegular>
            </TouchableRipple>
            {/* ----------------email-------- */}
            <TouchableRipple
                rippleColor={'rgba(32, 33, 36,0.5)'}
                borderless
                style={[styles.btnTab,
                activeTopTab == 'email' && styles.btnTabActive
                ]}
                onPress={() => setActiveTopTab("email")}
            >
                <TextRegular
                    style={[styles.btnTabTxt,
                    activeTopTab == 'email' && { color: colors.secondary1 }
                    ]}
                >
                    EMAIL
                </TextRegular>
            </TouchableRipple>
        </View>
    )
}


