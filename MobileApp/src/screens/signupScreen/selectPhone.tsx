import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import CustomButton from '../../components/general/customButton/customButton';
import { useAppDispatch, } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import TextBox from '../../components/general/textBox/textBox';
import { childScreenProps } from './signupScreen';
import IconAnt from 'react-native-vector-icons/AntDesign'
import { TextBold } from '../../components/general/text/text';
import { TouchableRipple } from 'react-native-paper';
import CountryCodePicker from '../../components/general/countryCodePicker/countryCodePicker';
import { countiesInfo, countiesInfoType } from '../../constants/data/countriesInfo';
import { isValidPhoneNo } from '../../utils/functions/validations';
import { phoneEmailTabsProps } from './selectPhoneEmail';

export default function SelectPhone({
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
    const [code, setCode] = useState<countiesInfoType>(countiesInfo[0]);
    const [showCounties, setShowCounties] = useState(false);

    useEffect(()=>{
        setData({
            ...data,
            countryCode: "+"+countiesInfo[0].callingCode
        })
    },[])

    const CodeButton = useCallback(({ code }: { code: string }) => (
        <TouchableRipple
            onPress={() => {
                setShowCounties(true);
            }}
            style={{
                height: '70%',
                padding: 10,
                marginRight: 8,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightColor: colors.grey1,
                borderRightWidth: 0.5
            }}
        >
            <TextBold style={{ color: colors.grey1, fontSize: 13 }}>
                {code}
            </TextBold>
        </TouchableRipple>
    ), []);

    return (
        <View
            style={styles.containerChild}
        >
            {/* ----Text input---- */}
            <TextBox
                placeholder='Phone'
                value={data?.phone}
                error={err?.phone}
                keyboardType='phone-pad'
                onChangeText={(value) => {

                    setData({
                        ...data,
                        phone: value,
                    });

                    if (!isValidPhoneNo('+' + code.callingCode + value))
                        setErr({
                            ...err,
                            phone: 'Invalid phone number.'
                        });
                    else
                        setErr({
                            ...err,
                            phone: ''
                        });
                }}
                iconRight={
                    data?.phone &&
                    <IconAnt size={20}
                        onPress={() => setData({
                            ...data,
                            phone: '',
                        })}
                        color={colors.grey1}
                        name={'close'}
                    />
                }
                iconLeft={
                    <CodeButton
                        code={`${code.emoji} ( +${code.callingCode} )`}
                    />
                }
            />
            {/* Next button */}
            <CustomButton
                disabled={Boolean(!data?.phone || err?.phone)}
                buttonText='Next'
                onPress={() => {
                    setActiveTopTab && setActiveTopTab('verifyPhone');
                }}
            />
            {/*----country code modal------ */}
            <CountryCodePicker
                show={showCounties}
                onClose={() => setShowCounties(false)}
                onPress={(code) => {
                    setCode(code);
                    setData({
                        ...data,
                        countryCode: "+"+code.callingCode
                    })
                    setShowCounties(false);
                }}
            />
        </View>
    );
}



