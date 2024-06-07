
import { StyleSheet } from 'react-native';
import { colorObjectType } from "../../../theme/colors";
import { commonStyles } from '../../../theme/common';
type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            width: w(100),
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            paddingHorizontal: 10,
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
            fontSize: w(5),
            color: colors.secondary1
        },
        txtInfoLabel: {
            fontSize: w(4),
            color: colors.secondary1
        },
        txtName: {
            fontSize: w(3.5),
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

export default portraitStyles;



