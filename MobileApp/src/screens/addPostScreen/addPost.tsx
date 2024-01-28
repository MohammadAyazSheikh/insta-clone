import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import Form from '../../components/general/form/renderForm';
import CustomButton from '../../components/general/customButton/customButton';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import { postType } from '../../constants/types/sharedTypes';
import { addPost } from '../../redux/features/postSlice/postSlice';
import Loader from '../../components/general/loader/loader';

export default function AddPost() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const [data, setData] = useState<postType>({});
    const [err, setErr] = useState<postType>({});
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
                {/* dynamic form */}
                <Form
                    data={data}
                    setData={setData}
                    err={err}
                    setErr={setErr}
                    inputList={[
                        {
                            name: "title",
                            label: "Title",
                            required: true,
                            placeHolder: 'Enter title'
                        },
                        {
                            name: "body",
                            label: "Body",
                            required: true,
                            placeHolder: 'Enter body'
                        },
                    ]}
                />
                {/* ---button--- */}
                <CustomButton
                    buttonText='Submit'
                    onPress={() => {
                        if (!data?.title || err?.title) {
                            showAlert(err?.title || "Enter title");
                            return;
                        }

                        if (!data?.body || err?.body) {
                            showAlert(err?.body || "Enter body");
                            return;
                        }

                        dispatch(addPost(data))
                            .then(() => {
                                setData({});
                                navigation.goBack();
                            });
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

