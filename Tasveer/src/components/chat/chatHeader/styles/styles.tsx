import { createStyleSheet } from "react-native-unistyles";
import { getShadow } from "../../../../theme/platformSpecificStyles";
import { widthToDp as w, } from "../../../../utils/functions/responsiveUtils";
import { StyleSheet } from "react-native";

const styleSheet = createStyleSheet((theme) => {
    const { colors,spacing,fontSize } = theme;
    return ({
        container: {
            backgroundColor: colors.primary1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: w(100),
            paddingHorizontal: spacing?.lg,
            paddingVertical: spacing?.md,
        },
        txtName: {
            fontSize: fontSize?.lg,
            color: colors.secondary1
        },
        txtSub: {
            fontSize: fontSize?.md,
            color: colors.common?.grey1
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
        },
        btnStyle: {
            padding: spacing?.sm,
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
            ...StyleSheet.absoluteFillObject,
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
            borderRadius: spacing?.lg,
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
    })
});

export default styleSheet;