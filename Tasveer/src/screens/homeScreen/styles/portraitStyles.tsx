
import { StyleSheet } from 'react-native';
import { colorObjectType } from "../../../theme/colors";
type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            alignItems: 'center',
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        // header 
        headerView: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        logoStyles: {
            width: w(35),
            resizeMode: 'contain',
        },
    });
}

export default portraitStyles;



