
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';




type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({

        imgStyles: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        avatarView: {
            width: w(25),
            aspectRatio: 1,
            borderRadius:1000,
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
        }

    });
}

export default portraitStyles;



