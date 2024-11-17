import { createStyleSheet } from "react-native-unistyles";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, fontSize } = theme;
    return ({
        msgText: {
            fontSize: fontSize?.sm,
            color: colors.ternary1,
        },
        msgTextSenderLight: {
            color: colors.secondary1,
        },

        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical:spacing?.md,
        }
    })
});

export default styleSheet;