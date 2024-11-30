import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w } from "../../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing,fontSize } = theme;
    return ({
        msgContainer: {
            minWidth:w(40),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: "center",
            overflow: 'hidden',
            backgroundColor: colors.primary1,
            borderRadius: spacing?.lg,
            marginVertical: spacing?.md,
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
            paddingHorizontal: spacing?.md,
            paddingVertical: spacing?.md,
        },
        wrapper: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        txtName: {
            fontSize: fontSize?.md,
            color: colors.ternary1
        },
        txtMsg: {
            fontSize: fontSize?.sm,
            color: colors.secondary1
        },
        btnClose: {
            padding: spacing?.xsm,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            position: 'absolute',
            top: 10,
            right: 10,
        },
    })
});

export default styleSheet;