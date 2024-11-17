import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../utils/functions/responsiveUtils';

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing } = theme;
    
    return ({
        container: {
            width:'100%',
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            alignItems: 'center',
            paddingVertical:spacing?.lg,
        },
    });
});
export default styleSheet;
