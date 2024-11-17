import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w } from "../../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, fontSize } = theme;
    return ({
        webView: {
            width: w(50),
            height: w(40),
            marginBottom: spacing.md,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        texView: {
            width: w(50),
            marginBottom: 5,
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        textLocation: {
            fontSize: fontSize.md,
            color: colors.ternary3
        }
    })
});

export default styleSheet;