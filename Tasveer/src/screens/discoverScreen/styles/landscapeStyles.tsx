
import { StyleSheet } from 'react-native';
import { fontFamily } from '../../../theme/fonts';
import { colorObjectType } from "../../../theme/colors";
type p = (number: number) => number;



const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 10,
        },
        scroll: {
            paddingTop: 10,
            paddingBottom: 150
        },
    });
}

export default landscapeStyles;



