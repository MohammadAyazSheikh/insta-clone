import { createStyleSheet } from 'react-native-unistyles';
import { heightToDp, widthToDp as w } from '../../../utils/functions/responsiveUtils';
import { commonStyles } from '../../../theme/common';

const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors, spacing } = theme;
    return ({
        container: {
            flex: 1,
            width: w(100),
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
        },
        topView: {
            justifyContent: 'center',
            alignItems: 'center',
            width: w(100),
            paddingHorizontal: 10,
            backgroundColor: colors.primary1
        },
        userInfoRow: {
            ...commonStyles.rowCenter,
            width: '100%',
            paddingVertical: spacing?.lg,
        },
        userInfoTextRow: {
            ...commonStyles.rowCenter,
            flex: 1,
            justifyContent: 'space-evenly'
        },
        txtInfoVal: {
            fontSize: w(5),
            color: colors.secondary1
        },
        txtInfoLabel: {
            fontSize: w(4),
            color: colors.secondary1
        },
        txtName: {
            fontSize: w(3.5),
            color: colors.secondary1,
        },

        btnEdit: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: spacing?.lg,
            borderRadius: spacing?.md,
            backgroundColor: colors.primary4
        },
    })
});

export default styleSheet;





