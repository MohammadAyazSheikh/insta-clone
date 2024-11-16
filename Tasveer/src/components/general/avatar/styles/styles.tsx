import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../../utils/functions/responsiveUtils';

const styleSheet = createStyleSheet((theme) => {
    const { colors,fontSize,spacing } = theme;
    
    return ({
        containerStyle: {
            width: w(25),
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgStyles: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        avatarView: {
            width: w(25),
            aspectRatio: 1,
            borderRadius: 1000,
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing?.xsm,
        },
        avatarImgView: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1000,
            backgroundColor:colors.primary4
        },
        txtName: {
            fontSize: fontSize?.md,
            color: colors.secondary1,
            textAlign:'center',
        },
        iconSelect: {
            padding: 3,
            backgroundColor: colors.ternary1,
            borderRadius:1000,
            position:'absolute',
            left:'80%',
            bottom:'0%'
        },
    });
});
export default styleSheet;
