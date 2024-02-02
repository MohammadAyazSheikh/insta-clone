import Toast from "react-native-toast-message";
export const ShowDismissAlert = ({
    title = 'App Message',
    description = 'Developer wants to say you hello 👋',
    onDismiss = () => { },
}) => {
    Toast.show({
        type: 'dismissAlert',
        text1: title,
        text2: description,
        autoHide: false,
        swipeable:false,
        topOffset: 0,
        onPress: () => {
            Toast.hide();
            onDismiss && onDismiss();
        },
    })
}