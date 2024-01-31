import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import Form from '../../components/general/form/renderForm';
import CustomButton from '../../components/general/customButton/customButton';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addData } from '../../redux/features/dynamicFormSlice/dynamicFormSlice';
import { changeTheme } from '../../redux/features/theme/themeSlice';
export type DynamicFormType = {
    name?: string,
    email?: string,
    phone?: string,
}
export default function DynamicForm() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const [data, setData] = useState<DynamicFormType>({});
    const [err, setErr] = useState<DynamicFormType>({});
    const dispatch = useAppDispatch();

  
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
                {/* dynamic form */}
                <Form
                    data={data}
                    setData={setData}
                    err={err}
                    setErr={setErr}
                    inputList={require('./formData')}
                />
                {/* ---button--- */}
                <CustomButton
                    buttonText='Submit'
                    onPress={() => {
                        if (!data?.name || err?.name) {
                            showAlert(err?.name || "Enter name");
                            return;
                        }

                        if (!data?.email || err?.email) {
                            showAlert(err?.email || "Enter email");
                            return;
                        }

                        if (!data?.phone || err?.phone) {
                            showAlert(err?.phone || "Enter phone number");
                            return;
                        }

                        dispatch(addData(data));

                        setData({});

                        Toast.show({
                            type: 'successMsg',
                            text1: 'Success!',
                            text2: 'Data added 🎉'
                        })
                        navigation.navigate("PostList")
                    }}
                />
            </ScrollView>
        </View>
    );
}

