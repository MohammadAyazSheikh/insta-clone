
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        container: {
            width: 'auto',
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor:colors.primary1,
        },
        reelContainer: {
            aspectRatio: 1 / 2,
        },
        imgStyles: {
            width: '100%',
            height: '100%'
        },
        iconStyles: {
            position: 'absolute',
            top: 10,
            right: 10
        },
    });
}

export default portraitStyles;



