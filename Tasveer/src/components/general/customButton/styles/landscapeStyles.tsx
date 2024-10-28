
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({

        btnView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.ternary1,
            width: "85%",
            height: 50,
            borderRadius: 5,
            paddingHorizontal: 5,
            marginVertical: 5,
        },
        disableStyle: {
            backgroundColor: colors.ternary2,
        },
        txtBtn: {
            color: "#fff",
            fontFamily: fontFamily.bold,
            fontSize: 14
        }
    });
}

export default landscapeStyles;



