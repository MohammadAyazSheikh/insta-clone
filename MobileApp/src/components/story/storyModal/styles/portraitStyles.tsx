
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {


    return StyleSheet.create({
        centeredView: {
            // flex: 1,
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
            borderWidth: 1,
            borderColor: 'red',
            transformOrigin: "center"
        },
        row:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            width:w(100),
        }
    });
}

export default portraitStyles;



