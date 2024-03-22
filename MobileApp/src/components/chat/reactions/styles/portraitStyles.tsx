
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0
        },
        container: {
            width: 'auto',
            backgroundColor: colors.secondary2,
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '10%',
            right: '10%',
            top: '40%'
        },
        emojiView: {
            padding: 3,
            borderRadius: 100,
            marginHorizontal: 5,
        },
        emojiActive: {
            backgroundColor: colors.secondary1
        },

        // reaction sheet
        row: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal:10,
            paddingVertical:5,
        },
        rowUser:{
            flex:1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        txtName:{
            color:colors.ternary1
        },
    });
}

export default portraitStyles;



