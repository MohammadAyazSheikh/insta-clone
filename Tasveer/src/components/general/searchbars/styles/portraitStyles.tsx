
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:5,
            paddingVertical:5,
            backgroundColor:colors.primary4,
            borderRadius:10
        },
        txtInput:{
            flex:1,
            paddingVertical:0,
            paddingHorizontal:0,
            marginHorizontal:10,
            fontFamily:fontFamily.regular,
            fontSize:14,
            color:colors.secondary1
        },
    });
}

export default portraitStyles;



