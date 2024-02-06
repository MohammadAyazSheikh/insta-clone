
import { StyleSheet } from 'react-native';
import { colorObjectType } from "../../../theme/colors";
type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            alignItems: 'center',
        },
        containerChild: {
            width: w(100),
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 50
        },
        txtChildTitle: {
            fontSize: 30,
            color: colors.secondary1,
            textAlign:'center',
        },

        txtChildSubTitle: {
            fontSize: 14,
            color: colors.grey1,
            marginVertical: 20,
            textAlign: 'center',
        },

        row: {
            flexDirection: 'row',
            width: w(85),
            justifyContent: 'center',
            alignItems: 'center',
        },
        // ---tab styles--
        btnTab: {
            height: 50,
            width: "50%",
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnTabActive: {
            borderBottomWidth: 1,
            borderBlockColor: colors.secondary1,
        },
        btnTabTxt: {
            fontSize: 16,
            color: colors.grey1,
        },
        // resend text
        texView:{
            width:w(85),
            justifyContent:'center',
            alignItems:'center',
        },
        txtResend: {
            color: colors.ternary3,
            fontSize: 14,
            marginVertical:20,
        },
    });
}

export default portraitStyles;



