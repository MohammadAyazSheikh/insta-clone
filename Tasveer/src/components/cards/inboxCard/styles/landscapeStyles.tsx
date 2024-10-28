
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            width: "95%",
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary1,
            paddingVertical: 10
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 10
        },
        txtTitle: {
            color: colors.secondary1,
            fontSize: h(4.5)
        },
        txtSubTitle: {
            color: colors.grey1,
            fontSize: h(4)
        },
        txtTime: {
            color: colors.grey1,
            fontSize: h(3.5),
            marginBottom:5,
        },
        sideView: {
            paddingLeft: 5,
            height: '100%',
        },
    });
}

export default landscapeStyles;



