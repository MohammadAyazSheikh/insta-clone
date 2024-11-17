import { createStyleSheet } from "react-native-unistyles";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, fontSize } = theme;
    return ({
        bubbleContainer: {
            maxWidth: '90%',
            paddingVertical: spacing?.md,
        },
        messageView: {
            width: '100%',
            borderRadius: 15,
            padding: spacing?.lg,
            backgroundColor: colors.primary4,
        },
        messageViewSender: {
            backgroundColor: colors.ternary1,
        },
        msgText: {
            fontSize: fontSize?.sm,
            color: colors.secondary1,
        },
        msgTextSenderLight: {
            color:  colors.primary1
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:'flex-end',
        },
        txtTime: {
            fontSize: fontSize?.xsm,
            color: colors.ternary3,
            marginRight:spacing?.md,
        },
        reactionContainer:{
           
        }
    })
});

export default styleSheet;