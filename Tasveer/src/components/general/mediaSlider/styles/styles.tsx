import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w, heightToDp as h } from '../../../../utils/functions/responsiveUtils';
const styleSheet = createStyleSheet((theme, runTime) => {

    const { colors, spacing } = theme;

    return ({
        // slider
        sliderContainer: {
            width: w(100),
            backgroundColor: colors.primary1,
            alignItems: 'center',
            paddingVertical: spacing?.md
        },
        mediaView: {
            width: w(100),
            height: h(50),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: spacing?.md,
        },
        videoStyle: {
            height: '100%',
            width: '100%',
        },
        sliderImage: {
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: spacing?.lg
        }
    })
});

export default styleSheet;

