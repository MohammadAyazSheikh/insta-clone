
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
            backgroundColor: colors.primary3,
            width: w(85),
            height: 50,
            borderRadius: 5,
            paddingHorizontal: 5,
            marginVertical: 5,
        },
        inputViewFocus: {
            borderWidth: 1,
            borderColor: colors.primary4,
        },
        inputStyle: {
            color: colors.secondary1,
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
            alignSelf:"flex-start"
        },
    });
}

export default landscapeStyles;



