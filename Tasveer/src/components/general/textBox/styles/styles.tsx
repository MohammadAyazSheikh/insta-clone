import { fontFamily, } from '../../../../theme/fonts';
import { createStyleSheet } from 'react-native-unistyles';


const styleSheet = createStyleSheet((theme) => {
    const { colors, fontSize,spacing } = theme;

    return ({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: "85%",
        },
        //text input
        inputView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary3,
            width: "100%",
            height: 50,
            borderRadius: spacing.md,
            paddingHorizontal: spacing.md,
            marginVertical: spacing.md,
        },
        inputViewFocus: {
            borderWidth: 1,
            borderColor: colors.primary4,
        },
        inputViewErrStyle: {
            borderWidth: 1,
            borderColor: 'tomato',
        },
        inputStyle: {
            color: colors.secondary1,
            flex: 1,
            fontFamily: fontFamily.regular,
            fontSize: fontSize.md,
        },
        //error and label
        txtErr: {
            color: "tomato",
            fontFamily: fontFamily.regular,
            fontSize: fontSize.sm
        },
        txtLabel: {
            color: colors.secondary1,
            fontFamily: fontFamily.regular,
            fontSize: fontSize.lg,
            alignSelf: "flex-start"
        },
    });
});
export default styleSheet;






