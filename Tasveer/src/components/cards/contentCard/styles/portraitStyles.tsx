
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        container: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'flex-start'
        },
        btnStyle: {
            marginHorizontal: 5
        }
    });
}

export default portraitStyles;



