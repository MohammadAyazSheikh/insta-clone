import { createStyleSheet } from "react-native-unistyles";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing } = theme;
    return ({
        footerContainer: {
            width: '100%',
            paddingVertical: spacing?.lg,
            backgroundColor: colors?.primary4,
            paddingHorizontal: spacing?.lg,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        txtStyle: {
            color: colors.ternary1,
            marginHorizontal: spacing?.lg,
        },
        btnClose: {
            padding: spacing?.xsm,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: 'white',
        },
    })
});

export default styleSheet;