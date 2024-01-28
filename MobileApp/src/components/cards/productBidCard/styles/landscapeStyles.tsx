
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { radius, spacing } from '../../../../theme/spacing';
import { getShadow } from '../../../../theme/platformSpecificStyles';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors :colorObjectType) => {

    return StyleSheet.create({


        cardView: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secondary3,
            ...getShadow({ elevation: 10 }),
            width: h(45),
            borderRadius: radius.radius1,
            marginVertical: 10,
            overflow: "hidden"
        },
        imageView: {
            width: "100%",
            aspectRatio: 5 / 4,
            backgroundColor: colors.peach1
        },
        imgStyle: {
            width: "100%",
            height: '100%',
        },
        content: {
            flex: 1,
            width: "100%",
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 5
        },
        txtTitleView: {
            width: "100%",

        },
        txtTitle: {
            color: colors.ternary1,
            fontWeight: 'bold',
            fontFamily: fontFamily.bold,
            fontSize: w(fontSize.size9)
        },
        txtDesc: {
            color: colors.ternary1,
            fontFamily: fontFamily.bold,
            fontSize: h(fontSize.size6)
        },
        txtPriceOld:{
            color: colors.ternary1,
            fontFamily: fontFamily.bold,
            fontSize: h(fontSize.size7),
            textDecorationLine:"line-through",
        },
        row:{
            flexDirection:"row",
            width:"100%",
            alignItems:'center',
            paddingTop:3
        },
    });
}

export default landscapeStyles;



