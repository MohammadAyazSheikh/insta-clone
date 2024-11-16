import { createStyleSheet } from 'react-native-unistyles';
import { StyleSheet } from 'react-native';
const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, fontSize } = theme;
    return ({
        container: {
            width: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            // position:'absolute',
            // top:0,
            // left:0
        },
        gradientView: {
            ...StyleSheet.absoluteFillObject,
            opacity: 1
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: spacing.md,
        },
        txtTitle: {
            color: colors.secondary1,
            fontSize: fontSize.md,
        },
        txtSubtitle: {
            color: colors.common.grey1,
            fontSize: fontSize.sm,
            marginLeft: spacing.md,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        btnMenu: {
            padding: spacing.xsm,
            borderRadius: 100,
        },
    })
});

export default styleSheet;

