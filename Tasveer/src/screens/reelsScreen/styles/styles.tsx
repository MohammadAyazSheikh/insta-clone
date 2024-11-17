import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../utils/functions/responsiveUtils';

const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors } = theme;

    return ({
        container: {
            flex: 1,
            width: w(100),
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            height: "100%",
        },
    });
});

export default styleSheet;