
import { StyleSheet } from 'react-native';
import { colorObjectType } from "../../../theme/colors";
type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            width:'100%',
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            alignItems: 'center',
            paddingVertical:10,
        },
    });
}

export default portraitStyles;



