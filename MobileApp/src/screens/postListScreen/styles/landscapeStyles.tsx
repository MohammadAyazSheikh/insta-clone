
import { StyleSheet } from 'react-native';
import { fontFamily } from '../../../theme/fonts';
import { colorObjectType } from "../../../theme/colors";
type p = (number: number) => number;



const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.secondary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            alignItems: 'center',
            paddingBottom: 10
        },
        //  fab
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
        },
    });
}

export default landscapeStyles;



