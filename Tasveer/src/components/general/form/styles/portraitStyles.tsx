
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, } from '../../../../theme/fonts';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            width: '100%',
            // flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    });
}

export default portraitStyles;



