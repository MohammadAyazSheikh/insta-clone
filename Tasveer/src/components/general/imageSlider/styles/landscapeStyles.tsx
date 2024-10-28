
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        // slider
        sliderContainer: {
            width: w(100),
            backgroundColor: colors.primary1,
            alignItems: 'center',
            paddingVertical: 5,
        },
        sliderImageView: {
            width: w(100),
            maxHeight: w(60),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
        },
        sliderImage: {
            width: w(100),
            height: '100%',
            resizeMode: 'contain',
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10
        }
    });
}

export default landscapeStyles;



