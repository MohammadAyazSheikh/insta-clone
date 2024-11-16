import { createStyleSheet } from "react-native-unistyles";
import { fontFamily } from "../../../../theme/fonts";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, fontSize } = theme;
    return ({
        container: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 5,
            backgroundColor: colors.primary4,
            borderRadius: spacing?.lg
        },
        txtInput: {
            flex: 1,
            paddingVertical: 0,
            paddingHorizontal: 0,
            marginHorizontal: spacing?.lg,
            fontFamily: fontFamily.regular,
            fontSize: fontSize?.md,
            color: colors.secondary1
        },
    })
});

export default styleSheet;