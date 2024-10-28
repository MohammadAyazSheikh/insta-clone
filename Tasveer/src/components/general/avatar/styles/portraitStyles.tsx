
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';




type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        containerStyle: {
            width: w(25),
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgStyles: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        avatarView: {
            width: w(25),
            aspectRatio: 1,
            borderRadius: 1000,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
        },
        avatarImgView: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1000,
            backgroundColor:colors.primary4
        },
        txtName: {
            fontSize: 14,
            color: colors.secondary1,
            textAlign:'center',
        },
        iconSelect: {
            padding: 3,
            backgroundColor: colors.ternary1,
            borderRadius:1000,
            position:'absolute',
            left:'80%',
            bottom:'0%'
        },
    });
}

export default portraitStyles;



