
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        container: {
            width: "95%",
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:colors.primary1,
            paddingVertical:10
        },
        centerView:{
            flex:1,
            justifyContent:'center',
            alignItems:'flex-start',
            paddingLeft:10
        },
        txtTitle:{
            color:colors.secondary1,
            fontSize:w(4.5)
        },
        txtSubTitle:{
            color:colors.grey1,
            fontSize:w(4)
        },
        txtTime:{
            color:colors.grey1,
            fontSize:w(3.5),
            marginBottom:5,
        },
        sideView:{
            paddingLeft:5,
            height:'100%',
        },
    });
}

export default portraitStyles;



