
import { StyleSheet } from 'react-native';
import { colorObjectType } from "../../../theme/colors";
type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            width:w(100),
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
        },
        scroll: {
            width: w(100),
        },
        
    });
}

export default portraitStyles;



