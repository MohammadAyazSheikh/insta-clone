
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({

        footerContainer: {
            width: '100%',
            paddingVertical: 10,
            backgroundColor: colors.secondary2,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        txtStyle:{
            color:colors.ternary1,
            marginHorizontal:10,
        },
        btnClose: {
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: 'white',
        },
    });
}

export default portraitStyles;



