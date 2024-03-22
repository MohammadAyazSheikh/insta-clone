
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        // =====================Image list footer styles==================
        imageFooterContainer: {
            width: '100%',
            paddingVertical:5,
            backgroundColor: colors.primary2,
            justifyContent: 'center',
        },
        footerImageView: {
            height: h(12),
            aspectRatio: 1,
            backgroundColor: 'white',
            marginHorizontal: 5,
        },
        imgFooterStyle: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        btnRemoveSingleImg: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: colors.secondary1,
            position: 'absolute',
            left: 5,
            top: 5,
        },
        btnCloseImgList: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: 'white',
            position: 'absolute',
            right: 5,
            top: 5,
        },
    });
}

export default portraitStyles;



