import React, { useState } from 'react';
import { View, ScrollView, Image, Alert, Text } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import CustomButton from '../../components/general/customButton/customButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import Loader from '../../components/general/loader/loader';
import TextBox from '../../components/general/textBox/textBox';
import IconAnt from 'react-native-vector-icons/AntDesign'
import { TextBold, TextRegular } from '../../components/general/text/text';
import { ShowDismissAlert } from '../../components/general/dailogs/dismissAlert';
import { ShowConfirmAlert } from '../../components/general/dailogs/confirmAlert';
import { signUpProps, signUpPropsErr } from './signupScreen';

type selectUserNameProps = {
    setData: React.Dispatch<React.SetStateAction<signUpProps>>;
    data: signUpProps;
    setErr: React.Dispatch<React.SetStateAction<signUpPropsErr>>;
    err: signUpPropsErr
}


export default function SelectUserName({
    setData,
    setErr,
    data,
    err,
}: selectUserNameProps) {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const [hidePass, setHidePass] = useState(true);
    const dispatch = useAppDispatch();
    const { isLoadingAdd } = useAppSelector(state => state.posts);


    return (
        <View style={styles.containerChild}>
            <TextRegular
                style={styles.txtChildTitle}
            >
                Choose username
            </TextRegular>

            <TextRegular
                style={styles.txtChildSubTitle}
            >
                You can always change it later.
            </TextRegular>
            {/* ----Text input---- */}
            <TextBox
                placeholder='Ex: john123'
                value={data?.username}
                onChangeText={(value) => {
                    setData({
                        ...data,
                        username: value
                    });
                }}
                error={err.username}
                iconPosition='right'
                icon={() =>
                    err.username && data?.username ?
                        <IconAnt
                            size={24}
                            name='cross'
                            color={colors.grey1}
                        />
                        :
                        <IconAnt
                            size={24}
                            name='check'
                            color={'green'}
                        />
                }
            />
            {/* Next button */}
            <CustomButton
                disabled={!data?.username}
                buttonText='Next'
            />
        </View>
    );
}

