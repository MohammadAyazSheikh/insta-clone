
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, } from '../../../../theme/fonts';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors :colorObjectType) => {

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
      
    });
}

export default landscapeStyles;



