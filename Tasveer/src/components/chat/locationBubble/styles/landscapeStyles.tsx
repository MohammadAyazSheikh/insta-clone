
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        webView: {
            width: h(50),
            height: h(40),
            marginBottom: 5,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        texView:{
            width: h(50),
            marginBottom: 5,
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        textLocation: {
            fontSize: 12,
            color: colors.ternary3
        }
    });
}

export default landscapeStyles;



