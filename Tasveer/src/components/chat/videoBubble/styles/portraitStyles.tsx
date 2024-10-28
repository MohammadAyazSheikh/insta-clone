
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';




type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({

        videoView: {
            width: w(70),
            height: h(50),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "black",
            marginBottom: 10
        },
        videoStyles: {
            width: "100%",
            height: '100%',
            backgroundColor: "black",

        },
        btnPlay: {
            backgroundColor: 'white',
            borderRadius: 100,
            padding: 0.5,
            position:'absolute'
        },
    });
}

export default portraitStyles;



