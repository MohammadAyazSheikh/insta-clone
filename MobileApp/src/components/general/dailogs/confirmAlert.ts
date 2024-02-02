import Toast from "react-native-toast-message";
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
        onPress: () => {
            Toast.hide();
            onDismiss && onDismiss();
        },
        props: {
            onConfirm: () => {
                onConfirm && onConfirm();
                Toast.hide();
            },
            dismissText,
            confirmText
        }
    })
}