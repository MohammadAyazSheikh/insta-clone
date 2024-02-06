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
import { TouchableRipple } from 'react-native-paper';
import SelectEmail from './selectEmail';
import SelectPhone from './selectPhone';
import VerifyPassword from './verifyPhone';
import VerifyEmail from './verifyEmail';


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

    const { styles } = useFunctionalOrientation(responsiveStyles);

    const dispatch = useAppDispatch();

    const [activeTopTab, setActiveTopTab] = useState<phoneEmailScreenType>('phone');

    useBackHandler(() => {
        setActiveScreen && setActiveScreen("password");
        return true;
    })
    // --------------------------if user selecting phone or email-------------------
    if (activeTopTab == 'email' || activeTopTab == 'phone')
        return (
            <ScrollView contentContainerStyle={styles.scroll}>
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
            </ScrollView>
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
    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
    return (
        <View style={[styles.row, {
            borderBottomWidth: 0.5,
            borderBottomColor: colors.grey1
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


