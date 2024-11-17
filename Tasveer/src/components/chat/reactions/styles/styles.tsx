import { createStyleSheet } from "react-native-unistyles";
import { StyleSheet } from "react-native";
const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing } = theme;
    return ({
        backDrop: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
            opacity: 0
        },
        container: {
            width: 'auto',
            backgroundColor: colors.primary3,
            paddingVertical: spacing?.md,
            paddingHorizontal: spacing?.md,
            borderRadius: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '10%',
            right: '10%',
            top: '40%'
        },
        emojiView: {
            padding: 3,
            borderRadius: 100,
            marginHorizontal: spacing?.md,
        },
        emojiActive: {
            backgroundColor: colors.secondary1
        },

        // reaction sheet
        row: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing?.lg,
            paddingVertical: spacing?.md,
        },
        rowUser: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        txtName: {
            color: colors.ternary1
        },
    })
});

export default styleSheet;