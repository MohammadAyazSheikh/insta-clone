import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../../utils/functions/responsiveUtils';
import { fontFamily } from '../../../../theme/fonts';

const styleSheet = createStyleSheet((theme) => {

    const { colors, spacing, fontSize } = theme;

    return ({
        menuContainer: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal:10,
            paddingVertical:15,
        },
        txtMenu:{
            fontSize:16,
            color:colors.secondary1,
        }
    });
});
export default styleSheet;
