import React, { useEffect } from "react";
import Toast, { ToastConfigParams } from "react-native-toast-message";
import { View, BackHandler } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useAppThemeColors } from "../../../utils/functions/responsiveUtils";
import { useAppSelector } from "../../../redux/hooks";
import { styles } from "./styles";
import { TextRegular, TextBold } from "../text/text";
import { useBackHandler } from "../../../hooks/backHandlerHooks";
interface ToastConfigProps {
    onConfirm?: () => void,
    onDismiss?: () => void,
    dismissText?: string,
    confirmText?: string,
}

export const ConfirmAlert = ({ text1, text2, props, }: ToastConfigParams<ToastConfigProps>) => {
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";

    //if user press back button hide toast
    useBackHandler(() => {
        Toast.hide();
        return false;
    });

    return (
        <View style={styles.alertContainer}>
            <View style={[styles.alertView, {
                height: 225,
                backgroundColor:
                    isDark ? colors.primary4 : "#FFF"
            }]}>
                <View style={[styles.alertTextView, { height: '60%' }]}>
                    <TextBold style={[
                        styles.txtAlertTitle,
                        { color: colors.secondary1 }
                    ]}
                        numberOfLines={1}
                    >
                        {text1}
                    </TextBold>
                    <TextRegular style={[
                        styles.txtAlertSubTitle,
                        { color: colors.grey1 }
                    ]}
                        numberOfLines={3}
                    >
                        {text2}
                    </TextRegular>
                </View>
                {/* dismiss button */}
                <TouchableRipple
                    rippleColor={
                        isDark ?
                            'rgba(255,255,255,0.2)'
                            :
                            'rgba(000,000,000,0.2)'
                    }
                    borderless
                    onPress={props?.onConfirm}
                    style={[styles.alertBtn, { borderTopColor: colors.primary3, height: '20%' }]}>
                    <TextBold style={[{ color: colors.ternary1, fontSize: 16 }]}>
                        {props?.confirmText}
                    </TextBold>
                </TouchableRipple>
                {/* dismiss button */}
                <TouchableRipple
                    rippleColor={
                        isDark ?
                            'rgba(255,255,255,0.2)'
                            :
                            'rgba(000,000,000,0.2)'
                    }
                    borderless
                    onPress={props?.onDismiss}
                    style={[styles.alertBtn, { borderTopColor: colors.primary3, height: '20%' }]}>
                    <TextRegular style={[{ color: colors.grey1, fontSize: 16 }]}>
                        {props?.dismissText}
                    </TextRegular>
                </TouchableRipple>
            </View>
        </View>
    )
}


export const ShowConfirmAlert = ({
    title = 'App Message',
    description = 'Developer wants to say you hello 👋',
    dismissText = 'Dismiss',
    confirmText = 'Confirm',
    onDismiss = () => { },
    onConfirm = () => { },
}) => {
    Toast.show({
        type: 'confirmAlert',
        text1: title,
        text2: description,
        autoHide: false,
        swipeable: false,
        topOffset: 0,
        props: {
            onConfirm: () => {
                onConfirm && onConfirm();
                Toast.hide();
            },
            onDismiss: () => {
                Toast.hide();
                onDismiss && onDismiss();
            },
            dismissText,
            confirmText
        }
    })
}