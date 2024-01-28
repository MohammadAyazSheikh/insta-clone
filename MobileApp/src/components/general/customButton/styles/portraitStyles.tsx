
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles  = (w: p, h: p, colors :colorObjectType) => {
    return StyleSheet.create({

        btnView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary1,
            width: "95%",
            height: h(6.5),
            borderRadius: 10,
            paddingHorizontal: 5,
            marginVertical: 5,
        },
        txtBtn: {
            color: colors.secondary1,
            fontFamily: fontFamily.bold,
            fontSize: 16
        }
    });
}

export default portraitStyles;



