import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w, heightToDp as h } from '../../../../utils/functions/responsiveUtils';
const styleSheet = createStyleSheet((theme, runTime) => {

    const { colors, spacing } = theme;

    return ({
        modalView: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors?.secondary1,
            borderRadius: spacing?.lg,
            padding: 5,
          },
        
          modalImgContainer: {
            width: w(90),
            height: h(60),
            borderRadius: spacing?.lg,
          },
          SliderView: {
            width: w(90),
            height: h(60),
            borderRadius: spacing?.lg,
          },
          btnStyle: {
            padding: 3,
            borderRadius: spacing?.xxl,
            backgroundColor: colors?.primary1,
            position: 'absolute',
            left: 20,
            top: 20,
          },
    })
});

export default styleSheet;

