import { StyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../utils/functions/responsiveUtils';

const styles = StyleSheet.create((theme) => {
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
export default styles;
