
import { StyleSheet } from 'react-native';
import { colorObjectType } from "../../../theme/colors";
type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType,) => {

    return StyleSheet.create({
        container: {
            backgroundColor: colors.primary1,
            flex: 1
        },
        scrollContainer:{
            height:h(100),
            width:w(100)
        },
    });
}

export default portraitStyles;



