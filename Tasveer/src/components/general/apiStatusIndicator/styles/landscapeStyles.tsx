
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors :colorObjectType) => {

    return StyleSheet.create({

        container: {
            height: '100%',
            width: '100%',
            backgroundColor: colors.primary1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal:10,
            paddingVertical:20,
            ...StyleSheet.absoluteFillObject
        },
        txtLoading: {
            color: colors.primary1,
            fontFamily: fontFamily.bold,
            fontSize: h(3),
            marginTop:10,
            alignSelf:'center',
        },
        imgError:{
            width:h(20),
            height:h(20)
        }
    });
}

export default landscapeStyles;



