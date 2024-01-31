import React, { useState } from 'react';
import { View, ScrollView, Image, Alert, Touchable } from 'react-native';
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
type loginProps = {
    username: string,
    password: string,
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

    const showAlert = (msg: string) => {
        Toast.show({
            type: 'warningMsg',
            text1: 'Stop!',
            text2: msg,
        })
    }
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
                    iconPosition='right'
                    icon={() =>
                        <TouchableOpacity
                            onPress={() => setHidePass(hide => !hide)}
                        >
                            <IconFe size={20}
                                color={colors.primary2}
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
                        Alert.alert(JSON.stringify(data, null, 2))
                    }}
                />
                {/* loader */}
                <Loader
                    showLoader={isLoadingAdd}
                />
            </ScrollView>
        </View>
    );
}

