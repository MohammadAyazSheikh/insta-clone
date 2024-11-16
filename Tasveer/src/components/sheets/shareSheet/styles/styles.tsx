import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../../utils/functions/responsiveUtils';
import { fontFamily } from '../../../../theme/fonts';

const styleSheet = createStyleSheet((theme) => {

    const { colors, spacing, fontSize } = theme;

    return ({
        scroll: {
            alignItems: 'flex-start'
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing?.lg
        },
        col: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: spacing?.lg,
        },
        container: {
            width: w(100) / 3,
            alignItems: 'center',
            marginVertical: spacing?.md
        },
        btnSendStyle: {
            height: 'auto',
            width: '100%',
            paddingVertical: spacing?.lg,
        },
        inputStyle: {
            fontFamily: fontFamily.regular,
            fontSize: fontSize?.md,
            color: colors.secondary1,
            width: '100%',
            paddingVertical: spacing?.md,
        },
    });
});
export default styleSheet;
