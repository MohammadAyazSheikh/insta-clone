import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../../utils/functions/responsiveUtils';
import { fontFamily } from '../../../../theme/fonts';

const styleSheet = createStyleSheet((theme) => {

    const { colors, spacing, fontSize } = theme;

    return ({
        listContainer: {
            width: '100%',
            flex: 1,
            marginTop: spacing?.lg,
            borderTopWidth: 0.5,
            borderTopColor: colors.common.grey1,
            flexDirection: 'row'
        },
        headerView: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: spacing?.lg,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.common.grey1,
            marginBottom: spacing?.lg,
        },
        txtHeader: {
            color: colors.secondary1,
            fontSize: fontSize?.md,
            alignSelf: 'center'
        },
        // ---------Footer-------
        footerView: {
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            paddingVertical: spacing?.md,
        },
        replyRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: "100%",
            paddingHorizontal: spacing?.lg,
            paddingVertical: spacing?.lg,
            backgroundColor: colors?.primary4
        },
        inputRow: {
            flexDirection: 'row',
            alignItems: 'center',
            width: "100%",
            paddingHorizontal: spacing?.lg,
        },
        txtInput: {
            flex: 1,
            marginHorizontal: spacing?.md,
            paddingVertical: spacing?.md,
            color: colors.secondary1,
            fontSize: spacing?.md,
            fontFamily: fontFamily.regular
        },
        btnSend: {
            borderRadius: w(20),
            paddingHorizontal: 12,
            paddingVertical: 3,
            backgroundColor: colors.ternary1
        },
        //------- comment ------- 
        commentContainer: {
            width: "100%",
            flexDirection: 'row',
            paddingHorizontal: spacing?.lg,
            marginVertical: spacing?.md,
        },
        col: {

        },
        row: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        rowComment: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        colComment: {
            flex: 1,
            paddingHorizontal: spacing?.md,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        txtName: {
            color: colors.secondary1,
            fontSize: spacing?.md,
        },
        txtTime: {
            color: colors.common.grey1,
            fontSize: 12,
            alignSelf: 'center'
        },
        txtComment: {
            color: colors.secondary1,
            fontSize: spacing?.md,
        },
        lineViewReply: {
            paddingVertical: 0.5,
            width: 20,
            backgroundColor: colors.common.grey1,
            opacity: 0.5
        }
    });
});
export default styleSheet;
