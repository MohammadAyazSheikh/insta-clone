
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {


    return StyleSheet.create({
        centeredView: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            width: w(100),
            height: h(100),
            transform: [
                { perspective: 1000 },
            ],

        },
        scroll: {
            width: w(100),
            height: h(100),
        },
        container: {
            width: w(100),
            height: h(100),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary1,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: 'red',
            transformOrigin: "center"
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: w(100),
        },
        col: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        contentContainer: {
            flex: 1,
            width: '100%',
        },
        imgContent: {
            flex: 1,
            width: '100%',
            resizeMode: 'contain',
        },
    });
}

export default portraitStyles;



