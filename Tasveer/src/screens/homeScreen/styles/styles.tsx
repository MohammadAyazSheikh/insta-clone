import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../utils/functions/responsiveUtils';

const styleSheet = createStyleSheet((theme, runTime) => {
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
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        // header 
        headerView: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        logoStyles: {
            width: w(35),
            height: w(15),
            resizeMode: 'contain',
        },
    });
});
export default styleSheet;
