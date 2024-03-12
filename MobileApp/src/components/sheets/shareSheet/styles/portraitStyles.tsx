
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';




type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        scroll: {
            alignItems: 'flex-start'
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10
        },
        col:{
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            paddingHorizontal:10,
        },
        container: {
            width: w(100) / 3,
            alignItems: 'center',
            marginVertical:5
        },
        btnSendStyle:{
            height:'auto',
            width:'100%',
            paddingVertical:10,
        },
        inputStyle:{
            fontFamily:fontFamily.regular,
            fontSize:14,
            color:colors.secondary1,
            width:'100%',
            paddingVertical:5,
        },
    });
}

export default portraitStyles;



