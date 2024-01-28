
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        //text input
        inputView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary2,
            width: w(95),
            height: 55,
            borderRadius: 10,
            paddingHorizontal: 5,
            marginVertical: 5,
        },
        inputViewFocus: {
            borderWidth: 1,
            borderColor: colors.primary1,
        },
        inputStyle: {
            color: colors.primary1,
            flex: 1,
            fontFamily: fontFamily.regular,
            fontSize: 14
        },
        //error and label
        txtErr: {
            color: colors.tomato,
            fontFamily: fontFamily.regular,
            fontSize: 14
        },
        txtLabel: {
            color: colors.primary1,
            fontFamily: fontFamily.regular,
            fontSize: 16,
            alignSelf: "flex-start"
        },
    });
}

export default landscapeStyles;



