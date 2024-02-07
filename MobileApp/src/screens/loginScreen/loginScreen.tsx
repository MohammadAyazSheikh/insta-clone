import React, { useState } from 'react';
import { View, ScrollView, Image, Alert, Text } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import CustomButton from '../../components/general/customButton/customButton';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import Loader from '../../components/general/loader/loader';
import TextBox from '../../components/general/textBox/textBox';
import IconFe from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextBold, TextRegular } from '../../components/general/text/text';
import { showDismissAlert } from '../../components/general/alerts/dismissAlert';

type loginProps = {
    username?: string,
    password?: string,
}

type loginPropsErr = {
    username?: string,
    password?: string,
}

export default function Login() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const [data, setData] = useState<loginProps>({});
    const [err, setErr] = useState<loginPropsErr>({});
    const [hidePass, setHidePass] = useState(true);
    const dispatch = useAppDispatch();
    const { isLoadingAdd } = useAppSelector(state => state.posts);


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* logo */}
                <Image
                    source={
                        theme == "dark" ?
                            require('../../../assets/images/logo-light.png')
                            :
                            require('../../../assets/images/logo-dark.png')
                    }
                    style={styles.logoStyles}
                />
                {/*----- user name -----*/}
                <TextBox
                    placeholder='Phone number, email or username'
                    keyboardType='email-address'
                    value={data.username}
                    onChangeText={(value) => {
                        setData({
                            ...data,
                            username: value
                        })
                    }}
                    error={err.username}
                />
                {/* Password */}
                <TextBox
                    placeholder='Password'
                    secureTextEntry={hidePass}
                    value={data.password}
                    onChangeText={(value) => {
                        setData({
                            ...data,
                            password: value
                        })
                    }}
                    error={err.password}
                    iconRight={
                        <TouchableOpacity
                            onPress={() => setHidePass(hide => !hide)}
                        >
                            <IconFe size={20}
                                color={colors.grey1}
                                name={hidePass ? 'eye-off' : 'eye'}
                            />
                        </TouchableOpacity>
                    }
                />

                {/* ---button--- */}
                <CustomButton
                    disabled={!data.password || !data.username}
                    buttonText='Log in'
                    onPress={() => {
                        showDismissAlert({
                            title: 'Stop!',
                            description: 'API developing is in progress'
                        })
                    }}
                />
                {/* --forget password button ---- */}
                <TextRegular
                    style={styles.txtForgetPss}
                >
                    Forgot your login details?
                    <TextBold
                        style={[styles.txtForgetPss]}
                    >
                        {' Get help logging in.'}
                    </TextBold>
                </TextRegular>
                {/* ------Or line ----- */}
                <View style={styles.row}>
                    <View style={styles.line} />
                    <TextBold style={{
                        color: colors.secondary1,
                        marginHorizontal: 5
                    }}>
                        OR
                    </TextBold>
                    <View style={styles.line} />
                </View>
                {/* ------btn don't have account */}
                <TextRegular
                    style={styles.txtForgetPss}
                    onPress={() => {
                        navigation.navigate("Signup");
                    }}
                >
                    Don't have an account?
                    <TextBold
                        style={[styles.txtForgetPss, { color: colors.ternary1 }]}
                    >
                        {' Sign up.'}
                    </TextBold>
                </TextRegular>
                {/* loader */}
                <Loader
                    showLoader={isLoadingAdd}
                />
            </ScrollView>
        </View>
    );
}

