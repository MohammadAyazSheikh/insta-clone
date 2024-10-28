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
import IconAnt from 'react-native-vector-icons/AntDesign'
import { useBackHandler } from '../../hooks/backHandlerHooks';
import { phoneEmailTabsProps } from './selectPhoneEmail';
import { validEmail } from '../../utils/functions/validations';


export default function SelectEmail({
    setData,
    setErr,
    data,
    err,
    setActiveTopTab
}: childScreenProps & phoneEmailTabsProps) {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const dispatch = useAppDispatch();



    return (
        <View
            style={styles.containerChild}
        >
            {/* ----Text input---- */}
            <TextBox
                placeholder='Email'
                value={data?.email}
                error={err?.email}
                onChangeText={(value) => {
                    setData({
                        ...data,
                        email: value
                    });

                    if (!validEmail(value)) {
                        setErr({
                            ...err,
                            email: "Invalid email"
                        });
                    }
                    else {
                        setErr({
                            ...err,
                            email: ""
                        });
                    }
                }}
                iconRight={
                    data?.email &&
                    <IconAnt size={20}
                        onPress={() => setData({
                            ...data,
                            email: '',
                        })}
                        color={colors.grey1}
                        name={'close'}
                    />
                }
            />
            {/* Next button */}
            <CustomButton
                disabled={Boolean(!data?.email || err?.email)}
                buttonText='Next'
                onPress={() => setActiveTopTab && setActiveTopTab('verifyEmail')}
            />
        </View>
    );
}



