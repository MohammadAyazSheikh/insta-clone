
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, fontSize } from '../../../../theme/fonts';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors :colorObjectType) => {

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            backgroundColor: colors.secondary1,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            height: "100%",
        },
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0.8
        },
        // slider
        scrollContainer: {
            // alignItems:'center',
            // justifyContent:'center',
            paddingTop: 30,
            paddingBottom:0,
        },
        sliderContainer: {
            width: w(95),
            // height:w(110),
            // justifyContent: 'center',
            alignItems: 'center',
        },
        imgView: {
            width: "100%",
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imgStyle: {
            width: "90%",
            height: "90%"
        },
        descView: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 40,
        },
        txtDesc: {
            color: colors.primary1,
            fontSize: h(8),
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: fontFamily.bold,
        },
        bottomSliderView: {
            flex: 1,
            justifyContent:"center",
            alignItems:'center',
        },
    });
}

export default landscapeStyles;



