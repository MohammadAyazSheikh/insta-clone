
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, } from '../../../../theme/fonts';
import { getShadow } from '../../../../theme/platformSpecificStyles';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            backgroundColor: colors.primary1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: w(100),
            paddingHorizontal: 10,
            paddingVertical: 5,
        },
        txtName: {
            fontSize: 16,
            color: colors.secondary1
        },
        txtSub: {
            fontSize: 12,
            color: colors.grey1
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
        },
        btnStyle: {
            padding: 2,
            borderRadius: 100,
        },
        // ----------------menu-------------
        containerMenu: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0
        },
        menuBox: {
            width: w(40),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: '5%',
            top: '5%',
            borderRadius: 10,
            overflow: 'hidden',
            ...getShadow({ elevation: 20 }),
            transformOrigin: 'top'
        },
        btnMenu: {
            width: '100%',
            marginVertical: 0,
            borderRadius: 0,
            justifyContent: 'flex-start',
            backgroundColor: colors.primary4,
        },
        txtBtnMenu: {
            color: colors.secondary1
        },
    });
}

export default portraitStyles;



