
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        bubbleContainer: {
            maxWidth: '90%',
            paddingVertical: 5,
        },
        messageView: {
            borderRadius: 15,
            padding: 10,
            backgroundColor: colors.secondary2,
        },
        messageViewSender: {
            backgroundColor: colors.primary1,
        },
        msgText: {
            fontSize: 12,
            color: colors.ternary1,
        },
        msgTextSenderLight: {
            color: colors.secondary1,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:'flex-end',
        },
        txtTime: {
            fontSize: 11,
            color: colors.grey1,
            marginRight:5,
        },
    });
}

export default landscapeStyles;



