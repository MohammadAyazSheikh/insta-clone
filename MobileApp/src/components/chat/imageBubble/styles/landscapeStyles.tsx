
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({

        // -------------------image stack styles----------------
        imageListView: {
            flexDirection: 'row',
            position: 'relative',
            // backgroundColor: 'red',
        },
        imageListItemView: {
            aspectRatio: 1,
            backgroundColor: 'white',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        imgChatMulti: {
            width: '97%',
            height: '97%',
            borderRadius: 5,
        },
        lastImageBoxStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        lastImageBoxOverlay: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0,0.7)',
            borderRadius: 5,
            position: 'absolute',
            top: 0,
            left: 0,
        },
        txtMoreImage: {
            color: colors.ternary1,
            fontSize: 16,
        },
    });
}

export default landscapeStyles;



