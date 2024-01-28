
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { radius } from '../../../../theme/spacing';
import { getShadow } from '../../../../theme/platformSpecificStyles';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({

        cardView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secondary2,
            ...getShadow({ elevation: 10 }),
            width: w(90),
            height: w(30),
            borderRadius: radius.radius1,
            marginVertical: 10,
            marginHorizontal: 10,
            overflow: "hidden"
        },

        imageView: {
            height: "100%",
            aspectRatio: 1,
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
            fontSize: w(fontSize.size6)
        },
        txtPriceOld: {
            color: colors.ternary1,
            fontFamily: fontFamily.bold,
            fontSize: w(fontSize.size7),
            textDecorationLine: "line-through",
        },
        row: {
            flexDirection: "row",
            width: "100%",
            alignItems: 'center',
            paddingTop: 3
        },
        btnFav: {
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: colors.secondary2,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100
        },
        btnRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginTop: 10,
        },
        btnStyle: {
            backgroundColor: colors.secondary2,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            marginHorizontal: 3
        }
    });
}

export default portraitStyles;
