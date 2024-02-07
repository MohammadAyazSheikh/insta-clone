import React from "react";
import Toast, { ToastConfigParams } from "react-native-toast-message";
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useAppThemeColors } from "../../../utils/functions/responsiveUtils";
import { useAppSelector } from "../../../redux/hooks";
import { styles } from "./styles";
import { TextRegular, TextBold } from "../text/text";
import { useBackHandler } from "../../../hooks/backHandlerHooks";
interface ToastConfigProps {
    onDismiss?: () => void,
    dismissText?: string,
}


export const DismissAlert = ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => {
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    //if user press back button hide toast
    useBackHandler(() => {
        return false;
    });
    return (
        <View style={styles.alertContainer}>
            <View style={[styles.alertView, {
                backgroundColor:
                    isDark ? colors.primary4 : "#FFF"
            }]}>
                <View style={styles.alertTextView}>
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
                    onPress={props?.onDismiss}
                    style={[styles.alertBtn, { borderTopColor: colors.primary3 }]}>
                    <TextBold style={[{ color: colors.ternary1, fontSize: 16 }]}>
                        {props?.dismissText}
                    </TextBold>
                </TouchableRipple>
            </View>
        </View>
    )
}



 const ShowDismissAlert = ({
    title = 'App Message',
    description = 'Developer wants to say you hello 👋',
    dismissText = 'Dismiss',
    onDismiss = () => { }
}) => {
    Toast.show({
        type: 'dismissAlert',
        text1: title,
        text2: description,
        autoHide: false,
        swipeable: false,
        topOffset: 0,
        props: {
            onDismiss: () => {
                Toast.hide();
                onDismiss && onDismiss();
            },
            dismissText
        },
    })
}