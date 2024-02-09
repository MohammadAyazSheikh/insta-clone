
import { StyleSheet } from 'react-native';
import { fontFamily } from '../../../theme/fonts';
import { colorObjectType } from "../../../theme/colors";
type p = (number: number) => number;



const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

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
        logoStyles:{
            width:h(55),
            resizeMode:'contain',
            marginTop:'10%',
            marginBottom:'10%'
        },
        txtForgetPss: {
            fontSize: 12,
            color: colors.grey1,
            marginVertical: 10
        },
        row: {
            width: '85%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        line: {
            flex: 1,
            paddingVertical: 0.7,
            opacity:0.2,
            backgroundColor: colors.grey1,
        }
    });
}

export default landscapeStyles;



