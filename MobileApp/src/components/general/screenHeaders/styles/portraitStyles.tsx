
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            width: "100%",
            height: h(7),
            backgroundColor: colors.primary1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        txtHeader: {
            color: colors.secondary1,
            fontSize: 20,
            fontFamily: fontFamily.bold
        },
        btnLeftContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: "absolute",
            left: 5,
        },
        btnRightContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: "absolute",
            right: 5,
        },
        // ------------- Animated Search bar-------------
        viewSearchBar: {
            width: '100%',
            height: h(6),
            paddingVertical:5,
            paddingHorizontal: 5,
           
        },
        searchBarContainer: {
            width: '100%',
            height: '100%',
            backgroundColor: colors.primary4,
            borderWidth: 0,
            borderRadius:1000,
            overflow: 'hidden'
        },
        inputViewStyles: {
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            borderRadius: 0,
            borderWidth:0,
        },
    });
}

export default portraitStyles;



