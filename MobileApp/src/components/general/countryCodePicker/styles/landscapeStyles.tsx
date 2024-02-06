
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
        modalView: {
            backgroundColor: colors.primary1,
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            elevation:5,
            // ...getShadow({ elevation: 5, shadowOpacity: 5 })
        },
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0.8
        },
        txtLoading: {
            color: colors.secondary1,
            fontSize: 14,
            fontFamily:fontFamily.bold
        },
    });
}

export default landscapeStyles;



