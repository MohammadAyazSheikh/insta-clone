import React, { } from 'react';
import { View } from 'react-native';
import CustomButton from '../../components/general/customButton/customButton';
import { useAppDispatch, } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import TextBox from '../../components/general/textBox/textBox';
import { childScreenProps } from './signupScreen';
import IconAnt from '@expo/vector-icons/AntDesign'
import { phoneEmailTabsProps } from './selectPhoneEmail';
import { validEmail } from '../../utils/functions/validations';
import styles from './styles';
import { useAppThemeColors } from '../../utils/functions/responsiveUtils';



export default function SelectEmail({
    setData,
    setErr,
    data,
    err,
    setActiveTopTab
}: childScreenProps & phoneEmailTabsProps) {

    const colors = useAppThemeColors();
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const dispatch = useAppDispatch();



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
                        color={colors.common.grey1}
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



