
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { radius, spacing } from '../../../../theme/spacing';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({

        container: {
            height: '100%',
            width: '100%',
            backgroundColor: colors.secondary1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal:10,
            paddingVertical:20,
        },
        txtLoading: {
            color: colors.primary1,
            fontFamily: fontFamily.bold,
            fontSize: w(fontSize.size8),
            marginTop:10
        },
        imgError:{
            width:w(20),
            height:w(20)
        }
    });
}

export default portraitStyles;



