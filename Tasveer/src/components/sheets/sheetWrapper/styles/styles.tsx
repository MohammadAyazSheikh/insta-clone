import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../../utils/functions/responsiveUtils';

const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors } = theme;
    
    return ({
        bgSheet: {
            backgroundColor: colors.primary3,
        },
        container: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
        },
        handleIndStyle:{
            backgroundColor:colors.secondary1
        },
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
