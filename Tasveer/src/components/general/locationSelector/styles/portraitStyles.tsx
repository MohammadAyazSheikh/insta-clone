

import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { getShadow } from '../../../../theme/platformSpecificStyles';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {


    return StyleSheet.create({

        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        modalView: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors.secondary1,
            width: w(100),
            height: "100%"//h(100),
        },
        containerMap: {
            // ...StyleSheet.absoluteFillObject,
            flex: 1,
            width: w(100),
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 20,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        inputView: {
            position: 'absolute',
            top: 10,
            right: 0,
            width: w(100),
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputViewInner: {
            width: w(90),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: "#EFEFEF",
            ...getShadow({ elevation: 10, shadowRadius: 10 }),
            position: 'relative'
        },
        txtInput: {
            flex: 1,
            marginRight: 5,
            color: colors.primary1,
            height: 45
        },
        suggestionView: {
            width: w(95),
            maxHeight: h(50),
            borderRadius: 10,
            backgroundColor: "#EFEFEF",
            position: 'absolute',
            top: 50,
            zIndex: 1
        },
        txtSuggestionView: {
            width: w(95),
            paddingHorizontal: 10,
            paddingVertical: 5
        },
        txtSuggestion: {
            color: colors.grey1,
            fontSize: 14
        },
        locationIconView: {

            backgroundColor: colors.primary2,
            padding: 5,
            borderRadius: 100,
        },

    });
}


export default portraitStyles;

