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
import { ShowDismissAlert } from '../../components/general/dailogs/dismissAlert';
import { ShowConfirmAlert } from '../../components/general/dailogs/confirmAlert';
import SelectUserName from './selectUserName';
export type signUpProps = {
    username?: string,
    password?: string,
}

export type signUpPropsErr = {
    username?: string,
    password?: string,
}

export default function Signup() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const [data, setData] = useState<signUpProps>({});
    const [err, setErr] = useState<signUpPropsErr>({});
    const dispatch = useAppDispatch();


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <SelectUserName
                    setData={setData}
                    data={data}
                    setErr={setErr}
                    err={err}
                />
            </ScrollView>
        </View>
    );
}

