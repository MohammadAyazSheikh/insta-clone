import { createStyleSheet } from 'react-native-unistyles';
import { heightToDp, widthToDp as w } from '../../../utils/functions/responsiveUtils';

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, } = theme;

    return ({
        container: {
            width: '100%',
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
        },
        scroll: {
            width: w(100),
            paddingVertical: spacing?.lg,
        },
    });
});
export default styleSheet;
