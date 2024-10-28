
import { StyleSheet } from 'react-native';
import { colorObjectType } from "../../../theme/colors";
import { commonStyles } from '../../../theme/common';
type p = (number: number) => number;



const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            width: w(100),
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        topView: {
            justifyContent: 'center',
            alignItems: 'center',
            width: w(100),
            paddingHorizontal:10,
            backgroundColor:colors.primary1
        },
        userInfoRow: {
            ...commonStyles.rowCenter,
            width: '100%',
            paddingVertical: 10,
        },
        userInfoTextRow: {
            ...commonStyles.rowCenter,
            flex: 1,
            justifyContent: 'space-evenly'
        },
        txtInfoVal: {
            fontSize: h(5),
            color: colors.secondary1
        },
        txtInfoLabel: {
            fontSize: h(4),
            color: colors.secondary1
        },
        txtName: {
            fontSize: h(3.5),
            color: colors.secondary1,
        },

        btnEdit: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            borderRadius: 5,
            backgroundColor: colors.primary4
        },
        
    });
}

export default landscapeStyles;



