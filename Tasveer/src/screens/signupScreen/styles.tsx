import { StyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../utils/functions/responsiveUtils';

const styles = StyleSheet.create((theme, runTime) => {
    const { colors, fontSize } = theme;

    return ({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            alignItems: 'center',
        },
        containerChild: {
            width: w(100),
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 50
        },
        txtChildTitle: {
            fontSize: fontSize.xl8,
            color: colors.secondary1,
            textAlign: 'center',
        },

        txtChildSubTitle: {
            fontSize: fontSize.md,
            color: colors.common.grey1,
            marginVertical: 20,
            textAlign: 'center',
        },

        row: {
            flexDirection: 'row',
            width: w(85),
            justifyContent: 'center',
            alignItems: 'center',
        },
        // ---tab styles--
        btnTab: {
            height: 50,
            width: "50%",
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnTabActive: {
            borderBottomWidth: 1,
            borderBlockColor: colors.secondary1,
        },
        btnTabTxt: {
            fontSize: fontSize.lg,
            color: colors.common.grey1,
        },
        // resend text
        texView: {
            width: w(85),
            justifyContent: 'center',
            alignItems: 'center',
        },
        txtResend: {
            color: colors.ternary3,
            fontSize: fontSize.md,
            marginVertical: 20,
        }
    });
});

export default styles;