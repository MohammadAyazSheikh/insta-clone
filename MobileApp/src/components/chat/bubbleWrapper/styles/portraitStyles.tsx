
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        bubbleContainer: {
            maxWidth: '90%',
            paddingVertical: 5,
        },
        messageView: {
            width: '100%',
            borderRadius: 15,
            padding: 10,
            backgroundColor: colors.primary4,
        },
        messageViewSender: {
            backgroundColor: colors.ternary1,
        },
        msgText: {
            fontSize: 12,
            color: colors.secondary1,
        },
        msgTextSenderLight: {
            color:  colors.primary1
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:'flex-end',
        },
        txtTime: {
            fontSize: 11,
            color: colors.ternary3,
            marginRight:5,
        },
    });
}

export default portraitStyles;



