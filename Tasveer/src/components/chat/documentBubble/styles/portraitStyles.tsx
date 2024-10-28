
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        msgText: {
            fontSize: 12,
            color: colors.ternary1,
        },
        msgTextSenderLight: {
            color: colors.secondary1,
        },

        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical:5,
        }
    });
}

export default portraitStyles;



