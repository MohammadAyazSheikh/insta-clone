import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, View, } from "react-native";
import { useStyles } from "react-native-unistyles";
import styleSheet from "./styles/styleSheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/general/screenHeaders/header";
import UserAvatar from "../../components/general/avatar/avatar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ButtonRipple from "../../components/general/customButton/buttonRipple";
import { TextBold } from "../../components/general/text/text";
import { pickImage } from "../../utils/functions/imagePicker";
import { widthToDp } from "../../utils/functions/responsiveUtils";
import TextBox from "../../components/general/textBox/textBox";
import CustomButton from "../../components/general/customButton/customButton";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { Controller, useForm } from "react-hook-form";
import TextBoxHookForm from "../../components/general/textBox/textBoxFormHook";
import { updateUserSuccess } from "../../redux/features/user/userSlice";

// Validation Schema
const formSchema = z.object({
    profileImage: z.string().optional(),
    bio: z.string().optional(),
    userName: z.string().regex(/^(?!.*__)[a-zA-Z0-9]([a-zA-Z0-9_]{1,14}[a-zA-Z0-9])?$/, "Invalid username"),
    name: z
        .string()
        .min(1, 'Name is required.')
        .regex(/^[A-Za-z ]+$/, 'First name can only contain letters.'),
});

type FormType = z.infer<typeof formSchema>;

const EditProfile = () => {

    const { styles, theme: { colors } } = useStyles(styleSheet);
    const { user } = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();

    //form hook
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bio: "",
            userName: user?.userName,
            name: `${user?.firstName} ${user?.lastName}`,
            profileImage: user?.profileImage
        },
    });


    const onSubmit = (data: FormType) => {

        const [firstName, lastName] = data.name.split(" ");

        dispatch(updateUserSuccess({
            firstName,
            lastName,
            ...data,
        }))
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Header title="Edit Profile" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.scroll}
                >
                    {/* Profile Picture */}
                    <Controller
                        name="profileImage"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View style={{ alignItems: 'center' }}>
                                <UserAvatar
                                    size={widthToDp(25)}
                                    name={user?.firstName}
                                    image={value ? { uri: value } : null}
                                />
                                <ButtonRipple
                                    onPress={() => pickImage((img) => {
                                        onChange(img.sourceURL!);
                                    })}
                                >
                                    <TextBold style={{ color: colors.ternary1 }}>
                                        Edit picture
                                    </TextBold>
                                </ButtonRipple>
                            </View>
                        )}
                    />
                    {/* name */}
                    <TextBoxHookForm
                        name="name"
                        control={control}
                        error={errors.name?.message}
                        containerStyle={styles.textBoxContainer}
                        label="Name"
                    />
                    {/* User Name */}
                    <TextBoxHookForm
                        name="userName"
                        control={control}
                        error={errors.userName?.message}
                        containerStyle={styles.textBoxContainer}
                        label="Username"
                    />

                    {/* User Name */}
                    <TextBoxHookForm
                        name="bio"
                        control={control}
                        error={errors.bio?.message}
                        containerStyle={styles.textBoxBioContainer}
                        inputViewStyle={{ flex: 1 }}
                        style={styles.inputBioStyle}
                        multiline
                        label="Bio"
                        placeholder="Enter your Bio"
                    />
                    {/* Update button */}
                    <CustomButton
                        buttonText="Update"
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || !isDirty}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default EditProfile;