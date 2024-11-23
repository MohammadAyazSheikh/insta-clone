import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w } from "../../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing } = theme;
    return ({
        container: {
            width: "95%",
            alignSelf:'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary1,
            paddingVertical: spacing?.lg
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: spacing?.lg
        },
        txtTitle: {
            color: colors.secondary1,
            fontSize: w(4.5)
        },
        txtSubTitle: {
            color: colors.common?.grey1,
            fontSize: w(4)
        },
        txtTime: {
            color: colors.common?.grey1,
            fontSize: w(3.5),
            marginBottom: spacing?.md,
        },
        sideView: {
            paddingLeft: spacing?.md,
            height: '100%',
        },
    })
});

export default styleSheet;