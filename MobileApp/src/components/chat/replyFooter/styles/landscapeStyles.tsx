
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({

        msgContainer: {
            minWidth: w(40),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: "center",
            overflow: 'hidden',
            backgroundColor: colors.primary3,
            borderRadius: 10,
            marginVertical: 5,
        },
        leftStrip: {
            width: 10,
            height: '100%',
            backgroundColor:colors.ternary1
        },
        msgView: {
            flex: 1,
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 5,
        },
        wrapper: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        txtName: {
            fontSize: 14,
            color: colors.ternary1
        },
        txtMsg: {
            fontSize: 12,
            color: colors.secondary1
        },
        btnClose: {
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            position: 'absolute',
            top: 10,
            right: 10,
        },
    });
}

export default landscapeStyles;



