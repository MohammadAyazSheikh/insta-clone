
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        bubbleContainer: {
            width: '80%',
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

        
    });
}

export default portraitStyles;



