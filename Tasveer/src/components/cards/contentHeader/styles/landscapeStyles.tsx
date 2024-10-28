
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            // position: 'absolute',
            // top: 0,
            // left: 0
        },
        gradientView: {
            ...StyleSheet.absoluteFillObject,
            opacity: 1
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 5,
        },
        txtTitle: {
            color: colors.secondary1,
            fontSize: 14,
        },
        txtSubtitle: {
            color: colors.grey1,
            fontSize: 12,
            marginLeft: 5,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        btnMenu: {
            padding: 2,
            borderRadius: 100,
        },
    });
}

export default landscapeStyles;



